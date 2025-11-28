import { GoogleGenAI } from "@google/genai";
import { ProjectedStanding, ProjectedConstructorStanding } from "../types";
import { DRIVERS, TEAMS } from "../constants";

const getDriverName = (id: string) => {
  const d = DRIVERS.find(drv => drv.id === id);
  return d ? `${d.firstName} ${d.lastName}` : id;
};

const getTeamName = (id: string) => {
  const t = TEAMS[id];
  return t ? t.name : id;
};

export const generateRaceAnalysis = async (
  wdc: ProjectedStanding[],
  wcc: ProjectedConstructorStanding[]
): Promise<string> => {
    
  if (!process.env.API_KEY) {
      return "API Key not found. Please configure the environment variable.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare context data
  const top3WDC = wdc.slice(0, 3).map(p => `${p.position}. ${getDriverName(p.driverId)} (${p.points} pts)`).join('\n');
  const top3WCC = wcc.slice(0, 3).map(p => `${p.position}. ${getTeamName(p.teamId)} (${p.points} pts)`).join('\n');
  
  const wdcGap = wdc[0].points - wdc[1].points;
  const wccGap = wcc[0].points - wcc[1].points;

  const prompt = `
  You are an expert Formula 1 Strategist and Commentator. 
  
  Based on a simulated race result, here are the new projected standings:
  
  WDC (Drivers):
  ${top3WDC}
  (Gap P1-P2: ${wdcGap} pts)
  
  WCC (Constructors):
  ${top3WCC}
  (Gap P1-P2: ${wccGap} pts)
  
  Analyze this scenario in 2-3 concise sentences. Focus on:
  1. Has the title fight tightened or widened?
  2. Is the leading driver/team mathematically safe or under extreme pressure?
  3. Use dramatic F1 terminology (e.g., "maximum attack", "damage limitation", "title decider").
  
  Keep it under 60 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate analysis at this moment.";
  }
};