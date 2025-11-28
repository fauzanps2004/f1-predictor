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

// Official 2024 Season Finale Grid (Post-Vegas)
export const DRIVERS: Driver[] = [
  // Red Bull
  { id: 'ver', code: 'VER', firstName: 'Max', lastName: 'Verstappen', teamId: 'rbr', color: '#3671C6' },
  { id: 'per', code: 'PER', firstName: 'Sergio', lastName: 'Perez', teamId: 'rbr', color: '#3671C6' },
  // McLaren
  { id: 'nor', code: 'NOR', firstName: 'Lando', lastName: 'Norris', teamId: 'mcl', color: '#FF8000' },
  { id: 'pia', code: 'PIA', firstName: 'Oscar', lastName: 'Piastri', teamId: 'mcl', color: '#FF8000' },
  // Ferrari
  { id: 'lec', code: 'LEC', firstName: 'Charles', lastName: 'Leclerc', teamId: 'fer', color: '#E8002D' },
  { id: 'sai', code: 'SAI', firstName: 'Carlos', lastName: 'Sainz', teamId: 'fer', color: '#E8002D' },
  // Mercedes
  { id: 'rus', code: 'RUS', firstName: 'George', lastName: 'Russell', teamId: 'mer', color: '#27F4D2' },
  { id: 'ham', code: 'HAM', firstName: 'Lewis', lastName: 'Hamilton', teamId: 'mer', color: '#27F4D2' },
  // Aston Martin
  { id: 'alo', code: 'ALO', firstName: 'Fernando', lastName: 'Alonso', teamId: 'ast', color: '#229971' },
  { id: 'str', code: 'STR', firstName: 'Lance', lastName: 'Stroll', teamId: 'ast', color: '#229971' },
  // Alpine
  { id: 'gas', code: 'GAS', firstName: 'Pierre', lastName: 'Gasly', teamId: 'alp', color: '#0093CC' },
  { id: 'oco', code: 'OCO', firstName: 'Esteban', lastName: 'Ocon', teamId: 'alp', color: '#0093CC' },
  // Williams
  { id: 'alb', code: 'ALB', firstName: 'Alex', lastName: 'Albon', teamId: 'wil', color: '#64C4FF' },
  { id: 'col', code: 'COL', firstName: 'Franco', lastName: 'Colapinto', teamId: 'wil', color: '#64C4FF' },
  // VCARB
  { id: 'tsu', code: 'TSU', firstName: 'Yuki', lastName: 'Tsunoda', teamId: 'rb', color: '#6692FF' },
  { id: 'law', code: 'LAW', firstName: 'Liam', lastName: 'Lawson', teamId: 'rb', color: '#6692FF' },
  // Haas
  { id: 'hul', code: 'HUL', firstName: 'Nico', lastName: 'Hulkenberg', teamId: 'haa', color: '#B6BABD' },
  { id: 'mag', code: 'MAG', firstName: 'Kevin', lastName: 'Magnussen', teamId: 'haa', color: '#B6BABD' },
  // Sauber
  { id: 'bot', code: 'BOT', firstName: 'Valtteri', lastName: 'Bottas', teamId: 'sau', color: '#52E252' },
  { id: 'zho', code: 'ZHO', firstName: 'Guanyu', lastName: 'Zhou', teamId: 'sau', color: '#52E252' },
];

// Fallback data: Post-Las Vegas 2024
export const FALLBACK_WDC_STANDINGS: Standing[] = [
  { position: 1, driverId: 'ver', points: 403, wins: 8 },
  { position: 2, driverId: 'nor', points: 340, wins: 3 },
  { position: 3, driverId: 'lec', points: 319, wins: 3 },
  { position: 4, driverId: 'pia', points: 292, wins: 2 },
  { position: 5