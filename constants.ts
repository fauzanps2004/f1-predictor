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

// Official 2025 Grid - Updated to match User Screenshot Scenario
// (Tsunoda at RBR, Hadjar at RB, Colapinto at Alpine, etc.)
export const DRIVERS: Driver[] = [
  // McLaren
  { id: 'nor', code: 'NOR', firstName: 'Lando', lastName: 'Norris', teamId: 'mcl', color: '#FF8000' },
  { id: 'pia', code: 'PIA', firstName: 'Oscar', lastName: 'Piastri', teamId: 'mcl', color: '#FF8000' },
  // Red Bull
  { id: 'ver', code: 'VER', firstName: 'Max', lastName: 'Verstappen', teamId: 'rbr', color: '#3671C6' },
  { id: 'tsu', code: 'TSU', firstName: 'Yuki', lastName: 'Tsunoda', teamId: 'rbr', color: '#3671C6' },
  // Mercedes
  { id: 'rus', code: 'RUS', firstName: 'George', lastName: 'Russell', teamId: 'mer', color: '#27F4D2' },
  { id: 'ant', code: 'ANT', firstName: 'Andrea Kimi', lastName: 'Antonelli', teamId: 'mer', color: '#27F4D2' },
  // Ferrari
  { id: 'lec', code: 'LEC', firstName: 'Charles', lastName: 'Leclerc', teamId: 'fer', color: '#E8002D' },
  { id: 'ham', code: 'HAM', firstName: 'Lewis', lastName: 'Hamilton', teamId: 'fer', color: '#E8002D' },
  // Williams
  { id: 'alb', code: 'ALB', firstName: 'Alex', lastName: 'Albon', teamId: 'wil', color: '#64C4FF' },
  { id: 'sai', code: 'SAI', firstName: 'Carlos', lastName: 'Sainz', teamId: 'wil', color: '#64C4FF' },
  // Racing Bulls (VCARB)
  { id: 'had', code: 'HAD', firstName: 'Isack', lastName: 'Hadjar', teamId: 'rb', color: '#6692FF' },
  { id: 'law', code: 'LAW', firstName: 'Liam', lastName: 'Lawson', teamId: 'rb', color: '#6692FF' },
  // Kick Sauber
  { id: 'hul', code: 'HUL', firstName: 'Nico', lastName: 'Hulkenberg', teamId: 'sau', color: '#52E252' },
  { id: 'bor', code: 'BOR', firstName: 'Gabriel', lastName: 'Bortoleto', teamId: 'sau', color: '#52E252' },
  // Haas
  { id: 'bea', code: 'BEA', firstName: 'Oliver', lastName: 'Bearman', teamId: 'haa', color: '#B6BABD' },
  { id: 'oco', code: 'OCO', firstName: 'Esteban', lastName: 'Ocon', teamId: 'haa', color: '#B6BABD' },
  // Aston Martin
  { id: 'alo', code: 'ALO', firstName: 'Fernando', lastName: 'Alonso', teamId: 'ast', color: '#229971' },
  { id: 'str', code: 'STR', firstName: 'Lance', lastName: 'Stroll', teamId: 'ast', color: '#229971' },
  // Alpine
  { id: 'gas', code: 'GAS', firstName: 'Pierre', lastName: 'Gasly', teamId: 'alp', color: '#0093CC' },
  { id: 'col', code: 'COL', firstName: 'Franco', lastName: 'Colapinto', teamId: 'alp', color: '#0093CC' },
  { id: 'doo', code: 'DOO', firstName: 'Jack', lastName: 'Doohan', teamId: 'alp', color: '#0093CC' },
];

// DATA SOURCE: User Provided Screenshot (2025 Scenario)
export const FALLBACK_WDC_STANDINGS: Standing[] = [
  { position: 1, driverId: 'nor', points: 390, wins: 5 },
  { position: 2, driverId: 'pia', points: 366, wins: 4 },
  { position: 3, driverId: 'ver', points: 366, wins: 5 },
  { position: 4, driverId: 'rus', points: 294, wins: 2 },
  { position: 5, driverId: 'lec', points: 226, wins: 2 },
  { position: 6, driverId: 'ham', points: 152, wins: 1 },
  { position: 7, driverId: 'ant', points: 137, wins: 1 },
  { position: 8, driverId: 'alb', points: 73, wins: 0 },
  { position: 9, driverId: 'had', points: 51, wins: 0 },
  { position: 10, driverId: 'hul', points: 49, wins: 0 },
  { position: 11, driverId: 'sai', points: 48, wins: 0 },
  { position: 12, driverId: 'bea', points: 41, wins: 0 },
  { position: 13, driverId: 'alo', points: 40, wins: 0 },
  { position: 14, driverId: 'law', points: 36, wins: 0 },
  { position: 15, driverId: 'oco', points: 32, wins: 0 },
  { position: 16, driverId: 'str', points: 32, wins: 0 },
  { position: 17, driverId: 'tsu', points: 28, wins: 0 },
  { position: 18, driverId: 'gas', points: 22, wins: 0 },
  { position: 19, driverId: 'bor', points: 19, wins: 0 },
  { position: 20, driverId: 'col', points: 0, wins: 0 },
  { position: 21, driverId: 'doo', points: 0, wins: 0 },
];

// Calculated WCC based on WDC points above
export const FALLBACK_WCC_STANDINGS: ConstructorStanding[] = [
  { position: 1, teamId: 'mcl', points: 756 }, // 390 + 366
  { position: 2, teamId: 'mer', points: 431 }, // 294 + 137
  { position: 3, teamId: 'rbr', points: 394 }, // 366 + 28
  { position: 4, teamId: 'fer', points: 378 }, // 226 + 152
  { position: 5, teamId: 'wil', points: 121 }, // 73 + 48
  { position: 6, teamId: 'rb', points: 87 },   // 51 + 36
  { position: 7, teamId: 'haa', points: 73 },  // 41 + 32
  { position: 8, teamId: 'ast', points: 72 },  // 40 + 32
  { position: 9, teamId: 'sau', points: 68 },  // 49 + 19
  { position: 10, teamId: 'alp', points: 22 }, // 22 + 0
];

// Official 2025 Calendar - Races 1-22 Marked as Occurred to match the high point tally
export const FULL_2025_CALENDAR: RaceWeekend[] = [
  { id: 'gp-australia', name: 'Australian Grand Prix', round: 1, isSprint: false, hasOccurred: true },
  { id: 'gp-china', name: 'Chinese Grand Prix', round: 2, isSprint: true, hasOccurred: true },
  { id: 'gp-japan', name: 'Japanese Grand Prix', round: 3, isSprint: false, hasOccurred: true },
  { id: 'gp-bahrain', name: 'Bahrain Grand Prix', round: 4, isSprint: false, hasOccurred: true },
  { id: 'gp-saudi', name: 'Saudi Arabian Grand Prix', round: 5, isSprint: false, hasOccurred: true },
  { id: 'gp-miami', name: 'Miami Grand Prix', round: 6, isSprint: true, hasOccurred: true },
  { id: 'gp-imola', name: 'Emilia Romagna Grand Prix', round: 7, isSprint: false, hasOccurred: true },
  { id: 'gp-monaco', name: 'Monaco Grand Prix', round: 8, isSprint: false, hasOccurred: true },
  { id: 'gp-spain', name: 'Spanish Grand Prix', round: 9, isSprint: false, hasOccurred: true },
  { id: 'gp-canada', name: 'Canadian Grand Prix', round: 10, isSprint: false, hasOccurred: true },
  { id: 'gp-austria', name: 'Austrian Grand Prix', round: 11, isSprint: true, hasOccurred: true },
  { id: 'gp-britain', name: 'British Grand Prix', round: 12, isSprint: false, hasOccurred: true },
  { id: 'gp-belgium', name: 'Belgian Grand Prix', round: 13, isSprint: true, hasOccurred: true },
  { id: 'gp-hungary', name: 'Hungarian Grand Prix', round: 14, isSprint: false, hasOccurred: true },
  { id: 'gp-netherlands', name: 'Dutch Grand Prix', round: 15, isSprint: false, hasOccurred: true },
  { id: 'gp-italy', name: 'Italian Grand Prix', round: 16, isSprint: false, hasOccurred: true },
  { id: 'gp-azerbaijan', name: 'Azerbaijan Grand Prix', round: 17, isSprint: false, hasOccurred: true },
  { id: 'gp-singapore', name: 'Singapore Grand Prix', round: 18, isSprint: false, hasOccurred: true },
  { id: 'gp-usa', name: 'United States Grand Prix', round: 19, isSprint: true, hasOccurred: true },
  { id: 'gp-mexico', name: 'Mexico City Grand Prix', round: 20, isSprint: false, hasOccurred: true },
  { id: 'gp-brazil', name: 'São Paulo Grand Prix', round: 21, isSprint: true, hasOccurred: true },
  { id: 'gp-vegas', name: 'Las Vegas Grand Prix', round: 22, isSprint: false, hasOccurred: true },
  { id: 'gp-qatar', name: 'Qatar Grand Prix', round: 23, isSprint: true, hasOccurred: false }, // UP NEXT
  { id: 'gp-abudhabi', name: 'Abu Dhabi Grand Prix', round: 24, isSprint: false, hasOccurred: false },
];

export const REMAINING_RACES = FULL_2025_CALENDAR;