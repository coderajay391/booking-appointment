import React from 'react';
import { motion } from 'motion/react';
import { UserDetails } from '../types';
import { ChevronRight } from 'lucide-react';

interface DetailsFormProps {
  userDetails: UserDetails;
  onChange: (details: UserDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DetailsForm({ userDetails, onChange, onNext, onBack }: DetailsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...userDetails, [e.target.name]: e.target.value });
  };

  const isValid = userDetails.firstName && userDetails.lastName && userDetails.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-white">Your Details</h2>
        <p className="text-zinc-400 font-semibold text-sm">Please provide your information to confirm the booking.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-6 overflow-y-auto pr-3 custom-scrollbar pb-6 px-1">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[13px] font-black text-zinc-500 uppercase tracking-wider ml-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={userDetails.firstName}
              onChange={handleChange}
              className="w-full px-5 py-4 input-3d text-white font-bold placeholder:text-zinc-600 placeholder:font-semibold"
              placeholder="Jane"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-black text-zinc-500 uppercase tracking-wider ml-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={userDetails.lastName}
              onChange={handleChange}
              className="w-full px-5 py-4 input-3d text-white font-bold placeholder:text-zinc-600 placeholder:font-semibold"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-black text-zinc-500 uppercase tracking-wider ml-2">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={userDetails.email}
            onChange={handleChange}
            className="w-full px-5 py-4 input-3d text-white font-bold placeholder:text-zinc-600 placeholder:font-semibold"
            placeholder="jane@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-black text-zinc-500 uppercase tracking-wider ml-2">Phone Number (Optional)</label>
          <input
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 input-3d text-white font-bold placeholder:text-zinc-600 placeholder:font-semibold"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-black text-zinc-500 uppercase tracking-wider ml-2">Additional Notes</label>
          <textarea
            name="notes"
            value={userDetails.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-5 py-4 input-3d text-white font-bold placeholder:text-zinc-600 placeholder:font-semibold resize-none"
            placeholder="Anything we should know before the appointment?"
          />
        </div>

        <div className="mt-8 pt-6 flex justify-between items-center border-t border-zinc-800">
          <button
            type="button"
            onClick={onBack}
            className="btn-3d-secondary px-8 py-4 font-bold text-zinc-300 text-lg"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="btn-3d text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center text-lg gap-2"
          >
            Confirm Booking
            <ChevronRight size={20} className="stroke-[3]" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
