'use client';

import React from 'react';
import { useGym } from '@/lib/store';
import { ShieldAlert, User, Dumbbell, Sparkles, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { currentUser, users, switchUser, resetToDefaultSeed } = useGym();

  // Find key demo personas
  const adminUser = users.find((u) => u.role === 'admin') || users[0];
  const eliteMember = users.find((u) => u.tier === 'elite' && u.role === 'member') || users[1];
  const proMember = users.find((u) => u.tier === 'pro' && u.role === 'member') || users[2];
  const baseMember = users.find((u) => u.tier === 'base' && u.role === 'member') || users[3];
  const trainerUser = users.find((u) => u.role === 'trainer') || users[4];

  return (
    <div className="bg-titanium-900/95 border-b border-titanium-700/60 backdrop-blur-md sticky top-0 z-50 px-3 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-neon-cyan uppercase tracking-wider text-[11px] bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded-full">
            <KeyRound className="w-3 h-3" /> Quick Demo Role Switcher
          </span>
          <span className="hidden sm:inline text-titanium-400">
            Active: <strong className="text-white font-medium">{currentUser.name}</strong> ({currentUser.role.toUpperCase()}{currentUser.role === 'member' ? ` • ${currentUser.tier.toUpperCase()}` : ''})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Admin Switcher */}
          <button
            onClick={() => switchUser(adminUser.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentUser.id === adminUser.id
                ? 'bg-neon-amber text-titanium-950 shadow-glow-amber font-semibold'
                : 'bg-titanium-800 text-titanium-300 hover:bg-titanium-700 hover:text-white border border-titanium-700'
            }`}
            title="Switch to System Administrator"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
            {currentUser.id === adminUser.id && <CheckCircle2 className="w-3 h-3" />}
          </button>

          {/* Elite Member */}
          <button
            onClick={() => switchUser(eliteMember.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentUser.id === eliteMember.id
                ? 'bg-neon-cyan text-titanium-950 shadow-glow-cyan font-semibold'
                : 'bg-titanium-800 text-titanium-300 hover:bg-titanium-700 hover:text-white border border-titanium-700'
            }`}
            title="Switch to Elite Customer (24/7 Access, 8 PT, Spa)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer (Elite)</span>
            {currentUser.id === eliteMember.id && <CheckCircle2 className="w-3 h-3" />}
          </button>

          {/* Pro Member */}
          <button
            onClick={() => switchUser(proMember.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentUser.id === proMember.id
                ? 'bg-neon-lime text-titanium-950 shadow-glow-lime font-semibold'
                : 'bg-titanium-800 text-titanium-300 hover:bg-titanium-700 hover:text-white border border-titanium-700'
            }`}
            title="Switch to Pro Customer (24/7 Access, 2 PT)"
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer (Pro)</span>
            {currentUser.id === proMember.id && <CheckCircle2 className="w-3 h-3" />}
          </button>

          {/* Base Member (Off Peak) */}
          <button
            onClick={() => switchUser(baseMember.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentUser.id === baseMember.id
                ? 'bg-titanium-300 text-titanium-950 font-semibold'
                : 'bg-titanium-800 text-titanium-400 hover:bg-titanium-700 hover:text-white border border-titanium-700'
            }`}
            title="Switch to Base Customer (Off-Peak 9am-4pm only)"
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer (Base)</span>
            {currentUser.id === baseMember.id && <CheckCircle2 className="w-3 h-3" />}
          </button>

          {/* Trainer */}
          <button
            onClick={() => switchUser(trainerUser.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentUser.id === trainerUser.id
                ? 'bg-purple-500 text-white font-semibold shadow-md'
                : 'bg-titanium-800 text-titanium-300 hover:bg-titanium-700 hover:text-white border border-titanium-700'
            }`}
            title="Switch to Trainer Portal"
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Trainer</span>
            {currentUser.id === trainerUser.id && <CheckCircle2 className="w-3 h-3" />}
          </button>

          {/* Reset button */}
          <button
            onClick={() => {
              if (confirm('Reset seed data and clear local changes?')) {
                resetToDefaultSeed();
              }
            }}
            className="flex items-center gap-1 px-2 py-1 text-titanium-400 hover:text-white transition-colors ml-1"
            title="Reset to default seed data"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
