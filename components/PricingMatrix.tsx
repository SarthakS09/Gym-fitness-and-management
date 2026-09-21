'use client';

import React, { useState } from 'react';
import { MembershipTier } from '@/lib/types';
import { Check, X, Sparkles, Shield, Flame, Zap, ArrowRight } from 'lucide-react';

interface PricingMatrixProps {
  onSelectTier: (tier: MembershipTier) => void;
}

export const PricingMatrix: React.FC<PricingMatrixProps> = ({ onSelectTier }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const discountMultiplier = billingCycle === 'annual' ? 0.8 : 1.0;

  const prices = {
    base: Math.round(1499 * discountMultiplier),
    pro: Math.round(2999 * discountMultiplier),
    elite: Math.round(5999 * discountMultiplier)
  };

  const featureComparison = [
    { name: 'Access Hours Window', base: 'Off-Peak (9 AM - 4 PM)', pro: '24/7 Unlimited Access', elite: '24/7 VIP Priority Access' },
    { name: 'Monthly 1-on-1 PT Sessions', base: 'None', pro: '2 Sessions / Month', elite: '8 Sessions (Dedicated Coach)' },
    { name: 'Guest Passes', base: 'None', pro: '2 Passes / Month', elite: 'Unlimited VIP Guest Access' },
    { name: 'Turnstile Digital QR Pass', base: true, pro: true, elite: true },
    { name: 'Goal-Driven Workout Protocol', base: true, pro: true, elite: true },
    { name: 'Group Fitness & HIIT Classes', base: 'Waitlist only', pro: '48h Priority Booking', elite: 'Instant Reserved Access' },
    { name: 'Executive Locker & Towel Service', base: 'Standard Lockers', pro: 'Digital Executive Lockers', elite: 'Permanent Private Locker' },
    { name: 'Sauna & Hydrotherapy Lounge', base: false, pro: true, elite: true },
    { name: 'Cryotherapy & Cold Plunge Spa', base: false, baseSub: 'Not included', pro: false, proSub: 'Pay-per-use', elite: true },
    { name: 'Custom Nutrition & Macro Blueprint', base: false, pro: 'Standard Blueprint', elite: '1-on-1 Bi-weekly Protocol' },
    { name: 'Free Post-Workout Protein Shake', base: false, pro: false, elite: 'Daily Free Shake at Bar' },
    { name: 'InBody Body Composition Scans', base: '1 scan on sign-up', pro: 'Monthly Scan', elite: 'Weekly Comprehensive Scan' }
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-titanium-900 border border-titanium-700 text-xs text-neon-cyan font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tiered Membership Automation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            SELECT YOUR <span className="text-neon-cyan glow-text-cyan">TITANIUM TIER</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-titanium-300">
            Engineered access levels enforced automatically at the turnstile. Upgrade or adjust anytime.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-titanium-900 border border-titanium-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-titanium-800 text-white shadow-sm'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-neon-cyan text-titanium-950 font-bold shadow-glow-cyan'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-neon-lime text-titanium-950 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {/* BASE TIER */}
          <div className="glass-panel rounded-2xl p-7 border border-titanium-800 flex flex-col justify-between hover:border-titanium-700 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-titanium-400 px-2.5 py-1 rounded bg-titanium-900 border border-titanium-800">
                  Tier 01
                </span>
                <span className="text-xs text-titanium-400 font-medium">Off-Peak Access</span>
              </div>
              <h3 className="text-2xl font-black text-white">BASE</h3>
              <p className="text-xs text-titanium-400 mt-1 mb-6">
                Essential strength training for disciplined athletes who workout during daylight hours.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">₹{prices.base.toLocaleString()}</span>
                  <span className="text-xs text-titanium-400">/ month</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-neon-lime font-mono">Billed annually (₹{(prices.base * 12).toLocaleString()}/yr)</span>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-titanium-800 text-xs">
                <div className="flex items-center gap-2.5 text-titanium-300">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span><strong>Off-Peak Access:</strong> 9:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-300">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>Full Gym Floor & Olympic Barbells</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-300">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>Digital QR Turnstile Pass</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-300">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>Personalized Goal Workout Protocol</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-500">
                  <X className="w-4 h-4 text-titanium-600 shrink-0" />
                  <span className="line-through">No 24/7 Peak Hours Access</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-500">
                  <X className="w-4 h-4 text-titanium-600 shrink-0" />
                  <span className="line-through">No Personal Training Sessions</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTier('base')}
              className="mt-8 w-full py-3 rounded-xl bg-titanium-800 hover:bg-titanium-700 text-white font-semibold text-xs border border-titanium-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Join Base Tier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PRO TIER (Featured) */}
          <div className="glass-panel rounded-2xl p-7 border-2 border-neon-cyan relative flex flex-col justify-between shadow-glow-cyan">
            {/* Featured Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-blue-500 text-titanium-950 px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Most Popular Choice</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan px-2.5 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/30">
                  Tier 02
                </span>
                <span className="text-xs text-neon-lime font-medium">24/7 Unlimited Access</span>
              </div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <span>PRO</span>
                <span className="text-xs font-normal text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">All-Access</span>
              </h3>
              <p className="text-xs text-titanium-300 mt-1 mb-6">
                Complete unhindered 24/7 access with coach guidance, monthly PT sessions, and full recovery access.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">₹{prices.pro.toLocaleString()}</span>
                  <span className="text-xs text-titanium-400">/ month</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-neon-lime font-mono">Billed annually (₹{(prices.pro * 12).toLocaleString()}/yr)</span>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-titanium-800 text-xs">
                <div className="flex items-center gap-2.5 text-white font-medium">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span><strong>Full 24/7 Unrestricted Access</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span><strong>2 Personal Training Sessions</strong> per month</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span><strong>2 Guest Passes</strong> included each month</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>Sauna & Hydrotherapy Lounges</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>48-Hour Priority Class Booking</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                  <span>Custom Nutrition & Macro Blueprint</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTier('pro')}
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 text-titanium-950 font-bold text-xs shadow-glow-cyan hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>Join Pro Tier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* ELITE TIER (VIP) */}
          <div className="glass-panel rounded-2xl p-7 border border-neon-amber/40 relative flex flex-col justify-between shadow-glow-amber">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-amber px-2.5 py-1 rounded bg-neon-amber/10 border border-neon-amber/30">
                  Tier 03 • VIP
                </span>
                <span className="text-xs text-neon-amber font-medium">VIP Titanium Club</span>
              </div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                <span>ELITE</span>
                <Sparkles className="w-4 h-4 text-neon-amber" />
              </h3>
              <p className="text-xs text-titanium-300 mt-1 mb-6">
                The ultimate executive athletic package with dedicated coach, private spa, and unrestricted privileges.
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white font-mono">₹{prices.elite.toLocaleString()}</span>
                  <span className="text-xs text-titanium-400">/ month</span>
                </div>
                {billingCycle === 'annual' && (
                  <span className="text-[11px] text-neon-lime font-mono">Billed annually (₹{(prices.elite * 12).toLocaleString()}/yr)</span>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-titanium-800 text-xs">
                <div className="flex items-center gap-2.5 text-white font-medium">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span><strong>24/7 VIP Unrestricted Access</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span><strong>8 Dedicated 1-on-1 PT Sessions</strong> / mo</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span><strong>Unlimited Guest Passes</strong></span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span>Cryotherapy & Infrared Sauna Suite</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span>Assigned Private Executive Locker</span>
                </div>
                <div className="flex items-center gap-2.5 text-titanium-200">
                  <Check className="w-4 h-4 text-neon-amber shrink-0" />
                  <span>Daily Free Protein Shake at Shaker Bar</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTier('elite')}
              className="mt-8 w-full py-3 rounded-xl bg-neon-amber hover:bg-amber-400 text-titanium-950 font-bold text-xs shadow-glow-amber transition-all flex items-center justify-center gap-2"
            >
              <span>Join Elite Tier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-titanium-800">
          <div className="p-5 border-b border-titanium-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Comprehensive Tier Entitlement Matrix
            </h3>
            <span className="text-xs text-titanium-400 font-mono">12 Operational Rules</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-titanium-800 bg-titanium-900/60">
                  <th className="p-4 font-semibold text-titanium-300">Feature / Entitlement</th>
                  <th className="p-4 font-semibold text-titanium-300 text-center w-48">Base Tier</th>
                  <th className="p-4 font-semibold text-neon-cyan text-center w-48">Pro Tier (Most Popular)</th>
                  <th className="p-4 font-semibold text-neon-amber text-center w-48">Elite VIP Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-titanium-800/60">
                {featureComparison.map((f, idx) => (
                  <tr key={idx} className="hover:bg-titanium-900/40 transition-colors">
                    <td className="p-4 font-medium text-titanium-200">{f.name}</td>
                    
                    {/* Base column */}
                    <td className="p-4 text-center">
                      {typeof f.base === 'boolean' ? (
                        f.base ? (
                          <Check className="w-4 h-4 text-neon-cyan mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-titanium-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-titanium-400">{f.base}</span>
                      )}
                    </td>

                    {/* Pro column */}
                    <td className="p-4 text-center bg-neon-cyan/5">
                      {typeof f.pro === 'boolean' ? (
                        f.pro ? (
                          <Check className="w-4 h-4 text-neon-cyan mx-auto" />
                        ) : (
                          <span className="text-titanium-500 text-[11px]">{f.proSub || 'No'}</span>
                        )
                      ) : (
                        <span className="text-neon-cyan font-medium">{f.pro}</span>
                      )}
                    </td>

                    {/* Elite column */}
                    <td className="p-4 text-center">
                      {typeof f.elite === 'boolean' ? (
                        f.elite ? (
                          <Check className="w-4 h-4 text-neon-amber mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-titanium-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-neon-amber font-semibold">{f.elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
