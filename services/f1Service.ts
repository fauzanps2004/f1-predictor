import { POINTS_SYSTEM, DRIVERS, FULL_2025_CALENDAR, FALLBACK_WDC_STANDINGS, FALLBACK_WCC_STANDINGS } from '../constants';
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
    // We prioritize our local Post-Vegas calendar scenario for now
    // If you want live calendar, uncomment below, but for this specific 'Post-Vegas' request,
    // the hardcoded calendar in constants has the correct 'hasOccurred' flags.
    return FULL_2025_CALENDAR; 
  } catch (e) {
    return FULL_2025_CALENDAR;
  }
};

export const fetchCurrentStandings = async (): Promise<{ wdc: Standing[], wcc: ConstructorStanding[] } | null> => {
    // For the "Post-Vegas 2025" scenario, we must use the Fallback data
    // because the live API (2025) will return 0 points or empty.
    // We return null to force the App.tsx to use FALLBACK constants.
    return null;
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