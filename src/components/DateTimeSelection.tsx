import React, { useState } from 'react';
import { motion } from 'motion/react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  availableTimes: string[];
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  availableTimes,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack
}: DateTimeSelectionProps) {
  const today = startOfToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(today);

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

  const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
  const prevWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    if (newStart >= today) {
      setCurrentWeekStart(newStart);
    } else {
      setCurrentWeekStart(today);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-white">Date & Time</h2>
        <p className="text-zinc-400 font-semibold text-sm">Select an available date and time for your appointment.</p>
      </div>

      <div className="flex-1 space-y-8 min-h-0 overflow-y-auto pr-3 custom-scrollbar pb-6">
        {/* Date Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-black uppercase tracking-widest text-zinc-500 ml-1">Select Date</h3>
            <div className="flex space-x-3">
              <button 
                onClick={prevWeek}
                disabled={isSameDay(currentWeekStart, today)}
                className="btn-3d-secondary p-2 flex items-center justify-center w-10 h-10"
              >
                <ChevronLeft size={20} className="stroke-[3]" />
              </button>
              <button 
                onClick={nextWeek}
                className="btn-3d-secondary p-2 flex items-center justify-center w-10 h-10"
              >
                <ChevronRight size={20} className="stroke-[3]" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 -mx-1 custom-scrollbar">
            {weekDays.map((day) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, today);
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => {
                    onSelectDate(day);
                    onSelectTime(''); // reset time
                  }}
                  className={`flex-none w-[76px] h-[92px] flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'btn-3d-active'
                      : isToday
                      ? 'btn-3d-secondary ring-4 ring-indigo-900 ring-offset-2 ring-offset-zinc-900'
                      : 'btn-3d-secondary'
                  }`}
                >
                  <span className={`text-[12px] uppercase font-black ${isSelected ? 'text-indigo-300' : 'text-zinc-400'}`}>
                    {format(day, 'EEE')}
                  </span>
                  <span className={`text-[24px] font-black ${isSelected ? 'text-white' : 'text-zinc-100'}`}>
                    {format(day, 'd')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <AnimateHeight show={!!selectedDate}>
          <div>
            <h3 className="text-[14px] font-black uppercase tracking-widest text-zinc-500 mb-4 ml-1">Available Times</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 pt-1 px-1 pb-2">
              {availableTimes.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => onSelectTime(time)}
                    className={`py-3.5 px-3 text-[14px] font-bold text-center ${
                      isSelected ? 'btn-3d-active' : 'btn-3d-secondary'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimateHeight>
      </div>

      <div className="mt-6 flex justify-between items-center pt-6 border-t border-zinc-800">
        <button
          onClick={onBack}
          className="btn-3d-secondary px-8 py-4 font-bold text-zinc-300 text-lg"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="btn-3d text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center text-lg gap-2"
        >
          Continue
          <ChevronRight size={20} className="stroke-[3]" />
        </button>
      </div>
    </motion.div>
  );
}

function AnimateHeight({ children, show }: { children: React.ReactNode; show: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: show ? 'auto' : 0, opacity: show ? 1 : 0 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}
