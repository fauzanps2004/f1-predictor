import React, { useState } from 'react';
import { ProjectedStanding, ProjectedConstructorStanding } from '../types';
import { DRIVERS, TEAMS } from '../constants';
import { ArrowUp, ArrowDown, Minus, Crown, Bot, ChevronRight } from 'lucide-react';
import { generateRaceAnalysis } from '../services/geminiService';

interface StandingsTableProps {
  wdc: ProjectedStanding[];
  wcc: ProjectedConstructorStanding[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ wdc, wcc }) => {
  const [activeTab, setActiveTab] = useState<'wdc' | 'wcc'>('wdc');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const getTeamColor = (id: string) => TEAMS[id]?.color || '#fff';
  
  const handleAnalyze = async () => {
    setLoadingAnalysis(true);
    const result = await generateRaceAnalysis(wdc, wcc);
    setAnalysis(result);
    setLoadingAnalysis(false);
  };

  const StandingRow = ({ rank, name, teamColor, points, diff, locked, addedPoints, subText }: any) => (
    <div className={`relative flex items-center mb-2 overflow-hidden rounded-r-md bg-slate-800/80 hover:bg-slate-700 transition-all group border-b border-white/5`}>
      
      {/* Team Color Strip - Left Border */}
      <div className="w-1.5 self-stretch" style={{ backgroundColor: teamColor }}></div>

      {/* Position */}
      <div className="w-12 py-3 flex flex-col items-center justify-center bg-black/20 text-white font-bold text-xl italic font-sans">
        {rank}
      </div>

      {/* Driver/Team Name */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-center">
        <div className="flex items-center gap-2">
            <span className="text-white font-bold uppercase tracking-wide text-lg leading-none">
                {name}
            </span>
            {locked && <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />}
        </div>
        {subText && <span className="text-xs text-slate-400 uppercase tracking-wider">{subText}</span>}
      </div>

      {/* Points & Stats */}
      <div className="flex items-center gap-4 pr-4">
        {/* Points Added Indicator (if any) */}
        {addedPoints > 0 && (
            <div className="hidden sm:flex px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-mono font-bold">
                +{addedPoints}
            </div>
        )}

        {/* Total Points */}
        <div className="text-right">
             <div className="text-white font-mono font-bold text-xl">{points} <span className="text-sm font-sans text-f1-red">PTS</span></div>
        </div>

        {/* Rank Change Indicator */}
        <div className="w-6 flex justify-center">
            {diff > 0 && <ArrowUp className="w-4 h-4 text-green-500" />}
            {diff < 0 && <ArrowDown className="w-4 h-4 text-f1-red" />}
            {diff === 0 && <Minus className="w-4 h-4 text-slate-600" />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
        {/* Header Tabs - F1 Style */}
        <div className="flex mb-4 gap-2">
            <button
                onClick={() => setActiveTab('wdc')}
                className={`flex-1 clip-path-slant px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border-b-4 ${
                    activeTab === 'wdc' 
                    ? 'bg-slate-800 text-white border-f1-red' 
                    : 'bg-slate-900/50 text-slate-500 border-transparent hover:bg-slate-800'
                }`}
            >
                Drivers
            </button>
            <button
                onClick={() => setActiveTab('wcc')}
                className={`flex-1 clip-path-slant px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border-b-4 ${
                    activeTab === 'wcc' 
                    ? 'bg-slate-800 text-white border-f1-red' 
                    : 'bg-slate-900/50 text-slate-500 border-transparent hover:bg-slate-800'
                }`}
            >
                Constructors
            </button>
        </div>

      <div className="bg-slate-900/50 rounded-xl p-1 border border-white/10 shadow-2xl backdrop-blur-sm flex-1 flex flex-col">
        {/* AI Analysis Button */}
        <div className="p-3 border-b border-white/5">
            {!analysis ? (
                <button 
                    onClick={handleAnalyze}
                    disabled={loadingAnalysis}
                    className="w-full py-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                >
                    {loadingAnalysis ? (
                        <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        <Bot className="w-4 h-4" />
                    )}
                    {loadingAnalysis ? "Processing Strategy..." : "AI Strategy Insight"}
                </button>
            ) : (
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-l-4 border-blue-500 p-3 rounded-r text-sm text-blue-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold uppercase tracking-wider text-xs text-blue-400 flex items-center gap-2">
                             <Bot className="w-3 h-3"/> AI Analysis
                        </span>
                        <button onClick={() => setAnalysis(null)} className="text-xs text-slate-500 hover:text-white uppercase font-bold">Close</button>
                    </div>
                    <p className="leading-relaxed text-sm font-light">{analysis}</p>
                </div>
            )}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto max-h-[600px] p-2 space-y-1 custom-scrollbar">
            {activeTab === 'wdc' && wdc.map((d) => {
                const driverInfo = DRIVERS.find(dr => dr.id === d.driverId);
                const team = TEAMS[driverInfo?.teamId || ''];
                const remainingPts = 60; 
                const isChamp = d.position === 1 && (wdc[0].points - wdc[1].points > remainingPts);
                const pointsAdded = d.points - d.previousPoints;

                return (
                    <StandingRow
                        key={d.driverId}
                        rank={d.position}
                        name={`${driverInfo?.firstName} ${driverInfo?.lastName}`}
                        subText={team?.name}
                        teamColor={team?.color}
                        points={d.points}
                        diff={d.diff}
                        locked={isChamp}
                        addedPoints={pointsAdded}
                    />
                );
            })}

            {activeTab === 'wcc' && wcc.map((t) => {
                const team = TEAMS[t.teamId];
                const remainingPts = 88; 
                const isChamp = t.position === 1 && (wcc[0].points - wcc[1].points > remainingPts);
                const pointsAdded = t.points - t.previousPoints;

                return (
                    <StandingRow
                        key={t.teamId}
                        rank={t.position}
                        name={team?.name}
                        teamColor={team?.color}
                        points={t.points}
                        diff={t.diff}
                        locked={isChamp}
                        addedPoints={pointsAdded}
                    />
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;