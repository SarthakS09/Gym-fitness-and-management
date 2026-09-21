'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/store';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Check, 
  Dumbbell, 
  Flame, 
  AlertCircle,
  Plus
} from 'lucide-react';

interface ClassScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCreateClass?: () => void;
}

export const ClassScheduleModal: React.FC<ClassScheduleModalProps> = ({
  isOpen,
  onClose,
  onOpenCreateClass
}) => {
  const { classes, currentUser, bookClass, cancelClassBooking } = useGym();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [dayFilter, setDayFilter] = useState<string>('All');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const filteredClasses = classes.filter((c) => {
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesDay = dayFilter === 'All' || c.days.includes(dayFilter);
    return matchesCategory && matchesDay;
  });

  const handleBooking = (classId: string) => {
    const isBooked = classes.find((c) => c.id === classId)?.enrolledUserIds.includes(currentUser.id);
    if (isBooked) {
      const res = cancelClassBooking(classId);
      setFeedback(res);
    } else {
      const res = bookClass(classId);
      setFeedback(res);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-titanium-700 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-titanium-400 hover:text-white p-2 rounded-full hover:bg-titanium-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-4 border-b border-titanium-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-neon-cyan font-mono text-xs uppercase font-bold tracking-widest">
                  TITANIUM MASTERCLASSES
                </span>
                <span className="text-titanium-500">•</span>
                <span className="text-titanium-400 text-xs">Slot-Conflict Protected</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Studio Sessions & Class Schedule
              </h2>
            </div>
            {currentUser.role === 'admin' && onOpenCreateClass && (
              <button
                onClick={onOpenCreateClass}
                className="px-3 py-1.5 rounded-lg bg-neon-cyan text-titanium-950 font-bold text-xs flex items-center gap-1.5 mr-8 shadow-glow-cyan"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule New Class</span>
              </button>
            )}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`mt-3 p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.success
                ? 'bg-neon-lime/10 border-neon-lime/40 text-neon-lime'
                : 'bg-neon-crimson/10 border-neon-crimson/40 text-red-300'
            }`}>
              {feedback.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Filters Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-1">
              {['All', 'HIIT', 'Strength', 'Yoga', 'CrossFit', 'Cardio'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                    categoryFilter === cat
                      ? 'bg-titanium-700 text-white border border-neon-cyan'
                      : 'bg-titanium-900 text-titanium-400 hover:text-white border border-titanium-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Day Filter */}
            <div className="flex items-center gap-1">
              <span className="text-titanium-500 text-[11px] mr-1">Day:</span>
              {['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDayFilter(d)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-all font-mono ${
                    dayFilter === d
                      ? 'bg-neon-cyan text-titanium-950 font-bold'
                      : 'bg-titanium-900 text-titanium-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Classes List (Scrollable) */}
        <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
          {filteredClasses.length === 0 ? (
            <div className="text-center py-12 text-titanium-400 text-xs">
              No classes scheduled for the selected filter combination.
            </div>
          ) : (
            filteredClasses.map((item) => {
              const isBooked = item.enrolledUserIds.includes(currentUser.id);
              const isFull = item.enrolledUserIds.length >= item.capacity;
              const percentBooked = Math.round((item.enrolledUserIds.length / item.capacity) * 100);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isBooked
                      ? 'bg-neon-cyan/5 border-neon-cyan/50 shadow-glow-cyan'
                      : 'bg-titanium-900/60 border-titanium-800 hover:border-titanium-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{item.title}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-titanium-800 text-neon-cyan font-semibold">
                          {item.category}
                        </span>
                        {isBooked && (
                          <span className="text-[10px] bg-neon-lime text-titanium-950 px-2 py-0.5 rounded font-bold">
                            RESERVED SPOT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-titanium-400 line-clamp-1">{item.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-titanium-300">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neon-cyan" />
                          <strong className="text-white">{item.time}</strong> ({item.durationMinutes}m)
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neon-amber" />
                          <span>{item.room}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          <span>Coach: <strong>{item.trainerName}</strong></span>
                        </span>
                      </div>
                    </div>

                    {/* Capacity and Booking CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono">
                          <span className={isFull ? 'text-neon-crimson font-bold' : 'text-neon-lime font-bold'}>
                            {item.enrolledUserIds.length}
                          </span>
                          <span className="text-titanium-500"> / {item.capacity} spots</span>
                        </div>
                        <div className="w-24 bg-titanium-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${isFull ? 'bg-neon-crimson' : 'bg-neon-lime'}`}
                            style={{ width: `${percentBooked}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleBooking(item.id)}
                        disabled={!isBooked && isFull}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isBooked
                            ? 'bg-titanium-800 text-neon-crimson border border-neon-crimson/30 hover:bg-neon-crimson hover:text-white'
                            : isFull
                            ? 'bg-titanium-800 text-titanium-600 cursor-not-allowed border border-titanium-800'
                            : 'bg-neon-cyan text-titanium-950 shadow-glow-cyan hover:brightness-110'
                        }`}
                      >
                        {isBooked ? 'Cancel Spot' : isFull ? 'Class Full' : 'Book Spot'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
