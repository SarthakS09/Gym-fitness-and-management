'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { 
  QrCode, 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  LogOut,
  LogIn
} from 'lucide-react';

interface DigitalGymPassProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeTier?: () => void;
}

export const DigitalGymPass: React.FC<DigitalGymPassProps> = ({
  isOpen,
  onClose,
  onUpgradeTier
}) => {
  const { currentUser, simulateTurnstileCheckIn, simulateTurnstileCheckOut } = useGym();
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [simulatedTimeMode, setSimulatedTimeMode] = useState<'current' | 'offpeak' | 'peak'>('current');

  if (!isOpen) return null;

  const handleScan = () => {
    let hourToUse: number | undefined = undefined;
    if (simulatedTimeMode === 'offpeak') hourToUse = 11; // 11:00 AM (Within 9am-4pm)
    if (simulatedTimeMode === 'peak') hourToUse = 18; // 6:00 PM (Outside 9am-4pm)

    if (currentUser.isCheckedIn) {
      const res = simulateTurnstileCheckOut();
      setFeedback(res);
    } else {
      const res = simulateTurnstileCheckIn(hourToUse);
      setFeedback(res);
    }
  };

  const isExpired = new Date(currentUser.expiryDate) < new Date();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-titanium-700 p-6 shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-titanium-400 hover:text-white p-2 rounded-full hover:bg-titanium-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Turnstile Simulator Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-titanium-900 border border-titanium-700 text-xs text-neon-cyan font-mono mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>BIOMETRIC NFC / QR TURNSTILE</span>
          </div>
          <h3 className="text-xl font-bold text-white">Digital Member Pass</h3>
        </div>

        {/* Realistic Holographic Pass Card */}
        <div 
          className={`relative rounded-2xl p-5 border text-white overflow-hidden shadow-2xl transition-all duration-300 ${
            currentUser.tier === 'elite'
              ? 'bg-gradient-to-br from-titanium-900 via-slate-900 to-amber-950/40 border-neon-amber/50 shadow-glow-amber'
              : currentUser.tier === 'pro'
              ? 'bg-gradient-to-br from-titanium-900 via-slate-900 to-cyan-950/40 border-neon-cyan/50 shadow-glow-cyan'
              : 'bg-gradient-to-br from-titanium-900 via-slate-900 to-slate-800 border-titanium-600 shadow-lg'
          }`}
        >
          {/* Card Top Strip */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-1.5 font-black tracking-widest text-xs">
              <span className="text-white">TITANIUM</span>
              <span className={currentUser.tier === 'elite' ? 'text-neon-amber' : currentUser.tier === 'pro' ? 'text-neon-cyan' : 'text-titanium-300'}>
                FITNESS
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                currentUser.tier === 'elite'
                  ? 'bg-neon-amber text-titanium-950'
                  : currentUser.tier === 'pro'
                  ? 'bg-neon-cyan text-titanium-950'
                  : 'bg-titanium-700 text-white'
              }`}>
                {currentUser.tier} TIER
              </span>
            </div>
          </div>

          {/* Member Profile Row */}
          <div className="flex items-center gap-3.5 my-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-md"
            />
            <div className="flex-1 min-w-0">
              <div className="text-base font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-xs text-titanium-300 font-mono">{currentUser.memberId}</div>
              <div className="text-[11px] text-titanium-400 capitalize mt-0.5">
                Goal: {currentUser.goal.replace('_', ' ')}
              </div>
            </div>
            {/* Status Beacon */}
            <div className="text-right">
              {currentUser.isCheckedIn ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neon-lime bg-neon-lime/10 px-2 py-1 rounded-full border border-neon-lime/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-ping" />
                  INSIDE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-titanium-400 bg-titanium-800 px-2 py-1 rounded-full">
                  OUTSIDE
                </span>
              )}
            </div>
          </div>

          {/* Animated QR Code Display */}
          <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center my-3 relative overflow-hidden shadow-inner">
            <QrCode className="w-32 h-32 text-titanium-950" />
            <div className="w-full text-center mt-1">
              <span className="font-mono text-[10px] text-titanium-700 font-bold tracking-widest">
                SCAN AT TURNSTILE GATE 01-A
              </span>
            </div>
            {/* Pulsing Scan Beam */}
            <div className="absolute inset-x-0 h-1 bg-neon-cyan shadow-glow-cyan animate-pulse top-1/2 -translate-y-1/2 opacity-75" />
          </div>

          {/* Card Bottom Meta */}
          <div className="flex items-center justify-between pt-2 text-[11px] text-titanium-300">
            <div>
              <span className="text-titanium-500 block text-[9px] uppercase">Access Window</span>
              <span className="font-semibold">
                {currentUser.tier === 'base' ? 'Off-Peak (9:00 AM - 4:00 PM)' : '24/7 All-Hours'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-titanium-500 block text-[9px] uppercase">Valid Thru</span>
              <span className={`font-mono ${isExpired ? 'text-neon-crimson font-bold' : 'text-white'}`}>
                {currentUser.expiryDate} {isExpired && '(EXPIRED)'}
              </span>
            </div>
          </div>
        </div>

        {/* Turnstile Time Simulation Selector */}
        <div className="mt-4 p-3 rounded-xl bg-titanium-900 border border-titanium-800 text-xs">
          <div className="flex items-center justify-between text-titanium-300 mb-2 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neon-cyan" />
              <span>Simulated Clock for Testing:</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => setSimulatedTimeMode('current')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                simulatedTimeMode === 'current'
                  ? 'bg-titanium-700 text-white border border-neon-cyan'
                  : 'bg-titanium-800/80 text-titanium-400 hover:text-white'
              }`}
            >
              Current Real Time
            </button>
            <button
              type="button"
              onClick={() => setSimulatedTimeMode('offpeak')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                simulatedTimeMode === 'offpeak'
                  ? 'bg-neon-lime text-titanium-950 font-bold'
                  : 'bg-titanium-800/80 text-titanium-400 hover:text-white'
              }`}
              title="Test Off-Peak (11:00 AM) - Base tier will pass"
            >
              11 AM (Off-Peak)
            </button>
            <button
              type="button"
              onClick={() => setSimulatedTimeMode('peak')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                simulatedTimeMode === 'peak'
                  ? 'bg-neon-amber text-titanium-950 font-bold'
                  : 'bg-titanium-800/80 text-titanium-400 hover:text-white'
              }`}
              title="Test Peak Hour (6:00 PM) - Base tier will fail"
            >
              6 PM (Peak Rush)
            </button>
          </div>
          <p className="text-[10px] text-titanium-500 mt-2">
            Tip: Switch to <strong>Customer (Base Tier)</strong> and select <strong>6 PM (Peak)</strong> to test the off-peak restriction!
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mt-3 p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
            feedback.success
              ? 'bg-neon-lime/10 border-neon-lime/40 text-neon-lime'
              : 'bg-neon-crimson/10 border-neon-crimson/40 text-red-300'
          }`}>
            {feedback.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-neon-lime mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-neon-crimson mt-0.5" />
            )}
            <div className="flex-1">
              <span className="font-bold block">{feedback.success ? 'Turnstile Unlocked' : 'Access Restricted'}</span>
              <p className="mt-0.5 text-[11px] leading-relaxed">{feedback.message}</p>
              {!feedback.success && onUpgradeTier && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onUpgradeTier();
                  }}
                  className="mt-2 text-[11px] font-bold text-neon-cyan hover:underline flex items-center gap-1"
                >
                  <span>Upgrade to Pro Tier for 24/7 Access</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tap to Scan / Check In / Out Button */}
        <div className="mt-5">
          <button
            onClick={handleScan}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
              currentUser.isCheckedIn
                ? 'bg-titanium-800 hover:bg-titanium-700 text-titanium-200 border border-titanium-600'
                : 'bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 shadow-glow-cyan hover:brightness-110'
            }`}
          >
            {currentUser.isCheckedIn ? (
              <>
                <LogOut className="w-4 h-4" />
                <span>Tap Turnstile to Check Out</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Tap Turnstile to Check In ({simulatedTimeMode === 'peak' ? '6 PM' : simulatedTimeMode === 'offpeak' ? '11 AM' : 'Now'})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
