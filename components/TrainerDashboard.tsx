'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { 
  Dumbbell, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Target,
  Search
} from 'lucide-react';

export const TrainerDashboard: React.FC = () => {
  const { currentUser, users, classes } = useGym();
  const [activeTab, setActiveTab] = useState<'roster' | 'classes'>('roster');
  const [searchMember, setSearchMember] = useState('');

  // Trainer's assigned members
  const assignedMembers = users.filter((u) => u.role === 'member');
  const myClasses = classes.filter((c) => c.trainerId === currentUser.id || c.trainerName.includes(currentUser.name));

  const filteredMembers = assignedMembers.filter((m) =>
    m.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.goal.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Trainer Profile Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-titanium-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-400/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  HEAD STRENGTH COACH
                </span>
                <span className="text-xs font-mono text-titanium-400">{currentUser.memberId}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentUser.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-titanium-300 mt-1">
                <span>Specialization: <strong>Hypertrophy & Kinetic Power</strong></span>
                <span>•</span>
                <span className="text-neon-lime font-semibold">Active Roster: {assignedMembers.length} Athletes</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-titanium-900 border border-titanium-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'roster'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Athlete Roster
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'classes'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              My Sessions ({myClasses.length})
            </button>
          </div>
        </div>

        {/* 3 Metric counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Assigned Athletes</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{assignedMembers.length}</div>
            <span className="text-[10px] text-purple-300 mt-0.5 block">Tiered athletes</span>
          </div>

          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Weekly Masterclasses</span>
              <Calendar className="w-4 h-4 text-neon-cyan" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{myClasses.length}</div>
            <span className="text-[10px] text-neon-cyan mt-0.5 block">Capacity strictly managed</span>
          </div>

          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>PT Sessions Conducted</span>
              <Award className="w-4 h-4 text-neon-lime" />
            </div>
            <div className="text-2xl font-black text-white font-mono">48</div>
            <span className="text-[10px] text-neon-lime mt-0.5 block">This month</span>
          </div>
        </div>
      </div>

      {/* Athlete Roster Tab */}
      {activeTab === 'roster' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Athlete Progress & Goal Manifest
              </h3>
              <p className="text-xs text-titanium-400">View captured fitness goals, body stats and check-in streaks</p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-titanium-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search athlete or goal..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="bg-titanium-900 border border-titanium-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-titanium-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((m) => (
              <div key={m.id} className="bg-titanium-900/80 rounded-2xl p-5 border border-titanium-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-12 h-12 rounded-xl object-cover border border-titanium-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm truncate">{m.name}</div>
                    <div className="text-[11px] font-mono text-neon-cyan">{m.memberId}</div>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold ${
                      m.tier === 'elite' ? 'bg-neon-amber/20 text-neon-amber' : m.tier === 'pro' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-titanium-800 text-titanium-300'
                    }`}>
                      {m.tier} Tier
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-titanium-800/80 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-titanium-400">Fitness Goal:</span>
                    <strong className="text-white capitalize">{m.goal.replace('_', ' ')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium-400">Experience Level:</span>
                    <span className="text-titanium-200 capitalize">{m.fitnessLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium-400">Weight Progression:</span>
                    <span className="text-neon-lime font-mono">{m.currentWeightKg}kg → {m.targetWeightKg}kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-titanium-400">PT Sessions Left:</span>
                    <span className="text-white font-mono font-bold">{m.ptSessionsRemaining}/{m.ptSessionsTotal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-titanium-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                My Scheduled Coaching Sessions
              </h3>
              <p className="text-xs text-titanium-400">Manage class rosters and verify athlete arrivals</p>
            </div>
          </div>

          <div className="space-y-4">
            {myClasses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-titanium-900/80 border border-titanium-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{c.title}</span>
                      <span className="text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-bold">
                        {c.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-titanium-300 mt-1">
                      <span>Time: <strong className="text-white">{c.time}</strong></span>
                      <span>•</span>
                      <span>Studio: {c.room}</span>
                      <span>•</span>
                      <span>Days: {c.days.join(', ')}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-neon-cyan">
                      {c.enrolledUserIds.length} / {c.capacity} Registered
                    </div>
                  </div>
                </div>

                {/* Enrolled members chips */}
                <div className="pt-3 border-t border-titanium-800">
                  <span className="text-[11px] text-titanium-400 uppercase font-mono block mb-2">
                    Booked Athletes for Next Slot:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {c.enrolledUserIds.length === 0 ? (
                      <span className="text-xs text-titanium-500 italic">No bookings yet for this slot.</span>
                    ) : (
                      c.enrolledUserIds.map((userId) => {
                        const memberObj = users.find((u) => u.id === userId);
                        if (!memberObj) return null;
                        return (
                          <div
                            key={userId}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-titanium-800 border border-titanium-700 text-xs"
                          >
                            <img
                              src={memberObj.avatar}
                              alt={memberObj.name}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-white font-medium">{memberObj.name}</span>
                            <span className="text-[10px] font-mono text-neon-cyan uppercase">({memberObj.tier})</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
