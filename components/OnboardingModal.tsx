'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { MembershipTier, FitnessGoal, FitnessLevel } from '@/lib/types';
import { 
  X, 
  Sparkles, 
  Flame, 
  Dumbbell, 
  HeartPulse, 
  Zap, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  ShieldCheck
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTier?: MembershipTier;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  preselectedTier = 'pro',
  onComplete
}) => {
  const { registerNewMember } = useGym();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number>(22);
  const [gender, setGender] = useState('Male');

  const [goal, setGoal] = useState<FitnessGoal>('muscle_building');
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel>('intermediate');
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(72);
  const [targetWeightKg, setTargetWeightKg] = useState<number>(78);

  const [tier, setTier] = useState<MembershipTier>(preselectedTier);
  const [createdMemberId, setCreatedMemberId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
      return;
    }

    if (step === 3) {
      // Finalize creation
      const newMember = registerNewMember({
        name: name || 'New Athlete',
        email: email || `athlete${Date.now()}@titaniumfitness.com`,
        phone: phone || '+91 99887 76655',
        age: Number(age) || 22,
        gender,
        tier,
        goal,
        fitnessLevel,
        currentWeightKg: Number(currentWeightKg) || 70,
        targetWeightKg: Number(targetWeightKg) || 75
      });
      setCreatedMemberId(newMember.memberId);
      setStep(4);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-titanium-700/70 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-neon-cyan/20 blur-3xl pointer-events-none rounded-full" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-titanium-400 hover:text-white p-2 rounded-full hover:bg-titanium-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-titanium-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-neon-cyan font-mono text-xs uppercase font-bold tracking-widest">
                TITANIUM ONBOARDING
              </span>
              <span className="text-titanium-500">•</span>
              <span className="text-titanium-400 text-xs">Step {step} of 4</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {step === 1 && 'Athlete Identity & Contact'}
              {step === 2 && 'Primary Goal & Athletic Metrics'}
              {step === 3 && 'Confirm Tier & Privileges'}
              {step === 4 && 'Digital Gym Pass Activated!'}
            </h2>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-7 h-1.5 rounded-full transition-all ${
                  step >= s ? 'bg-neon-cyan shadow-glow-cyan' : 'bg-titanium-800'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Personal info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe / Athlete Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="athlete@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-neon-cyan text-titanium-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <span>Continue to Fitness Goal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Fitness Goal selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-2">
                  Select Primary Fitness Goal (Drives Your Personalized Protocol)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Muscle Building */}
                  <div
                    onClick={() => setGoal('muscle_building')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      goal === 'muscle_building'
                        ? 'border-neon-cyan bg-neon-cyan/10 shadow-glow-cyan'
                        : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <Flame className="w-4 h-4 text-neon-cyan" />
                      <span className="font-bold text-white text-sm">Muscle Building</span>
                    </div>
                    <p className="text-[11px] text-titanium-400">
                      Hypertrophy PPL split, caloric surplus, progressive overload & high-protein timing.
                    </p>
                  </div>

                  {/* Fat Loss */}
                  <div
                    onClick={() => setGoal('fat_loss')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      goal === 'fat_loss'
                        ? 'border-neon-lime bg-neon-lime/10 shadow-glow-lime'
                        : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <HeartPulse className="w-4 h-4 text-neon-lime" />
                      <span className="font-bold text-white text-sm">Fat Loss / Shred</span>
                    </div>
                    <p className="text-[11px] text-titanium-400">
                      MetCon HIIT circuits, caloric deficit, high fiber & lean mass preservation.
                    </p>
                  </div>

                  {/* Strength */}
                  <div
                    onClick={() => setGoal('strength')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      goal === 'strength'
                        ? 'border-neon-amber bg-neon-amber/10 shadow-glow-amber'
                        : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <Dumbbell className="w-4 h-4 text-neon-amber" />
                      <span className="font-bold text-white text-sm">Pure Strength (5x5)</span>
                    </div>
                    <p className="text-[11px] text-titanium-400">
                      Barbell Big Three focus, CNS recovery, rate of force development & heavy compounds.
                    </p>
                  </div>

                  {/* Endurance */}
                  <div
                    onClick={() => setGoal('endurance')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      goal === 'endurance'
                        ? 'border-purple-400 bg-purple-500/10 shadow-md'
                        : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span className="font-bold text-white text-sm">Aerobic Endurance</span>
                    </div>
                    <p className="text-[11px] text-titanium-400">
                      Zone 2 aerobic base, VO2 max sprints, lactate threshold pacing & glycogen refueling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                  Training Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as FitnessLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFitnessLevel(lvl)}
                      className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        fitnessLevel === lvl
                          ? 'bg-titanium-700 text-white border border-neon-cyan'
                          : 'bg-titanium-900 text-titanium-400 border border-titanium-800 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight targets */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Current Weight (KG)
                  </label>
                  <input
                    type="number"
                    value={currentWeightKg}
                    onChange={(e) => setCurrentWeightKg(Number(e.target.value))}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1.5">
                    Target Goal Weight (KG)
                  </label>
                  <input
                    type="number"
                    value={targetWeightKg}
                    onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-titanium-800 text-titanium-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-neon-cyan text-titanium-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <span>Continue to Tier Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Tier Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-titanium-300 uppercase tracking-wider mb-1">
                Choose Your Titanium Membership Tier
              </label>

              <div className="space-y-3">
                {/* Base */}
                <div
                  onClick={() => setTier('base')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    tier === 'base'
                      ? 'border-titanium-300 bg-titanium-800/80 shadow-md'
                      : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">BASE TIER</span>
                      <span className="text-[10px] bg-titanium-700 text-titanium-300 px-2 py-0.5 rounded font-mono">
                        Off-Peak (9 AM - 4 PM)
                      </span>
                    </div>
                    <p className="text-xs text-titanium-400 mt-0.5">
                      Full floor access during off-peak daylight hours. 0 PT sessions.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-white text-base">₹1,499</span>
                    <span className="text-[11px] text-titanium-500 block">/month</span>
                  </div>
                </div>

                {/* Pro */}
                <div
                  onClick={() => setTier('pro')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between relative ${
                    tier === 'pro'
                      ? 'border-neon-cyan bg-neon-cyan/10 shadow-glow-cyan'
                      : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">PRO TIER</span>
                      <span className="text-[10px] bg-neon-cyan text-titanium-950 font-bold px-2 py-0.5 rounded font-mono">
                        24/7 Unlimited
                      </span>
                    </div>
                    <p className="text-xs text-titanium-300 mt-0.5">
                      24/7 access, 2 monthly PT sessions, 2 guest passes, sauna access.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-neon-cyan text-base">₹2,999</span>
                    <span className="text-[11px] text-titanium-400 block">/month</span>
                  </div>
                </div>

                {/* Elite */}
                <div
                  onClick={() => setTier('elite')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    tier === 'elite'
                      ? 'border-neon-amber bg-neon-amber/10 shadow-glow-amber'
                      : 'border-titanium-800 bg-titanium-900/60 hover:border-titanium-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">ELITE VIP</span>
                      <span className="text-[10px] bg-neon-amber text-titanium-950 font-bold px-2 py-0.5 rounded font-mono">
                        VIP Suite
                      </span>
                    </div>
                    <p className="text-xs text-titanium-300 mt-0.5">
                      8 PT sessions, dedicated trainer, cryotherapy spa & unlimited guests.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-neon-amber text-base">₹5,999</span>
                    <span className="text-[11px] text-titanium-400 block">/month</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl bg-titanium-800 text-titanium-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 font-bold text-xs shadow-glow-cyan flex items-center gap-2 hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate Membership & Issue Pass</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Pass Issued */}
          {step === 4 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-neon-lime/20 border border-neon-lime/40 text-neon-lime flex items-center justify-center mx-auto shadow-glow-lime">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neon-lime font-bold">
                  REGISTRATION COMPLETED
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Welcome to Titanium Fitness, {name}!
                </h3>
                <p className="text-xs text-titanium-300 mt-1 max-w-md mx-auto">
                  Your tiered membership has been activated in the system. Your digital QR access pass is linked and your goal protocol is ready.
                </p>
              </div>

              {/* Generated Member Pass Card */}
              <div className="max-w-xs mx-auto p-5 rounded-2xl bg-gradient-to-b from-titanium-800 to-titanium-950 border border-neon-cyan/40 shadow-glow-cyan">
                <div className="flex items-center justify-between text-xs text-titanium-400 pb-3 border-b border-titanium-700/60">
                  <span className="font-bold text-white">TITANIUM PASS</span>
                  <span className="text-neon-cyan font-mono uppercase font-bold">{tier} MEMBER</span>
                </div>
                <div className="my-4">
                  <span className="text-xs text-titanium-400">ASSIGNED MEMBER ID</span>
                  <div className="text-lg font-mono font-black text-neon-cyan tracking-wider">{createdMemberId}</div>
                </div>
                <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                  <QrCode className="w-24 h-24 text-titanium-950" />
                </div>
                <div className="mt-3 text-[11px] text-titanium-400">
                  Access: {tier === 'base' ? 'Off-Peak 9am - 4pm' : '24/7 Unlimited'}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onComplete();
                  }}
                  className="w-full max-w-sm mx-auto py-3.5 rounded-xl bg-neon-cyan text-titanium-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch My Member Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
