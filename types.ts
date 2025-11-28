export interface Driver {
  id: string;
  code: string;
  firstName: string;
  lastName: string;
  teamId: string;
  color: string; // Hex color for UI
}

export interface Team {
  id: string;
  name: string;
  color: string;
}

export interface Standing {
  position: number;
  driverId: string;
  points: number;
  wins: number;
}

export interface ConstructorStanding {
  position: number;
  teamId: string;
  points: number;
}

export interface RaceWeekend {
  id: string;
  name: string;
  round: number;
  isSprint: boolean;
  hasOccurred: boolean;
}

export interface SimulationResult {
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  p5: string | null;
  p6: string | null;
  p7: string | null;
  p8: string | null;
  p9: string | null;
  p10: string | null;
  fastestLap: string | null;
  sprintP1?: string | null;
  sprintP2?: string | null;
  sprintP3?: string | null;
  sprintP4?: string | null;
  sprintP5?: string | null;
  sprintP6?: string | null;
  sprintP7?: string | null;
  sprintP8?: string | null;
}

export interface ProjectedStanding extends Standing {
  previousPosition: number;
  previousPoints: number;
  diff: number; // Rank change
}

export interface ProjectedConstructorStanding extends ConstructorStanding {
  previousPosition: number;
  previousPoints: number;
  diff: number;
}

export type ScenarioKey = 'A' | 'B';