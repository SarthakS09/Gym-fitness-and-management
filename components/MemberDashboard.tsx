'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { GoalRecommendations } from './GoalRecommendations';
import { 
  Sparkles, 
  QrCode, 
  Calendar, 
  Dumbbell, 
  Flame, 
  CheckCircle2, 
  Clock, 
  User, 
  Award, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  History,
  Trash2
} from 'lucide-react';

interface MemberDashboardProps {
  onOpenPass: () => void;
  onOpenSchedule: () => void;
  onUpgradeTier: () => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  onOpenPass,
  onOpenSchedule,
  onUpgradeTier
}) => {
  const { currentUser, classes, attendance, cancelClassBooking, liveGymOccupancy, maxGymCapacity } = useGym();
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'classes' | 'history'>('overview');

  const myBookedClasses = classes.filter((c) => c.enrolledUserIds.includes(currentUser.id));
  const myAttendance = attendance.filter((a) => a.userId === currentUser.id);

  // Expiry calculation
  const expiryDateObj = new Date(currentUser.expiryDate);
  const now = new Date();
  const daysUntilExpiry = Math.ceil((expiryDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isExpired = daysUntilExpiry <= 0;
  const isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 14;

  return (
    <div className="space-y-8">
      {/* Member Hero Entitlement Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-titanium-700 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 blur-3xl pointer-events-none rounded-full ${
          currentUser.tier === 'elite' ? 'bg-neon-amber/15' : currentUser.tier === 'pro' ? 'bg-neon-cyan/15' : 'bg-slate-600/15'
        }`} />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
              />
              {currentUser.isCheckedIn && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-neon-lime border-2 border-titanium-950 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  currentUser.tier === 'elite'
                    ? 'bg-neon-amber text-titanium-950 shadow-glow-amber'
                    : currentUser.tier === 'pro'
                    ? 'bg-neon-cyan text-titanium-950 shadow-glow-cyan'
                    : 'bg-titanium-700 text-white'
                }`}>
                  {currentUser.tier} TIER
                </span>
                <span className="text-xs font-mono text-titanium-400">{currentUser.memberId}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentUser.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-titanium-300 mt-1">
                <span>Goal: <strong className="text-white capitalize">{currentUser.goal.replace('_', ' ')}</strong></span>
                <span>•</span>
                <span>Level: <strong className="text-white capitalize">{currentUser.fitnessLevel}</strong></span>
                <span>•</span>
                <span className="text-neon-lime font-semibold">Streak: {currentUser.streakDays} Days</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPass}
              className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                currentUser.isCheckedIn
                  ? 'bg-titanium-800 hover:bg-titanium-700 text-titanium-200 border border-titanium-600'
                  : 'bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 shadow-glow-cyan hover:brightness-110'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{currentUser.isCheckedIn ? 'Checked In • Open Pass' : 'Scan Turnstile Pass'}</span>
            </button>
            <button
              onClick={onUpgradeTier}
              className="px-4 py-3 rounded-xl bg-titanium-800 hover:bg-titanium-700 text-titanium-300 hover:text-white text-xs font-semibold border border-titanium-700"
            >
              Change Tier
            </button>
          </div>
        </div>

        {/* Expiry Warning Banner if applicable */}
        {isExpired && (
          <div className="mt-6 p-3 rounded-xl bg-neon-crimson/10 border border-neon-crimson/40 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-crimson" />
              <span>Your membership has expired! Turnstile access is locked. Please renew to regain access.</span>
            </div>
            <button
              onClick={onUpgradeTier}
              className="px-3 py-1 rounded bg-neon-crimson text-white font-bold text-[11px]"
            >
              Renew Now
            </button>
          </div>
        )}

        {isExpiringSoon && (
          <div className="mt-6 p-3 rounded-xl bg-neon-amber/10 border border-neon-amber/40 text-amber-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-amber" />
              <span>Your membership will renew in {daysUntilExpiry} days ({currentUser.expiryDate}).</span>
            </div>
            <button
              onClick={onUpgradeTier}
              className="px-3 py-1 rounded bg-neon-amber text-titanium-950 font-bold text-[11px]"
            >
              Extend Pass
            </button>
          </div>
        )}

        {/* 4 Entitlement Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
          {/* Access Window */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Access Window</span>
              <Clock className="w-3.5 h-3.5 text-neon-cyan" />
            </div>
            <div className="text-base font-bold text-white">
              {currentUser.tier === 'base' ? 'Off-Peak' : '24/7 Unlimited'}
            </div>
            <span className="text-[10px] text-titanium-400 mt-0.5 block">
              {currentUser.tier === 'base' ? '9:00 AM – 4:00 PM' : 'All-Hours Turnstile Access'}
            </span>
          </div>

          {/* PT Sessions Remaining */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>1-on-1 PT Sessions</span>
              <Dumbbell className="w-3.5 h-3.5 text-neon-lime" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white font-mono">{currentUser.ptSessionsRemaining}</span>
              <span className="text-xs text-titanium-500 font-mono">/ {currentUser.ptSessionsTotal} left</span>
            </div>
            <span className="text-[10px] text-neon-lime mt-0.5 block">
              {currentUser.assignedTrainerName || 'Trainer Pool'}
            </span>
          </div>

          {/* Guest Passes */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Guest Passes</span>
              <Award className="w-3.5 h-3.5 text-neon-amber" />
            </div>
            <div className="text-xl font-black text-white font-mono">
              {currentUser.guestPassesRemaining > 100 ? 'Unlimited' : currentUser.guestPassesRemaining}
            </div>
            <span className="text-[10px] text-titanium-400 mt-0.5 block">Monthly allocation</span>
          </div>

          {/* Gym Occupancy Right Now */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Floor Density</span>
              <Flame className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-base font-bold text-white">
              {liveGymOccupancy} <span className="text-xs text-titanium-400 font-normal">in gym now</span>
            </div>
            <span className="text-[10px] text-neon-lime mt-0.5 block">Good time to train</span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-titanium-800 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                : 'bg-titanium-900 text-titanium-400 hover:text-white border border-titanium-800'
            }`}
          >
            Overview & Schedule
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'recommendations'
                ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                : 'bg-titanium-900 text-titanium-400 hover:text-white border border-titanium-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-lime" />
            <span>AI Goal Workout & Nutrition</span>
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'classes'
                ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                : 'bg-titanium-900 text-titanium-400 hover:text-white border border-titanium-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>My Booked Classes ({myBookedClasses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                : 'bg-titanium-900 text-titanium-400 hover:text-white border border-titanium-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Check-In History</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Turnstile Access Status Card */}
          <div className="glass-panel rounded-3xl p-6 border border-titanium-800 lg:col-span-1 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-titanium-400 uppercase">
                  Biometric Access Gate
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${currentUser.isCheckedIn ? 'bg-neon-lime animate-ping' : 'bg-titanium-600'}`} />
              </div>
              <h3 className="text-lg font-bold text-white">Turnstile Status</h3>
              <p className="text-xs text-titanium-400 mt-1">
                {currentUser.isCheckedIn
                  ? 'Currently logged inside the facility. Turnstile logged check-in.'
                  : 'Currently outside the facility. Tap turnstile pass to scan in.'}
              </p>

              <div className="my-5 p-4 rounded-2xl bg-titanium-900/90 border border-titanium-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-titanium-400">Current Status:</span>
                  <strong className={currentUser.isCheckedIn ? 'text-neon-lime font-bold' : 'text-titanium-300'}>
                    {currentUser.isCheckedIn ? 'Checked In (Active)' : 'Outside'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-titanium-400">Last Gate Access:</span>
                  <span className="text-white font-mono">{currentUser.lastCheckIn || 'None recorded today'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-titanium-400">Access Window:</span>
                  <span className="text-neon-cyan font-semibold">
                    {currentUser.tier === 'base' ? 'Off-Peak (9am-4pm)' : '24/7 Valid'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenPass}
              className="w-full py-3 rounded-xl bg-titanium-800 hover:bg-titanium-700 text-white font-bold text-xs border border-titanium-700 flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-neon-cyan" />
              <span>Launch Digital Pass Simulator</span>
            </button>
          </div>

          {/* Booked Classes & Next Sessions */}
          <div className="glass-panel rounded-3xl p-6 border border-titanium-800 lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-titanium-800">
              <div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Upcoming Booked Classes
                </h3>
                <p className="text-xs text-titanium-400">Sessions reserved under your membership tier</p>
              </div>
              <button
                onClick={onOpenSchedule}
                className="px-3 py-1.5 rounded-lg bg-neon-cyan text-titanium-950 font-bold text-xs shadow-glow-cyan"
              >
                Browse All Classes
              </button>
            </div>

            {myBookedClasses.length === 0 ? (
              <div className="text-center py-10 text-titanium-400 text-xs">
                <Calendar className="w-8 h-8 mx-auto text-titanium-600 mb-2" />
                <p>You haven't reserved any studio masterclasses yet.</p>
                <button
                  onClick={onOpenSchedule}
                  className="mt-3 text-neon-cyan font-bold hover:underline"
                >
                  Explore Class Schedule →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myBookedClasses.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-titanium-900/80 border border-titanium-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{c.title}</span>
                        <span className="text-[10px] font-mono uppercase bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded font-bold">
                          {c.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-titanium-300 mt-1">
                        <span>Time: <strong className="text-white">{c.time}</strong></span>
                        <span>•</span>
                        <span>Room: {c.room}</span>
                        <span>•</span>
                        <span>Coach: {c.trainerName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => cancelClassBooking(c.id)}
                      className="text-xs text-neon-crimson hover:underline font-semibold"
                    >
                      Cancel Spot
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AI Goal Recommendations */}
      {activeTab === 'recommendations' && (
        <GoalRecommendations />
      )}

      {/* TAB 3: My Booked Classes */}
      {activeTab === 'classes' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-titanium-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                My Reserved Masterclasses
              </h3>
              <p className="text-xs text-titanium-400">Manage and cancel your class reservations</p>
            </div>
            <button
              onClick={onOpenSchedule}
              className="px-3.5 py-1.5 rounded-xl bg-neon-cyan text-titanium-950 font-bold text-xs shadow-glow-cyan"
            >
              Book New Session
            </button>
          </div>

          {myBookedClasses.length === 0 ? (
            <div className="text-center py-12 text-titanium-400 text-xs">
              No classes currently reserved.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myBookedClasses.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-titanium-900/80 border border-titanium-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-neon-cyan px-2 py-0.5 rounded bg-neon-cyan/10">
                      {c.category}
                    </span>
                    <button
                      onClick={() => cancelClassBooking(c.id)}
                      className="text-xs text-neon-crimson font-medium hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-titanium-400">{c.description}</p>
                  <div className="pt-2 border-t border-titanium-800 text-xs text-titanium-300 space-y-1">
                    <div>Coach: <strong className="text-white">{c.trainerName}</strong></div>
                    <div>Time: <strong className="text-white">{c.time}</strong> ({c.durationMinutes}m)</div>
                    <div>Days: <span className="font-mono text-neon-lime">{c.days.join(', ')}</span></div>
                    <div>Studio: <span>{c.room}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Check-In History */}
      {activeTab === 'history' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                My Turnstile Check-In History
              </h3>
              <p className="text-xs text-titanium-400">Timestamps and access logs recorded at gate</p>
            </div>
            <span className="text-xs font-mono text-neon-lime font-bold">
              {currentUser.streakDays} Consecutive Days Logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-titanium-800 bg-titanium-900/60 text-titanium-400">
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Turnstile Event</th>
                  <th className="p-3">Tier Registered</th>
                  <th className="p-3">Verification Result</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-titanium-800/60">
                {myAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-titanium-400 text-xs">
                      No attendance records logged yet. Tap the turnstile pass to record your first check-in!
                    </td>
                  </tr>
                ) : (
                  myAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-titanium-900/40">
                      <td className="p-3 font-mono text-white">{rec.timestamp}</td>
                      <td className="p-3 uppercase font-semibold text-titanium-300">
                        {rec.type.replace('_', ' ')}
                      </td>
                      <td className="p-3 font-mono uppercase text-neon-cyan">{rec.tier}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                          rec.status === 'granted'
                            ? 'bg-neon-lime/10 text-neon-lime'
                            : 'bg-neon-crimson/10 text-neon-crimson'
                        }`}>
                          {rec.status === 'granted' ? 'Access Granted' : 'Access Denied'}
                        </span>
                      </td>
                      <td className="p-3 text-titanium-400 text-[11px]">
                        {rec.reason || 'Turnstile Access Window Valid'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
