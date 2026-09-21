'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { MembershipTier, GymClass } from '@/lib/types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Users, 
  IndianRupee, 
  Activity, 
  ShieldCheck, 
  Search, 
  Filter, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Calendar,
  Sparkles,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const AdminDashboard: React.FC<{ onOpenCreateClass?: () => void }> = ({ onOpenCreateClass }) => {
  const { 
    users, 
    classes, 
    attendance, 
    liveGymOccupancy, 
    maxGymCapacity, 
    updateUserTier, 
    extendMembership, 
    deleteUser,
    createClass 
  } = useGym();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'analytics' | 'members' | 'classes' | 'turnstile'>('analytics');

  // Modal for new class creation
  const [showClassModal, setShowClassModal] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [newClassCategory, setNewClassCategory] = useState<'HIIT' | 'Strength' | 'Recovery' | 'Yoga' | 'CrossFit' | 'Cardio'>('HIIT');
  const [newClassDesc, setNewClassDesc] = useState('');
  const [newClassTime, setNewClassTime] = useState('08:00 AM');
  const [newClassDays, setNewClassDays] = useState(['Mon', 'Wed', 'Fri']);
  const [newClassCapacity, setNewClassCapacity] = useState(15);
  const [newClassRoom, setNewClassRoom] = useState('Studio Alpha');

  // Computed metrics
  const memberUsers = users.filter((u) => u.role === 'member');
  const activeMembers = memberUsers.filter((u) => new Date(u.expiryDate) >= new Date());
  const expiredMembers = memberUsers.filter((u) => new Date(u.expiryDate) < new Date());

  // Revenue estimation
  // Base: ₹1499, Pro: ₹2999, Elite: ₹5999
  const baseCount = activeMembers.filter((u) => u.tier === 'base').length;
  const proCount = activeMembers.filter((u) => u.tier === 'pro').length;
  const eliteCount = activeMembers.filter((u) => u.tier === 'elite').length;

  const baseRevenue = baseCount * 1499;
  const proRevenue = proCount * 2999;
  const eliteRevenue = eliteCount * 5999;
  const totalMonthlyRevenue = baseRevenue + proRevenue + eliteRevenue;

  // Chart Data: Revenue Breakdown
  const revenueChartData = [
    { name: 'Base Tier (₹1.5k)', revenue: baseRevenue, members: baseCount, fill: '#64748B' },
    { name: 'Pro Tier (₹3k)', revenue: proRevenue, members: proCount, fill: '#06B6D4' },
    { name: 'Elite VIP (₹6k)', revenue: eliteRevenue, members: eliteCount, fill: '#F59E0B' }
  ];

  // Chart Data: Membership Distribution
  const statusPieData = [
    { name: 'Active Pro & Elite', value: proCount + eliteCount, color: '#10B981' },
    { name: 'Active Base', value: baseCount, color: '#06B6D4' },
    { name: 'Expired / Renewal Due', value: expiredMembers.length + 2, color: '#EF4444' }
  ];

  // Chart Data: 7-Day Attendance and Peak Occupancy
  const attendanceTrendsData = [
    { day: 'Mon', checkIns: 78, peakHourOccupancy: 84 },
    { day: 'Tue', checkIns: 92, peakHourOccupancy: 95 },
    { day: 'Wed', checkIns: 88, peakHourOccupancy: 89 },
    { day: 'Thu', checkIns: 96, peakHourOccupancy: 102 },
    { day: 'Fri', checkIns: 84, peakHourOccupancy: 79 },
    { day: 'Sat', checkIns: 110, peakHourOccupancy: 112 },
    { day: 'Sun', checkIns: 65, peakHourOccupancy: 58 }
  ];

  // Member Filter Logic
  const filteredMembers = memberUsers.filter((m) => {
    const isExpired = new Date(m.expiryDate) < new Date();
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'All' || m.tier === tierFilter;
    const matchesStatus = 
      statusFilter === 'All' || 
      (statusFilter === 'Active' && !isExpired) || 
      (statusFilter === 'Expired' && isExpired);

    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleCreateClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassTitle) return;
    createClass({
      title: newClassTitle,
      category: newClassCategory,
      description: newClassDesc || 'High-energy studio session.',
      trainerId: 'user-trainer-1',
      trainerName: 'Head Trainer',
      time: newClassTime,
      days: newClassDays,
      durationMinutes: 50,
      room: newClassRoom,
      capacity: Number(newClassCapacity) || 15
    });
    setShowClassModal(false);
    setNewClassTitle('');
  };

  return (
    <div className="space-y-8">
      {/* Admin Executive Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-titanium-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-amber/10 blur-3xl pointer-events-none rounded-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-amber/10 border border-neon-amber/30 text-neon-amber text-xs font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EXECUTIVE OPERATIONAL DASHBOARD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Studio Command & Analytics
            </h2>
            <p className="text-xs sm:text-sm text-titanium-400 mt-1">
              Live turnstile telemetry, tier revenue automation, and member lifecycle controls.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-titanium-900 border border-titanium-800 rounded-xl">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-neon-amber text-titanium-950 font-bold shadow-glow-amber'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'members'
                  ? 'bg-neon-amber text-titanium-950 font-bold shadow-glow-amber'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Members Directory ({memberUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'classes'
                  ? 'bg-neon-amber text-titanium-950 font-bold shadow-glow-amber'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Classes ({classes.length})
            </button>
            <button
              onClick={() => setActiveTab('turnstile')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'turnstile'
                  ? 'bg-neon-amber text-titanium-950 font-bold shadow-glow-amber'
                  : 'text-titanium-400 hover:text-white'
              }`}
            >
              Live Turnstile Stream
            </button>
          </div>
        </div>

        {/* 4 Key Executive KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Monthly Gross Revenue */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Monthly Run-Rate</span>
              <IndianRupee className="w-4 h-4 text-neon-lime" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ₹{totalMonthlyRevenue.toLocaleString()}
            </div>
            <span className="text-[10px] text-neon-lime mt-1 block">Tiered Automated Billing</span>
          </div>

          {/* Active Members */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Active Subscriptions</span>
              <UserCheck className="w-4 h-4 text-neon-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {activeMembers.length}
            </div>
            <span className="text-[10px] text-neon-cyan mt-1 block">
              {baseCount} Base • {proCount} Pro • {eliteCount} Elite
            </span>
          </div>

          {/* Expired / Overdue */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Expired / Renewal Due</span>
              <AlertTriangle className="w-4 h-4 text-neon-crimson" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-neon-crimson font-mono">
              {expiredMembers.length}
            </div>
            <span className="text-[10px] text-red-400 mt-1 block">Access Blocked at Turnstile</span>
          </div>

          {/* Live Studio Occupancy Meter */}
          <div className="bg-titanium-900/80 rounded-2xl p-4 border border-titanium-800">
            <div className="flex items-center justify-between text-titanium-400 text-xs mb-1">
              <span>Live Studio Floor</span>
              <Activity className="w-4 h-4 text-neon-lime animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-white font-mono">{liveGymOccupancy}</span>
              <span className="text-xs text-titanium-500 font-mono">/ {maxGymCapacity} max</span>
            </div>
            <div className="w-full bg-titanium-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-neon-lime h-full rounded-full"
                style={{ width: `${(liveGymOccupancy / maxGymCapacity) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: Visual Analytics Charts */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recharts Bar Chart: Tier Revenue Breakdown */}
            <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Tier-Wise Revenue Generation (Monthly)
                  </h3>
                  <p className="text-xs text-titanium-400">Comparing Base, Pro & Elite contributions</p>
                </div>
                <span className="text-xs font-mono text-neon-cyan font-bold">
                  ₹{totalMonthlyRevenue.toLocaleString()}
                </span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueChartData}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                      formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Monthly Revenue']}
                    />
                    <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                      {revenueChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recharts Pie Chart: Member Status Distribution */}
            <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Membership Retention & Status Breakdown
                  </h3>
                  <p className="text-xs text-titanium-400">Active vs Expired compliance</p>
                </div>
              </div>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-xs mt-2">
                {statusPieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-titanium-400">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recharts Area Chart: 7-Day Attendance and Peak Occupancy */}
          <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Weekly Attendance Trends & Peak Turnstile Rush
                </h3>
                <p className="text-xs text-titanium-400">Daily total check-ins vs peak concurrent load</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-neon-cyan">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  <span>Total Check-Ins</span>
                </div>
                <div className="flex items-center gap-1 text-neon-lime">
                  <span className="w-2 h-2 rounded-full bg-neon-lime" />
                  <span>Peak Occupancy</span>
                </div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceTrendsData}>
                  <defs>
                    <linearGradient id="colorCheckIns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPeak" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="checkIns" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCheckIns)" />
                  <Area type="monotone" dataKey="peakHourOccupancy" stroke="#10B981" fillOpacity={1} fill="url(#colorPeak)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Members Management Console */}
      {activeTab === 'members' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Member Directory & Tier Enforcement
              </h3>
              <p className="text-xs text-titanium-400">Search, upgrade tiers, extend validity, or manage credentials</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-titanium-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, ID or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-titanium-900 border border-titanium-700 rounded-lg pl-8 pr-3 py-1.5 text-white placeholder-titanium-500 focus:outline-none focus:border-neon-amber"
                />
              </div>

              {/* Tier Filter */}
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="bg-titanium-900 border border-titanium-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
              >
                <option value="All">All Tiers</option>
                <option value="base">Base</option>
                <option value="pro">Pro</option>
                <option value="elite">Elite</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-titanium-900 border border-titanium-700 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
              >
                <option value="All">All Status</option>
                <option value="Active">Active Only</option>
                <option value="Expired">Expired Only</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-titanium-800 bg-titanium-900/60 text-titanium-400">
                  <th className="p-3">Athlete</th>
                  <th className="p-3">Member ID</th>
                  <th className="p-3">Tier Level</th>
                  <th className="p-3">Primary Goal</th>
                  <th className="p-3">Entitlements</th>
                  <th className="p-3">Expiry Date</th>
                  <th className="p-3 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-titanium-800/60">
                {filteredMembers.map((m) => {
                  const isExpired = new Date(m.expiryDate) < new Date();
                  return (
                    <tr key={m.id} className="hover:bg-titanium-900/40 transition-colors">
                      {/* Name & Avatar */}
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-8 h-8 rounded-lg object-cover border border-titanium-700"
                          />
                          <div>
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-[11px] text-titanium-400">{m.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="p-3 font-mono font-bold text-neon-cyan">{m.memberId}</td>

                      {/* Tier dropdown */}
                      <td className="p-3">
                        <select
                          value={m.tier}
                          onChange={(e) => updateUserTier(m.id, e.target.value as MembershipTier)}
                          className={`font-mono text-[11px] font-bold uppercase rounded px-2 py-1 border transition-colors ${
                            m.tier === 'elite'
                              ? 'bg-neon-amber/20 border-neon-amber/50 text-neon-amber'
                              : m.tier === 'pro'
                              ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan'
                              : 'bg-titanium-800 border-titanium-700 text-titanium-300'
                          }`}
                        >
                          <option value="base" className="bg-titanium-900 text-white">Base Tier</option>
                          <option value="pro" className="bg-titanium-900 text-white">Pro Tier</option>
                          <option value="elite" className="bg-titanium-900 text-white">Elite VIP</option>
                        </select>
                      </td>

                      {/* Goal */}
                      <td className="p-3 capitalize text-titanium-300">
                        {m.goal.replace('_', ' ')}
                      </td>

                      {/* Entitlements */}
                      <td className="p-3 text-[11px] text-titanium-400">
                        <div>PT: <strong className="text-white">{m.ptSessionsRemaining}</strong>/{m.ptSessionsTotal}</div>
                        <div>Guests: <strong className="text-white">{m.guestPassesRemaining}</strong></div>
                      </td>

                      {/* Expiry */}
                      <td className="p-3 font-mono">
                        <span className={isExpired ? 'text-neon-crimson font-bold' : 'text-white'}>
                          {m.expiryDate}
                        </span>
                        {isExpired && (
                          <span className="block text-[10px] text-red-400 font-sans font-bold">
                            EXPIRED
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => extendMembership(m.id, 30)}
                            className="px-2.5 py-1 rounded bg-titanium-800 hover:bg-titanium-700 text-neon-lime border border-neon-lime/30 text-[11px] font-semibold"
                            title="Add +30 Days validity"
                          >
                            +30 Days
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Class Schedule & Trainer Slot Conflict Manager */}
      {activeTab === 'classes' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-titanium-800">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Studio Class Master Schedule & Capacity
              </h3>
              <p className="text-xs text-titanium-400">Manage studio capacities, trainer slots and bookings</p>
            </div>
            <button
              onClick={() => setShowClassModal(true)}
              className="px-4 py-2 rounded-xl bg-neon-amber text-titanium-950 font-bold text-xs shadow-glow-amber flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Class</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((c) => (
              <div key={c.id} className="bg-titanium-900/80 rounded-2xl p-5 border border-titanium-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-neon-cyan px-2 py-0.5 rounded bg-neon-cyan/10">
                    {c.category}
                  </span>
                  <span className="text-xs text-titanium-400 font-mono">
                    {c.enrolledUserIds.length}/{c.capacity} Booked
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{c.title}</h4>
                <p className="text-xs text-titanium-400 line-clamp-2">{c.description}</p>
                <div className="pt-2 border-t border-titanium-800 text-xs text-titanium-300 space-y-1">
                  <div>Coach: <strong className="text-white">{c.trainerName}</strong></div>
                  <div>Time: <strong className="text-white">{c.time}</strong> ({c.durationMinutes}m)</div>
                  <div>Days: <span className="font-mono text-neon-lime">{c.days.join(', ')}</span></div>
                  <div>Location: <span>{c.room}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Live Turnstile Stream */}
      {activeTab === 'turnstile' && (
        <div className="glass-panel rounded-3xl p-6 border border-titanium-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Real-Time Turnstile Check-In Audit Trail
              </h3>
              <p className="text-xs text-titanium-400">Automatic validation of tier windows, expired passes, and peak hours</p>
            </div>
            <span className="text-xs text-neon-lime font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-lime animate-ping" />
              Active Turnstiles Gate 01 & Gate 02
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-titanium-800 bg-titanium-900/60 text-titanium-400">
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Athlete</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Turnstile Status</th>
                  <th className="p-3">Diagnostic Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-titanium-800/60">
                {attendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-titanium-900/40">
                    <td className="p-3 font-mono text-titanium-300">{rec.timestamp}</td>
                    <td className="p-3 font-bold text-white">{rec.userName}</td>
                    <td className="p-3 font-mono uppercase text-neon-cyan">{rec.tier}</td>
                    <td className="p-3 uppercase font-semibold text-titanium-300">
                      {rec.type.replace('_', ' ')}
                    </td>
                    <td className="p-3">
                      {rec.status === 'granted' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neon-lime bg-neon-lime/10 px-2 py-0.5 rounded">
                          <CheckCircle className="w-3 h-3" />
                          ACCESS GRANTED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neon-crimson bg-neon-crimson/10 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" />
                          ACCESS DENIED
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-titanium-400 text-[11px]">
                      {rec.reason || 'Tier Access Window Validated (Turnstile Unlocked)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg rounded-3xl border border-titanium-700 p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">Schedule New Studio Masterclass</h3>
            <form onSubmit={handleCreateClassSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-titanium-300 font-semibold mb-1">Class Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Iron Pit Heavy Deadlifts"
                  value={newClassTitle}
                  onChange={(e) => setNewClassTitle(e.target.value)}
                  className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-neon-amber"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-titanium-300 font-semibold mb-1">Category</label>
                  <select
                    value={newClassCategory}
                    onChange={(e: any) => setNewClassCategory(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="HIIT">HIIT</option>
                    <option value="Strength">Strength</option>
                    <option value="Yoga">Yoga</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Cardio">Cardio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-titanium-300 font-semibold mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newClassTime}
                    onChange={(e) => setNewClassTime(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-titanium-300 font-semibold mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newClassCapacity}
                    onChange={(e) => setNewClassCapacity(Number(e.target.value))}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-titanium-300 font-semibold mb-1">Studio Room</label>
                  <input
                    type="text"
                    value={newClassRoom}
                    onChange={(e) => setNewClassRoom(e.target.value)}
                    className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-titanium-300 font-semibold mb-1">Short Description</label>
                <textarea
                  value={newClassDesc}
                  onChange={(e) => setNewClassDesc(e.target.value)}
                  placeholder="Focus of the session..."
                  rows={2}
                  className="w-full bg-titanium-900 border border-titanium-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="px-4 py-2 rounded-xl bg-titanium-800 text-titanium-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-neon-amber text-titanium-950 font-bold shadow-glow-amber"
                >
                  Schedule Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
