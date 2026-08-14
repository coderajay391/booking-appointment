import React from 'react';
import { motion } from 'motion/react';
import { Check, Calendar as CalendarIcon, Clock, RotateCcw } from 'lucide-react';
import { BookingState } from '../types';
import { format } from 'date-fns';

interface SuccessStepProps {
  state: BookingState;
  onReset: () => void;
}

export function SuccessStep({ state, onReset }: SuccessStepProps) {
  const { selectedService, selectedDate, selectedTime, userDetails } = state;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center py-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, delay: 0.1 }}
        className="mb-8 text-white bg-emerald-600 w-24 h-24 rounded-3xl flex items-center justify-center border-t border-emerald-400 border-b-[6px] border-b-emerald-900 shadow-xl"
      >
        <Check size={56} strokeWidth={4} />
      </motion.div>
      
      <h2 className="text-4xl font-black tracking-tight text-white mb-4">Booking Confirmed!</h2>
      <p className="text-zinc-400 font-semibold mb-10 max-w-md mx-auto leading-relaxed">
        Thank you, <span className="text-white">{userDetails.firstName}</span>. Your appointment for <span className="text-white">{selectedService?.title}</span> has been successfully scheduled.
      </p>

      <div className="input-3d p-8 w-full max-w-sm mb-12 text-left relative overflow-hidden">
        <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-6">Appointment Details</h3>
        
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="bg-indigo-900/50 border border-indigo-500/30 border-b-4 border-b-indigo-900 p-3 rounded-xl text-indigo-400 mr-5">
              <CalendarIcon size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-wide">Date</p>
              <p className="font-black text-white text-lg">
                {selectedDate ? format(selectedDate, 'MMM do, yyyy') : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-indigo-900/50 border border-indigo-500/30 border-b-4 border-b-indigo-900 p-3 rounded-xl text-indigo-400 mr-5">
              <Clock size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-zinc-500 uppercase tracking-wide">Time</p>
              <p className="font-black text-white text-lg">
                {selectedTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="btn-3d-secondary px-8 py-4 font-bold text-zinc-300 flex items-center gap-3 text-lg"
      >
        <RotateCcw size={20} className="stroke-[2.5]" />
        Book another appointment
      </button>
    </motion.div>
  );
}
