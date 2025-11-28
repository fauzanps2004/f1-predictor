import { Driver, Team, Standing, ConstructorStanding, RaceWeekend } from './types';

export const TEAMS: Record<string, Team> = {
  mcl: { id: 'mcl', name: 'McLaren', color: '#FF8000' },
  fer: { id: 'fer', name: 'Ferrari', color: '#E8002D' },
  rbr: { id: 'rbr', name: 'Red Bull Racing', color: '#3671C6' },
  mer: { id: 'mer', name: 'Mercedes', color: '#27F4D2' },
  ast: { id: 'ast', name: 'Aston Martin', color: '#229971' },
  alp: { id: 'alp', name: 'Alpine', color: '#0093CC' },
  haa: { id: 'haa', name: 'Haas', color: '#B6BABD' },
  rb: { id: 'rb', name: 'VCARB', color: '#6692FF' },
  wil: { id: 'wil', name: 'Williams', color: '#64C4FF' },
  sau: { id: 'sau', name: 'Kick Sauber', color: '#52E252' },
};

// Official 2025 Grid - Sorted by 2024 WCC Finish Order for initial cleanliness
export const DRIVERS: Driver[] = [
  // McLaren (1st)
  { id: 'nor', code: 'NOR', firstName: 'Lando', lastName: 'Norris', teamId: 'mcl', color: '#FF8000' },
  { id: 'pia', code: 'PIA', firstName: 'Oscar', lastName: 'Piastri', teamId: 'mcl', color: '#FF8000' },
  // Ferrari (2nd)
  { id: 'lec', code: 'LEC', firstName: 'Charles', lastName: 'Leclerc', teamId: 'fer', color: '#E8002D' },
  { id: 'ham', code: 'HAM', firstName: 'Lewis', lastName: 'Hamilton', teamId: 'fer', color: '#E8002D' },
  // Red Bull (3rd)
  { id: 'ver', code: 'VER', firstName: 'Max', lastName: 'Verstappen', teamId: 'rbr', color: '#3671C6' },
  { id: 'per', code: 'PER', firstName: 'Sergio', lastName: 'Perez', teamId: 'rbr', color: '#3671C6' },
  // Mercedes (4th)
  { id: 'rus', code: 'RUS', firstName: 'George', lastName: 'Russell', teamId: 'mer', color: '#27F4D2' },
  { id: 'ant', code: 'ANT', firstName: 'Kimi', lastName: 'Antonelli', teamId: 'mer', color: '#27F4D2' },
  // Aston Martin (5th)
  { id: 'alo', code: 'ALO', firstName: 'Fernando', lastName: 'Alonso', teamId: 'ast', color: '#229971' },
  { id: 'str', code: 'STR', firstName: 'Lance', lastName: 'Stroll', teamId: 'ast', color: '#229971' },
  // Alpine (6th)
  { id: 'gas', code: 'GAS', firstName: 'Pierre', lastName: 'Gasly', teamId: 'alp', color: '#0093CC' },
  { id: 'doo', code: 'DOO', firstName: 'Jack', lastName: 'Doohan', teamId: 'alp', color: '#0093CC' },
  // Haas (7th)
  { id: 'oco', code: 'OCO', firstName: 'Esteban', lastName: 'Ocon', teamId: 'haa', color: '#B6BABD' },
  { id: 'bea', code: 'BEA', firstName: 'Oliver', lastName: 'Bearman', teamId: 'haa', color: '#B6BABD' },
  // VCARB (8th)
  { id: 'tsu', code: 'TSU', firstName: 'Yuki', lastName: 'Tsunoda', teamId: 'rb', color: '#6692FF' },
  { id: 'law', code: 'LAW', firstName: 'Liam', lastName: 'Lawson', teamId: 'rb', color: '#6692FF' },
  // Williams (9th)
  { id: 'alb', code: 'ALB', firstName: 'Alex', lastName: 'Albon', teamId: 'wil', color: '#64C4FF' },
  { id: 'sai', code: 'SAI', firstName: 'Carlos', lastName: 'Sainz', teamId: 'wil', color: '#64C4FF' },
  // Sauber (10th)
  { id: 'hul', code: 'HUL', firstName: 'Nico', lastName: 'Hulkenberg', teamId: 'sau', color: '#52E252' },
  { id: 'bor', code: 'BOR', firstName: 'Gabriel', lastName: 'Bortoleto', teamId: 'sau', color: '#52E252' },
];

// Fallback data: 2025 Start (0 Points)
export const FALLBACK_WDC_STANDINGS: Standing[] = DRIVERS.map((d, i) => ({
  position: i + 1,
  driverId: d.id,
  points: 0,
  wins: 0
}));

export const FALLBACK_WCC_STANDINGS: ConstructorStanding[] = [
  { position: 1, teamId: 'mcl', points: 0 },
  { position: 2, teamId: 'fer', points: 0 },
  { position: 3, teamId: 'rbr', points: 0 },
  { position: 4, teamId: 'mer', points: 0 },
  { position: 5, teamId: 'ast', points: 0 },
  { position: 6, teamId: 'alp', points: 0 },
  { position: 7, teamId: 'haa', points: 0 },
  { position: 8, teamId: 'rb', points: 0 },
  { position: 9, teamId: 'wil', points: 0 },
  { position: 10, teamId: 'sau', points: 0 },
];

// Default initial races in case OpenF1 fails
export const REMAINING_RACES: RaceWeekend[] = [
  { id: 'aus', name: 'Australian Grand Prix', round: 1, isSprint: false, hasOccurred: false },
  { id: 'chn', name: 'Chinese Grand Prix', round: 2, isSprint: true, hasOccurred: false },
  { id: 'jpn', name: 'Japanese Grand Prix', round: 3, isSprint: false, hasOccurred: false },
];

export const POINTS_SYSTEM = {
  race: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
  sprint: [8, 7, 6, 5, 4, 3, 2, 1],
  fastestLap: 1,
};