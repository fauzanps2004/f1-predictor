import { Driver, Team, Standing, ConstructorStanding, RaceWeekend } from './types';

export const POINTS_SYSTEM = {
  race: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
  sprint: [8, 7, 6, 5, 4, 3, 2, 1],
  fastestLap: 1,
};

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

// Official 2025 Grid
export const DRIVERS: Driver[] = [
  // McLaren
  { id: 'nor', code: 'NOR', firstName: 'Lando', lastName: 'Norris', teamId: 'mcl', color: '#FF8000' },
  { id: 'pia', code: 'PIA', firstName: 'Oscar', lastName: 'Piastri', teamId: 'mcl', color: '#FF8000' },
  // Ferrari
  { id: 'lec', code: 'LEC', firstName: 'Charles', lastName: 'Leclerc', teamId: 'fer', color: '#E8002D' },
  { id: 'ham', code: 'HAM', firstName: 'Lewis', lastName: 'Hamilton', teamId: 'fer', color: '#E8002D' },
  // Red Bull
  { id: 'ver', code: 'VER', firstName: 'Max', lastName: 'Verstappen', teamId: 'rbr', color: '#3671C6' },
  { id: 'per', code: 'PER', firstName: 'Sergio', lastName: 'Perez', teamId: 'rbr', color: '#3671C6' },
  // Mercedes
  { id: 'rus', code: 'RUS', firstName: 'George', lastName: 'Russell', teamId: 'mer', color: '#27F4D2' },
  { id: 'ant', code: 'ANT', firstName: 'Andrea Kimi', lastName: 'Antonelli', teamId: 'mer', color: '#27F4D2' },
  // Aston Martin
  { id: 'alo', code: 'ALO', firstName: 'Fernando', lastName: 'Alonso', teamId: 'ast', color: '#229971' },
  { id: 'str', code: 'STR', firstName: 'Lance', lastName: 'Stroll', teamId: 'ast', color: '#229971' },
  // Alpine
  { id: 'gas', code: 'GAS', firstName: 'Pierre', lastName: 'Gasly', teamId: 'alp', color: '#0093CC' },
  { id: 'doo', code: 'DOO', firstName: 'Jack', lastName: 'Doohan', teamId: 'alp', color: '#0093CC' },
  // Williams
  { id: 'alb', code: 'ALB', firstName: 'Alex', lastName: 'Albon', teamId: 'wil', color: '#64C4FF' },
  { id: 'sai', code: 'SAI', firstName: 'Carlos', lastName: 'Sainz', teamId: 'wil', color: '#64C4FF' },
  // VCARB
  { id: 'tsu', code: 'TSU', firstName: 'Yuki', lastName: 'Tsunoda', teamId: 'rb', color: '#6692FF' },
  { id: 'law', code: 'LAW', firstName: 'Liam', lastName: 'Lawson', teamId: 'rb', color: '#6692FF' },
  // Haas
  { id: 'oco', code: 'OCO', firstName: 'Esteban', lastName: 'Ocon', teamId: 'haa', color: '#B6BABD' },
  { id: 'bea', code: 'BEA', firstName: 'Oliver', lastName: 'Bearman', teamId: 'haa', color: '#B6BABD' },
  // Sauber
  { id: 'hul', code: 'HUL', firstName: 'Nico', lastName: 'Hulkenberg', teamId: 'sau', color: '#52E252' },
  { id: 'bor', code: 'BOR', firstName: 'Gabriel', lastName: 'Bortoleto', teamId: 'sau', color: '#52E252' },
];

export const FALLBACK_WDC_STANDINGS: Standing[] = DRIVERS.map((d, i) => ({
  position: i + 1,
  driverId: d.id,
  points: 0,
  wins: 0
}));

const teamIds = Array.from(new Set(DRIVERS.map(d => d.teamId)));
export const FALLBACK_WCC_STANDINGS: ConstructorStanding[] = teamIds.map((tid, i) => ({
  position: i + 1,
  teamId: tid,
  points: 0
}));

// Official 2025 Calendar
export const FULL_2025_CALENDAR: RaceWeekend[] = [
  { id: 'gp-australia', name: 'Australian Grand Prix', round: 1, isSprint: false, hasOccurred: false },
  { id: 'gp-china', name: 'Chinese Grand Prix', round: 2, isSprint: true, hasOccurred: false },
  { id: 'gp-japan', name: 'Japanese Grand Prix', round: 3, isSprint: false, hasOccurred: false },
  { id: 'gp-bahrain', name: 'Bahrain Grand Prix', round: 4, isSprint: false, hasOccurred: false },
  { id: 'gp-saudi', name: 'Saudi Arabian Grand Prix', round: 5, isSprint: false, hasOccurred: false },
  { id: 'gp-miami', name: 'Miami Grand Prix', round: 6, isSprint: true, hasOccurred: false },
  { id: 'gp-imola', name: 'Emilia Romagna Grand Prix', round: 7, isSprint: false, hasOccurred: false },
  { id: 'gp-monaco', name: 'Monaco Grand Prix', round: 8, isSprint: false, hasOccurred: false },
  { id: 'gp-spain', name: 'Spanish Grand Prix', round: 9, isSprint: false, hasOccurred: false },
  { id: 'gp-canada', name: 'Canadian Grand Prix', round: 10, isSprint: false, hasOccurred: false },
  { id: 'gp-austria', name: 'Austrian Grand Prix', round: 11, isSprint: true, hasOccurred: false },
  { id: 'gp-britain', name: 'British Grand Prix', round: 12, isSprint: false, hasOccurred: false },
  { id: 'gp-belgium', name: 'Belgian Grand Prix', round: 13, isSprint: true, hasOccurred: false },
  { id: 'gp-hungary', name: 'Hungarian Grand Prix', round: 14, isSprint: false, hasOccurred: false },
  { id: 'gp-netherlands', name: 'Dutch Grand Prix', round: 15, isSprint: false, hasOccurred: false },
  { id: 'gp-italy', name: 'Italian Grand Prix', round: 16, isSprint: false, hasOccurred: false },
  { id: 'gp-azerbaijan', name: 'Azerbaijan Grand Prix', round: 17, isSprint: false, hasOccurred: false },
  { id: 'gp-singapore', name: 'Singapore Grand Prix', round: 18, isSprint: false, hasOccurred: false },
  { id: 'gp-usa', name: 'United States Grand Prix', round: 19, isSprint: true, hasOccurred: false },
  { id: 'gp-mexico', name: 'Mexico City Grand Prix', round: 20, isSprint: false, hasOccurred: false },
  { id: 'gp-brazil', name: 'São Paulo Grand Prix', round: 21, isSprint: true, hasOccurred: false },
  { id: 'gp-vegas', name: 'Las Vegas Grand Prix', round: 22, isSprint: false, hasOccurred: false },
  { id: 'gp-qatar', name: 'Qatar Grand Prix', round: 23, isSprint: true, hasOccurred: false },
  { id: 'gp-abudhabi', name: 'Abu Dhabi Grand Prix', round: 24, isSprint: false, hasOccurred: false },
];

// Fallback is now the full calendar
export const REMAINING_RACES = FULL_2025_CALENDAR;