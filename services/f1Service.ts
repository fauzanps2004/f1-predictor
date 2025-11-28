import { POINTS_SYSTEM, DRIVERS, FULL_2025_CALENDAR } from '../constants';
import { SimulationResult, ProjectedStanding, ProjectedConstructorStanding, Standing, ConstructorStanding, RaceWeekend } from '../types';

// Map Ergast API Constructor IDs to Internal IDs
const mapTeamId = (ergastId: string) => {
  const map: Record<string, string> = {
    'red_bull': 'rbr',
    'mercedes': 'mer',
    'ferrari': 'fer',
    'mclaren': 'mcl',
    'aston_martin': 'ast',
    'alpine': 'alp',
    'williams': 'wil',
    'rb': 'rb',
    'sauber': 'sau',
    'haas': 'haa',
  };
  return map[ergastId] || ergastId;
};

// Fetch 2025 Race Calendar from OpenF1
export const fetch2025Calendar = async (): Promise<RaceWeekend[] | null> => {
  try {
    const res = await fetch('https://api.openf1.org/v1/meetings?year=2025');
    if (!res.ok) throw new Error("OpenF1 API Error");
    
    const data = await res.json();
    
    // If API returns no meetings (early 2025), use our official constant
    if (!data || data.length === 0) {
        return FULL_2025_CALENDAR;
    }

    const today = new Date();
    
    // OpenF1 returns "meetings" (race weekends). We filter for actual Grand Prix sessions.
    // We sort by date to ensure correct round order.
    const races: RaceWeekend[] = data
      .sort((a: any, b: any) => new Date(a.date_start).getTime() - new Date(b.date_start).getTime())
      .map((meeting: any, index: number) => {
        const raceDate = new Date(meeting.date_start);
        return {
            id: `gp-${meeting.meeting_key}`,
            name: meeting.meeting_name,
            round: index + 1,
            isSprint: meeting.meeting_name.toLowerCase().includes('sprint') || [2, 6, 11, 19, 21, 23].includes(index + 1), // Check official sprint list
            hasOccurred: raceDate < today, // True if the race start date is in the past
        };
      });

    return races.length > 0 ? races : FULL_2025_CALENDAR;
  } catch (e) {
    console.warn("Failed to fetch OpenF1 calendar, using fallback:", e);
    return FULL_2025_CALENDAR;
  }
};

export const fetchCurrentStandings = async (): Promise<{ wdc: Standing[], wcc: ConstructorStanding[] } | null> => {
  try {
    // Attempt to fetch 2025 data specifically
    const baseUrl = 'https://api.jolpi.ca/ergast/f1';
    
    // We strictly look for 2025. If it's early year, this will likely return empty lists, which is correct (0 points).
    const wdcRes = await fetch(`${baseUrl}/2025/driverStandings.json?limit=100`);
    const wccRes = await fetch(`${baseUrl}/2025/constructorStandings.json?limit=30`);

    if (!wdcRes.ok || !wccRes.ok) throw new Error("API Error");

    const wdcJson = await wdcRes.json();
    const wccJson = await wccRes.json();

    const apiWdcList = wdcJson.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    const apiWccList = wccJson.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

    // Initialize WDC with 0 points (Clean Slate) using our 2025 Driver List
    // If API has data (season started), we map it. If not, we stay at 0.
    const wdc: Standing[] = DRIVERS.map((internalDriver, index) => {
        const apiEntry = apiWdcList.find((e: any) => 
            e.Driver.code === internalDriver.code || 
            e.Driver.familyName.toLowerCase() === internalDriver.lastName.toLowerCase()
        );
        
        return {
            position: apiEntry ? parseInt(apiEntry.position) : index + 1,
            driverId: internalDriver.id,
            points: apiEntry ? parseFloat(apiEntry.points) : 0,
            wins: apiEntry ? parseInt(apiEntry.wins) : 0,
        };
    }).sort((a, b) => b.points - a.points); // Sort by points (0-0 initially keeps array order)

    // Assign position based on sort
    wdc.forEach((d, i) => d.position = i + 1);

    // Initialize WCC
    // If API is empty, we create a 0-point list based on the teams present in DRIVERS
    let wcc: ConstructorStanding[] = [];
    
    if (apiWccList.length > 0) {
       wcc = apiWccList.map((entry: any) => ({
        position: parseInt(entry.position),
        teamId: mapTeamId(entry.Constructor.constructorId),
        points: parseFloat(entry.points)
      }));
    } else {
      // Create unique set of teams from DRIVERS and init at 0
      const teamIds = Array.from(new Set(DRIVERS.map(d => d.teamId)));
      wcc = teamIds.map((tid, index) => ({
        position: index + 1,
        teamId: tid,
        points: 0
      }));
    }

    return { wdc, wcc };
  } catch (e) {
    console.warn("Using fallback data due to API connectivity issue:", e);
    return null; // Triggers use of FALLBACK constants (which are also 0 points)
  }
};

export const calculateProjectedStandings = (
  scenario: SimulationResult,
  currentWdc: Standing[],
  currentWcc: ConstructorStanding[]
): { wdc: ProjectedStanding[]; wcc: ProjectedConstructorStanding[] } => {
  
  // 1. Clone initial standings
  const newWDC = currentWdc.map((s) => ({ ...s, previousPosition: s.position, previousPoints: s.points, diff: 0 }));
  let newWCCMap = new Map<string, number>();
  currentWcc.forEach((s) => newWCCMap.set(s.teamId, s.points));

  // Helper to add points
  const addPoints = (driverId: string, points: number) => {
    const driverIdx = newWDC.findIndex((d) => d.driverId === driverId);
    if (driverIdx !== -1) {
      newWDC[driverIdx].points += points;
      
      const driver = DRIVERS.find(d => d.id === driverId);
      if (driver) {
         // Logic to add points to team
         const currentTeamPoints = newWCCMap.get(driver.teamId) || 0;
         newWCCMap.set(driver.teamId, currentTeamPoints + points);
      }
    }
  };

  // 2. Process Main Race
  const racePositions = [
    scenario.p1, scenario.p2, scenario.p3, scenario.p4, scenario.p5,
    scenario.p6, scenario.p7, scenario.p8, scenario.p9, scenario.p10
  ];

  racePositions.forEach((dId, index) => {
    if (dId) {
      const points = POINTS_SYSTEM.race[index] || 0;
      addPoints(dId, points);
    }
  });

  // 3. Process Fastest Lap
  if (scenario.fastestLap) {
     // Fastest lap only counts if in Top 10
     if (racePositions.includes(scenario.fastestLap)) {
        addPoints(scenario.fastestLap, POINTS_SYSTEM.fastestLap);
     }
  }

  // 4. Process Sprint
  const sprintPositions = [
    scenario.sprintP1, scenario.sprintP2, scenario.sprintP3, scenario.sprintP4,
    scenario.sprintP5, scenario.sprintP6, scenario.sprintP7, scenario.sprintP8
  ];
  
  sprintPositions.forEach((dId, index) => {
    if (dId) {
        const points = POINTS_SYSTEM.sprint[index] || 0;
        addPoints(dId, points);
    }
  });

  // 5. Re-sort and calculate Rank Diff
  newWDC.sort((a, b) => b.points - a.points || b.wins - a.wins); // Simple wins tiebreaker
  const projectedWDC: ProjectedStanding[] = newWDC.map((s, index) => ({
    ...s,
    position: index + 1,
    diff: s.previousPosition - (index + 1) // Positive means gained rank (e.g. 5 - 3 = +2)
  }));

  // 6. WCC Projections
  const projectedWCC: ProjectedConstructorStanding[] = [];
  newWCCMap.forEach((points, teamId) => {
      projectedWCC.push({
          teamId,
          points,
          position: 0, // Placeholder
          previousPosition: 0, // Placeholder
          previousPoints: currentWcc.find(t => t.teamId === teamId)?.points || 0,
          diff: 0
      });
  });

  projectedWCC.sort((a, b) => b.points - a.points);
  
  projectedWCC.forEach((t, index) => {
      const initial = currentWcc.find(init => init.teamId === t.teamId);
      t.position = index + 1;
      t.previousPosition = initial ? initial.position : 10;
      t.diff = t.previousPosition - t.position;
  });

  return { wdc: projectedWDC, wcc: projectedWCC };
};

export const getDriverById = (id: string) => DRIVERS.find(d => d.id === id);