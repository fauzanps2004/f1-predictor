import React from 'react';
import { DRIVERS } from '../constants';
import { SimulationResult, RaceWeekend } from '../types';
import { ChevronDown, Trophy, Timer, Zap } from 'lucide-react';

interface SimulatorInputProps {
  scenario: SimulationResult;
  setScenario: (s: SimulationResult) => void;
  selectedRace: RaceWeekend | null;
}

const SimulatorInput: React.FC<SimulatorInputProps> = ({ scenario, setScenario, selectedRace }) => {
  
  const updatePos = (key: keyof SimulationResult, driverId: string) => {
    setScenario({ ...scenario, [key]: driverId });
  };

  const DriverSelect = ({ label, valueKey, icon, highlightColor }: { label: string, valueKey: keyof SimulationResult, icon?: React.ReactNode, highlightColor?: string }) => (
    <div className="group relative">
      <div className={`absolute -inset-0.5 rounded-lg opacity-30 blur group-hover:opacity-60 transition duration-200 ${highlightColor || 'bg-slate-600'}`}></div>
      <div className="relative bg-slate-900 border border-slate-700 rounded-lg p-2 flex flex-col gap-1">
        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
            {icon}
            {label}
        </label>
        <div className="relative">
            <select
            value={scenario[valueKey] || ""}
            onChange={(e) => updatePos(valueKey, e.target.value)}
            className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none appearance-none cursor-pointer py-1"
            >
            <option value="" className="bg-slate-900 text-slate-500">SELECT DRIVER</option>
            {DRIVERS.map(driver => (
                <option key={driver.id} value={driver.id} className="bg-slate-900">
                {driver.code} - {driver.lastName}
                </option>
            ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500 pointer-events-none group-hover:text-f1-red transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Main Race Section */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl">
        <div className="absolute top-0 left-0 w-1 h-full bg-f1-red"></div>
        <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3 uppercase tracking-wider italic">
            <Trophy className="w-6 h-6 text-f1-red" /> 
            Race Classification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4">
                <DriverSelect label="Winner (25 pts)" valueKey="p1" highlightColor="bg-yellow-500" icon={<span className="text-yellow-400 font-mono">P1</span>} />
                <DriverSelect label="2nd Place (18 pts)" valueKey="p2" highlightColor="bg-slate-300" icon={<span className="text-slate-300 font-mono">P2</span>} />
                <DriverSelect label="3rd Place (15 pts)" valueKey="p3" highlightColor="bg-orange-700" icon={<span className="text-orange-400 font-mono">P3</span>} />
                <DriverSelect label="4th Place (12 pts)" valueKey="p4" />
                <DriverSelect label="5th Place (10 pts)" valueKey="p5" />
                <DriverSelect label="6th Place (8 pts)" valueKey="p6" />
                <DriverSelect label="7th Place (6 pts)" valueKey="p7" />
                <DriverSelect label="8th Place (4 pts)" valueKey="p8" />
                <DriverSelect label="9th Place (2 pts)" valueKey="p9" />
                <DriverSelect label="10th Place (1 pt)" valueKey="p10" />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="max-w-xs">
                    <DriverSelect label="Fastest Lap (+1 pt)" valueKey="fastestLap" highlightColor="bg-purple-600" icon={<Timer className="w-3 h-3 text-purple-400"/>} />
                </div>
            </div>
        </div>
      </div>

      {/* Sprint Section */}
      {selectedRace?.isSprint && (
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3 uppercase tracking-wider italic">
                <Zap className="w-6 h-6 text-orange-500" />
                Sprint Result
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <DriverSelect label="Sprint P1" valueKey="sprintP1" />
                <DriverSelect label="Sprint P2" valueKey="sprintP2" />
                <DriverSelect label="Sprint P3" valueKey="sprintP3" />
                <DriverSelect label="Sprint P4" valueKey="sprintP4" />
                <DriverSelect label="Sprint P5" valueKey="sprintP5" />
                <DriverSelect label="Sprint P6" valueKey="sprintP6" />
                <DriverSelect label="Sprint P7" valueKey="sprintP7" />
                <DriverSelect label="Sprint P8" valueKey="sprintP8" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulatorInput;