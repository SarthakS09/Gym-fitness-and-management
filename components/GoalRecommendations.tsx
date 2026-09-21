'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { GOAL_RECOMMENDATIONS } from '@/lib/seed-data';
import { FitnessGoal } from '@/lib/types';
import { 
  Sparkles, 
  Flame, 
  HeartPulse, 
  Dumbbell, 
  Zap, 
  Clock, 
  Droplet, 
  Apple, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Target,
  Trophy,
  Activity
} from 'lucide-react';

export const GoalRecommendations: React.FC = () => {
  const { currentUser } = useGym();
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal>(currentUser.goal);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const recommendation = GOAL_RECOMMENDATIONS[selectedGoal] || GOAL_RECOMMENDATIONS['muscle_building'];
  const currentDay = recommendation.weeklySplit[selectedDayIdx] || recommendation.weeklySplit[0];

  const toggleExercise = (name: string) => {
    setCompletedExercises((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Member Goal Alignment */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-titanium-700/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-cyan/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Goal-Driven Adaptive Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {recommendation.title}
            </h2>
            <p className="text-sm text-neon-cyan font-medium mt-1">
              {recommendation.tagline}
            </p>
            <p className="text-xs sm:text-sm text-titanium-300 mt-2 max-w-2xl leading-relaxed">
              {recommendation.summary}
            </p>
          </div>

          {/* Member Status Card */}
          <div className="bg-titanium-900/80 border border-titanium-700/70 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center text-neon-lime">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-titanium-400 block uppercase font-mono">Current Member Profile</span>
              <div className="text-sm font-bold text-white">{currentUser.name}</div>
              <div className="flex items-center gap-2 mt-0.5 text-xs">
                <span className="text-neon-lime font-bold">{currentUser.streakDays} Day Streak</span>
                <span className="text-titanium-500">•</span>
                <span className="text-titanium-300 capitalize">{currentUser.fitnessLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goal Switcher Tabs */}
        <div className="mt-8 pt-6 border-t border-titanium-800">
          <label className="block text-xs font-bold text-titanium-400 uppercase tracking-wider mb-3">
            Explore Protocol For Any Fitness Goal:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'muscle_building', label: 'Muscle Building', icon: Flame, color: 'neon-cyan' },
              { id: 'fat_loss', label: 'Fat Loss / Shred', icon: HeartPulse, color: 'neon-lime' },
              { id: 'strength', label: 'Pure Strength 5x5', icon: Dumbbell, color: 'neon-amber' },
              { id: 'endurance', label: 'Aerobic Engine', icon: Zap, color: 'purple-400' }
            ].map((g) => {
              const Icon = g.icon;
              const isSelected = selectedGoal === g.id;
              const isUserNativeGoal = currentUser.goal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setSelectedGoal(g.id as FitnessGoal);
                    setSelectedDayIdx(0);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-titanium-800 border-neon-cyan shadow-glow-cyan text-white'
                      : 'bg-titanium-900/70 border-titanium-800 text-titanium-400 hover:border-titanium-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon className="w-4 h-4" />
                    {isUserNativeGoal && (
                      <span className="text-[9px] bg-neon-cyan/20 text-neon-cyan px-1.5 py-0.2 rounded font-mono font-bold">
                        YOUR GOAL
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold block">{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Macronutrient & Nutritional Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Macro Card */}
        <div className="glass-panel rounded-2xl p-5 border border-titanium-800">
          <div className="flex items-center gap-2 text-xs text-titanium-400 mb-2 font-medium">
            <Apple className="w-4 h-4 text-neon-lime" />
            <span>Target Macronutrient Distribution</span>
          </div>
          <div className="space-y-2 mt-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-titanium-300">Protein Target</span>
                <span className="font-mono text-neon-cyan font-semibold">{recommendation.macroRatio.protein}</span>
              </div>
              <div className="w-full bg-titanium-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-neon-cyan h-full rounded-full w-2/5" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-titanium-300">Carbohydrates</span>
                <span className="font-mono text-neon-amber font-semibold">{recommendation.macroRatio.carbs}</span>
              </div>
              <div className="w-full bg-titanium-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-neon-amber h-full rounded-full w-1/2" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-titanium-300">Fats</span>
                <span className="font-mono text-purple-400 font-semibold">{recommendation.macroRatio.fats}</span>
              </div>
              <div className="w-full bg-titanium-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full w-1/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Calories Card */}
        <div className="glass-panel rounded-2xl p-5 border border-titanium-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-titanium-400 mb-2 font-medium">
              <Target className="w-4 h-4 text-neon-amber" />
              <span>Target Energy Expenditure</span>
            </div>
            <div className="text-base font-bold text-white mt-2">
              {recommendation.caloriesTarget}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-titanium-800/80 text-[11px] text-titanium-400">
            Calibrated for: <strong className="text-white capitalize">{currentUser.goal.replace('_', ' ')}</strong>
          </div>
        </div>

        {/* Hydration Card */}
        <div className="glass-panel rounded-2xl p-5 border border-titanium-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-titanium-400 mb-2 font-medium">
              <Droplet className="w-4 h-4 text-neon-cyan" />
              <span>Daily Hydration Protocol</span>
            </div>
            <div className="text-base font-bold text-white mt-2">
              {recommendation.hydrationTarget}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-titanium-800/80 text-[11px] text-titanium-400">
            Vital for cellular nutrient delivery and ATP regeneration
          </div>
        </div>
      </div>

      {/* Interactive Workout Routine Explorer */}
      <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-titanium-800">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              7-Day Periodized Training Schedule
            </h3>
            <span className="text-xs text-titanium-400">
              Interactive split engineered for {selectedGoal.replace('_', ' ')}
            </span>
          </div>

          {/* Day Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {recommendation.weeklySplit.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDayIdx === idx
                    ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                    : 'bg-titanium-800 text-titanium-400 hover:text-white'
                }`}
              >
                {item.day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day View */}
        <div className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-neon-cyan uppercase">
                {currentDay.day}
              </span>
              <h4 className="text-xl font-black text-white">{currentDay.title}</h4>
              <p className="text-xs text-titanium-400 mt-0.5">Focus: {currentDay.focus}</p>
            </div>
            <div className="text-xs text-titanium-400 font-mono">
              {currentDay.exercises.length} Prescribed Movements
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-3 mt-6">
            {currentDay.exercises.map((ex, idx) => {
              const isDone = completedExercises[ex.name];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-neon-lime/5 border-neon-lime/30 opacity-70'
                      : 'bg-titanium-900/60 border-titanium-800 hover:border-titanium-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleExercise(ex.name)}
                        className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors ${
                          isDone
                            ? 'bg-neon-lime border-neon-lime text-titanium-950'
                            : 'border-titanium-600 hover:border-neon-cyan text-transparent'
                        }`}
                        title="Mark Exercise Completed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isDone ? 'line-through text-titanium-400' : 'text-white'}`}>
                            {ex.name}
                          </span>
                          <span className="text-[10px] bg-titanium-800 text-titanium-300 px-2 py-0.5 rounded font-medium">
                            {ex.targetMuscle}
                          </span>
                        </div>
                        <p className="text-xs text-titanium-400 mt-1">
                          <strong className="text-titanium-300">Cue:</strong> {ex.tips}
                        </p>
                      </div>
                    </div>

                    {/* Prescription Badge */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-neon-cyan">{ex.sets} × {ex.reps}</div>
                      <div className="text-[11px] text-titanium-400 flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-titanium-500" />
                        <span>{ex.rest} rest</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nutrition Principles & Supplement Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-titanium-800">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
            <Apple className="w-4 h-4 text-neon-lime" />
            <span>Athletic Nutrition Principles</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-titanium-300">
            {recommendation.nutritionTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-lime shrink-0 mt-1.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-titanium-800">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span>Targeted Supplementation Protocol</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-titanium-300">
            {recommendation.recommendedSupplements.map((supp, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0 mt-1.5" />
                <span>{supp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
