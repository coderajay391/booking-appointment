import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Service } from '../types';

interface ServiceSelectionProps {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

export function ServiceSelection({ services, selectedService, onSelect, onNext }: ServiceSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-white">Book Appointment</h2>
        <p className="text-zinc-400 font-semibold text-sm">Choose your preferred specialist and time slot below.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-3 custom-scrollbar pb-6">
        <h3 className="text-[14px] font-black uppercase tracking-widest text-zinc-500 mb-4 ml-1">Select Service</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service) => {
            const Icon = (Icons as any)[service.iconName] || Icons.Circle;
            const isSelected = selectedService?.id === service.id;

            return (
              <motion.button
                key={service.id}
                onClick={() => onSelect(service)}
                className={`card-3d text-left flex flex-col group p-0 ${
                  isSelected ? 'selected' : ''
                }`}
              >
                <div className="h-32 w-full relative overflow-hidden bg-zinc-800 border-b border-zinc-800">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-xl text-white border border-white/10 shadow-sm">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-white text-lg mb-1">{service.title}</h3>
                  <p className="text-zinc-400 text-xs font-semibold mb-4 line-clamp-2">{service.description}</p>
                  <div className="font-bold text-sm flex items-center gap-2 mt-auto">
                    <span className="bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-lg text-zinc-300 shadow-sm">{service.duration} mins</span>
                    <span className="bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-lg shadow-sm">₹{service.price}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-end pt-6 border-t border-zinc-800">
        <button
          onClick={onNext}
          disabled={!selectedService}
          className="btn-3d text-white px-8 py-4 rounded-xl font-bold transition-all w-full md:w-auto flex items-center justify-center text-lg gap-2"
        >
          Continue
          <Icons.ArrowRight size={20} className="stroke-[3]" />
        </button>
      </div>
    </motion.div>
  );
}
