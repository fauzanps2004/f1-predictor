import React, { useState, useEffect } from 'react';
import { SimulationResult, RaceWeekend, ScenarioKey, Standing, ConstructorStanding } from './types';
import { REMAINING_RACES, FALLBACK_WDC_STANDINGS, FALLBACK_WCC_STANDINGS } from './constants';
import SimulatorInput from './components/SimulatorInput';
import StandingsTable from './components/StandingsTable';
import { calculateProjectedStandings, fetchCurrentStandings, fetch2025Calendar } from './services/f1Service';
import { Flag, Activity, Split, Play, RefreshCcw, Loader2, ChevronsRight, CalendarClock } from 'lucide-react';

const EMPTY_SCENARIO: SimulationResult = {
  p1: null, p2: null, p3: null, p4: null, p5: null, p6: null, p7: null, p8: null, p9: null, p10: null, fastestLap: null
};

const App: React.FC = () => {
  const [races, setRaces] = useState<RaceWeekend[]>(REMAINING_RACES);
  const [selectedRace, setSelectedRace] = useState<RaceWeekend>(REMAINING_RACES[0]);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('A');
  const [scenarioA, setScenarioA] = useState<SimulationResult>(EMPTY_SCENARIO);
  const [scenarioB, setScenarioB] = useState<SimulationResult>(EMPTY_SCENARIO);
  const [isCompareMode, setIsCompareMode] = useState(false);
  
  // Data State
  const [baseWdc, setBaseWdc] = useState<Standing[]>([]);
  const [baseWcc, setBaseWcc] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Real Data
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      
      // Fetch Calendar from OpenF1
      const calendarData = await fetch2025Calendar();
      if (calendarData) {
        setRaces(calendarData);
        
        // Auto-select the NEXT race (first one that hasn't occurred)
        const nextRace = calendarData.find(r => !r.hasOccurred);
        if (nextRace) {
            setSelectedRace(nextRace);
        } else {
            // Fallback to first race if all done or none found
            setSelectedRace(calendarData[0]);
        }
      }

      // Fetch Standings
      const data = await fetchCurrentStandings();
      if (data) {
        setBaseWdc(data.wdc);
        setBaseWcc(data.wcc);
      } else {
        setBaseWdc(FALLBACK_WDC_STANDINGS);
        setBaseWcc(FALLBACK_WCC_STANDINGS);
      }
      setLoading(false);
    };
    initData();
  }, []);

  // Derived state for current view
  const currentScenarioData = activeScenario === 'A' ? scenarioA : scenarioB;
  const setCurrentScenarioData = activeScenario === 'A' ? setScenarioA : setScenarioB;

  // Calculate projections only if data is loaded
  const projectionsA = loading 
    ? { wdc: [], wcc: [] } 
    : calculateProjectedStandings(scenarioA, baseWdc, baseWcc);
    
  const projectionsB = loading 
    ? { wdc: [], wcc: [] } 
    : calculateProjectedStandings(scenarioB, baseWdc, baseWcc);
  
  const currentProjection = activeScenario === 'A' ? projectionsA : projectionsB;

  const handleReset = () => {
    setCurrentScenarioData(EMPTY_SCENARIO);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-f1-red" />
        <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Initializing 2025 Season...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15151E] text-slate-100 pb-20 selection:bg-f1-red selection:text-white">
      
      {/* Header */}
      <header className="bg-[#101014] border-b-4 border-f1-red sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-f1-red flex items-center justify-center transform -skew-x-12 shadow-lg shadow-red-900/50">
              <span className="font-bold text-white text-xl skew-x-12 italic">F1</span>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tighter uppercase leading-none italic">Predictor</h1>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">2025 Simulator</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Race Selector */}
            <div className="relative group flex items-center gap-2">
                {!selectedRace.hasOccurred && (
                    <span className="hidden md:flex items-center gap-1 text-[10px] bg-f1-red text-white px-2 py-1 rounded uppercase font-bold tracking-wider animate-pulse">
                        <CalendarClock className="w-3 h-3" /> Up Next
                    </span>
                )}
                <div className="relative">
                    <select 
                        value={selectedRace.id}
                        onChange={(e) => {
                            const race = races.find(r => r.id === e.target.value);
                            if (race) setSelectedRace(race);
                        }}
                        className="bg-[#1f1f28] border border-slate-700 text-sm text-white rounded uppercase font-bold tracking-wider px-4 py-2 pr-8 focus:ring-2 focus:ring-f1-red focus:border-transparent outline-none appearance-none cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                        {races.map(race => (
                            <option key={race.id} value={race.id}>
                                {race.round}. {race.name} {race.isSprint ? '(Sprint)' : ''}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronsRight className="w-4 h-4 text-f1-red" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-8 space-y-8">
        
        {/* Comparison Toggle */}
        <div className="flex justify-between items-center bg-[#1f1f28] p-1.5 rounded-lg border border-slate-800/50 shadow-lg max-w-2xl mx-auto mb-8">
            <div className="flex gap-1 flex-1">
                <button 
                    onClick={() => { setActiveScenario('A'); setIsCompareMode(false); }}
                    className={`flex-1 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${activeScenario === 'A' && !isCompareMode ? 'bg-gradient-to-r from-f1-red to-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    Scenario A
                </button>
                <button 
                    onClick={() => { setActiveScenario('B'); setIsCompareMode(false); }}
                    className={`flex-1 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${activeScenario === 'B' && !isCompareMode ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                >
                    Scenario B
                </button>
            </div>
            
            <div className="w-px h-8 bg-slate-700 mx-2"></div>

            <button 
                onClick={() => setIsCompareMode(!isCompareMode)}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${isCompareMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
                <Split className="w-4 h-4" />
                <span className="hidden sm:inline">Compare</span>
            </button>
        </div>

        {/* Comparison View */}
        {isCompareMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-wider border-b border-f1-red pb-2">
                        <span className="text-f1-red">A</span> Results: Post-{selectedRace.name}
                    </h2>
                    <StandingsTable wdc={projectionsA.wdc} wcc={projectionsA.wcc} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-wider border-b border-blue-600 pb-2">
                         <span className="text-blue-500">B</span> Results: Post-{selectedRace.name}
                    </h2>
                    <StandingsTable wdc={projectionsB.wdc} wcc={projectionsB.wcc} />
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Input Column */}
                <div className="xl:col-span-5 space-y-4 sticky top-24">
                    <div className="flex items-center justify-between mb-2 px-1">
                         <h2 className="text-lg font-bold text-slate-300 flex items-center gap-2 uppercase tracking-widest">
                            <Play className="w-4 h-4 text-f1-red" />
                            Build Scenario {activeScenario}
                        </h2>
                        <button onClick={handleReset} className="text-xs font-bold text-slate-500 hover:text-f1-red flex items-center gap-1 uppercase transition-colors">
                            <RefreshCcw className="w-3 h-3" /> Reset Grid
                        </button>
                    </div>
                   
                    <SimulatorInput 
                        scenario={currentScenarioData}
                        setScenario={setCurrentScenarioData}
                        selectedRace={selectedRace}
                    />
                </div>

                {/* Results Column */}
                <div className="xl:col-span-7 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3 uppercase italic tracking-wider">
                                <Activity className="w-6 h-6 text-f1-red" />
                                Projections: Post-{selectedRace.name}
                            </h2>
                            <p className="text-xs text-slate-500 uppercase tracking-widest ml-9 mt-1">
                                Simulated Standings after Round {selectedRace.round}
                            </p>
                        </div>
                        <div className="flex gap-4">
                             <div className="text-right">
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">WDC Gap</p>
                                <p className="text-xl font-mono font-bold text-white leading-none">
                                    {Math.abs((currentProjection.wdc[0]?.points || 0) - (currentProjection.wdc[1]?.points || 0))} <span className="text-sm text-f1-red">PTS</span>
                                </p>
                             </div>
                        </div>
                    </div>

                    <StandingsTable wdc={currentProjection.wdc} wcc={currentProjection.wcc} />
                </div>
            </div>
        )}
      </main>
      
      <footer className="fixed bottom-0 w-full bg-[#101014] border-t border-slate-800 py-2 text-center text-[10px] uppercase tracking-widest text-slate-600 font-bold z-40">
         F1 Predictor • Unofficial Tool • Calendar by OpenF1
      </footer>
    </div>
  );
};

export default App;