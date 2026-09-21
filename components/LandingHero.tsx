'use client';

import React from 'react';
import { useGym } from '@/lib/store';
import { 
  Dumbbell, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Clock, 
  HeartPulse,
  Award,
  ChevronRight
} from 'lucide-react';

interface LandingHeroProps {
  onOpenOnboarding: () => void;
  onOpenPass: () => void;
  onNavigateToPricing: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onOpenOnboarding,
  onOpenPass,
  onNavigateToPricing,
  onNavigateToDashboard,
  onNavigateToLogin
}) => {
  const { liveGymOccupancy, maxGymCapacity, users, classes } = useGym();

  const totalMembersCount = users.filter((u) => u.role === 'member').length + 420;

  return (
    <div className="relative overflow-hidden pt-8 pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-cyan/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Context Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-titanium-900 border border-titanium-700/80 text-xs text-titanium-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span className="font-semibold text-white">GLA University, Mathura</span>
            <span className="text-titanium-500">•</span>
            <span className="text-neon-cyan font-mono">B.Tech CSE Capstone</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-titanium-900/60 border border-titanium-800 text-xs text-titanium-400">
            <span>Supervisor:</span>
            <strong className="text-titanium-200">Mr. Yash Singh</strong>
          </div>
        </div>

        {/* Hero Title and Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-sans">
            FORGE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-teal-300 to-blue-500 glow-text-cyan">TITANIUM</span> STANDARD
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-titanium-300 leading-relaxed max-w-3xl mx-auto">
            A next-generation tiered fitness management platform bridging marketing with automated operations. Powered by role-based dashboards, tier-aware turnstile access control, and goal-driven personalization.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenOnboarding}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 font-bold text-sm shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Member Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToLogin}
              className="px-6 py-3.5 rounded-xl bg-titanium-800/90 hover:bg-titanium-700/90 text-white font-semibold text-sm border border-titanium-700 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-neon-amber" />
              <span>Login (Admin / Customer)</span>
            </button>
            <button
              onClick={onOpenPass}
              className="px-6 py-3.5 rounded-xl bg-titanium-900/90 hover:bg-titanium-800 text-neon-cyan font-semibold text-sm border border-neon-cyan/30 shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-neon-cyan" />
              <span>Turnstile Pass Simulator</span>
            </button>
          </div>
        </div>

        {/* Live Studio Pulse & Metrics Bar */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-4 sm:p-6 shadow-glass border border-titanium-700/50">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-titanium-800/80">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-lime"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">Live Studio Telemetry</span>
              </div>
              <span className="text-xs text-titanium-400 font-mono">Turnstiles Online • Synced</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {/* Studio Occupancy */}
              <div className="bg-titanium-900/70 rounded-xl p-3.5 border border-titanium-800/60">
                <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
                  <span>Current Occupancy</span>
                  <HeartPulse className="w-3.5 h-3.5 text-neon-lime" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white font-mono">{liveGymOccupancy}</span>
                  <span className="text-xs text-titanium-500 font-mono">/ {maxGymCapacity} Max</span>
                </div>
                <div className="w-full bg-titanium-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-neon-cyan to-neon-lime h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (liveGymOccupancy / maxGymCapacity) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Active Members */}
              <div className="bg-titanium-900/70 rounded-xl p-3.5 border border-titanium-800/60">
                <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
                  <span>Total Active Athletes</span>
                  <Users className="w-3.5 h-3.5 text-neon-cyan" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{totalMembersCount}</div>
                <span className="text-[11px] text-neon-cyan mt-1 block">Tiered Subscriptions</span>
              </div>

              {/* Masterclasses */}
              <div className="bg-titanium-900/70 rounded-xl p-3.5 border border-titanium-800/60">
                <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
                  <span>Today's Sessions</span>
                  <Clock className="w-3.5 h-3.5 text-neon-amber" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{classes.length}</div>
                <span className="text-[11px] text-neon-amber mt-1 block">Capacity Enforced</span>
              </div>

              {/* Certified Coaches */}
              <div className="bg-titanium-900/70 rounded-xl p-3.5 border border-titanium-800/60">
                <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
                  <span>Master Trainers</span>
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">12</div>
                <span className="text-[11px] text-purple-300 mt-1 block">Dedicated 1-on-1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Operational Architecture Built for Modern Fitness
            </h2>
            <p className="mt-2 text-sm text-titanium-400 max-w-2xl mx-auto">
              Solving the disconnect between front-end marketing and back-end gym administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: 3-Tier System */}
            <div className="glass-card-interactive rounded-2xl p-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Tier Entitlements</h3>
              <p className="text-sm text-titanium-300 leading-relaxed mb-4">
                Enforces strict access windows between <strong>Base</strong> (Off-Peak 9am-4pm), <strong>Pro</strong> (24/7 Unlimited), and <strong>Elite</strong> (VIP Spa & 8 PT sessions) with zero manual check-in friction.
              </p>
              <button 
                onClick={onNavigateToPricing}
                className="text-xs font-semibold text-neon-cyan hover:underline flex items-center gap-1"
              >
                <span>Compare Base, Pro & Elite</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Goal Recommendation */}
            <div className="glass-card-interactive rounded-2xl p-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-neon-lime/10 border border-neon-lime/30 flex items-center justify-center mb-4">
                <Dumbbell className="w-6 h-6 text-neon-lime" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Goal-Driven Personalization</h3>
              <p className="text-sm text-titanium-300 leading-relaxed mb-4">
                Acts immediately on the fitness goal selected at onboarding. Generates 7-day periodized workout splits and custom macronutrient recommendations for Muscle Building, Fat Loss, Strength, or Endurance.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-titanium-800 text-titanium-300 px-2 py-0.5 rounded">Muscle Hypertrophy</span>
                <span className="text-[10px] bg-titanium-800 text-titanium-300 px-2 py-0.5 rounded">MetCon Fat Loss</span>
                <span className="text-[10px] bg-titanium-800 text-titanium-300 px-2 py-0.5 rounded">5x5 Strength</span>
              </div>
            </div>

            {/* Card 3: Role Scoped Dashboards */}
            <div className="glass-card-interactive rounded-2xl p-6 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-neon-amber/10 border border-neon-amber/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-neon-amber" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Role-Based Access Control (RBAC)</h3>
              <p className="text-sm text-titanium-300 leading-relaxed mb-4">
                Scoped dashboards tailored specifically for <strong>Admins</strong> (revenue analytics, member CRUD), <strong>Trainers</strong> (schedules, rosters), and <strong>Members</strong> (digital turnstile pass, bookings).
              </p>
              <button 
                onClick={onNavigateToDashboard}
                className="text-xs font-semibold text-neon-amber hover:underline flex items-center gap-1"
              >
                <span>Launch Scoped Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Authors Recognition */}
        <div className="mt-16 pt-8 border-t border-titanium-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-titanium-400">
          <div>
            <span className="font-semibold text-titanium-300">Project Team (GLA University): </span>
            <span>Sarthak Singh (2415001425), Sanskriti Saini (2415001417), Sanket Yadav (2415001409), Sanket Sahu (2415001408)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-titanium-900 border border-titanium-700 text-titanium-300 font-mono text-[11px]">
              Next.js • React • Tailwind • Recharts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
