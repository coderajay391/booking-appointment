import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookingState } from '../types';
import { services, availableTimes } from '../data';
import { ServiceSelection } from './ServiceSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { DetailsForm } from './DetailsForm';
import { SuccessStep } from './SuccessStep';
import { Check, Hospital } from 'lucide-react';

const initialState: BookingState = {
  step: 1,
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  userDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  }
};

const steps = [
  { id: 1, title: 'Service' },
  { id: 2, title: 'Date & Time' },
  { id: 3, title: 'Details' },
  { id: 4, title: 'Done' }
];

export function BookingSystem() {
  const [state, setState] = useState<BookingState>(initialState);

  const updateState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => updateState({ step: state.step + 1 });
  const prevStep = () => updateState({ step: state.step - 1 });
  const reset = () => setState(initialState);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-0 relative z-10 panel-3d overflow-hidden">
        
        {/* Left Sidebar - Progress */}
        <div className="md:col-span-4 hidden md:block border-r border-zinc-800 bg-zinc-900/50">
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 border-t-2 border-indigo-300 border-b-4 border-indigo-800 flex-shrink-0 flex items-center justify-center shadow-lg">
                <Hospital className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">Apex Medical</span>
            </div>
            
            <nav aria-label="Progress" className="mt-4">
              <ol className="overflow-hidden space-y-8">
                {steps.map((step, index) => {
                  const isCurrent = state.step === step.id;
                  const isCompleted = state.step > step.id;
                  
                  return (
                    <li key={step.id} className="relative">
                      {index !== steps.length - 1 && (
                        <div className={`absolute top-10 left-5 -ml-[3px] h-full w-1.5 rounded-full ${
                          isCompleted ? 'bg-indigo-500' : 'bg-zinc-800 border-x border-zinc-700'
                        }`} />
                      )}
                      <div className="group flex items-center">
                        <span className="flex h-10 items-center">
                          <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl font-bold transition-all duration-300 ${
                            isCompleted
                              ? 'bg-indigo-500 text-white border border-indigo-400 border-t-indigo-300 border-b-[3px] border-b-indigo-800 shadow-md'
                              : isCurrent
                              ? 'bg-zinc-800 text-indigo-400 border border-zinc-700 border-t-zinc-600 border-b-[3px] border-b-black -translate-y-[1px] shadow-lg'
                              : 'bg-zinc-900 text-zinc-500 border border-zinc-800 border-t-zinc-700 border-b-[3px] border-b-black'
                          }`}>
                            {isCompleted ? (
                              <Check className="h-5 w-5 text-white stroke-[3]" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </span>
                        </span>
                        <span className="ml-5 flex min-w-0 flex-col">
                          <span className={`text-sm font-black tracking-wide uppercase transition-colors duration-300 ${
                            isCurrent ? 'text-white' : isCompleted ? 'text-white' : 'text-zinc-600'
                          }`}>
                            {step.title}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {state.selectedService && state.step < 4 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto input-3d p-6 flex flex-col gap-4"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-zinc-700 shadow-sm">
                    <img src={state.selectedService.image} alt="" className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-[15px] leading-tight mb-1">{state.selectedService.title}</p>
                    <p className="text-xs font-semibold text-zinc-400 line-clamp-1">{state.selectedService.description}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-zinc-800 my-1" />
                
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-400">Duration</span>
                  <span className="text-white">{state.selectedService.duration} mins</span>
                </div>
                
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-zinc-400">Price</span>
                  <span className="text-indigo-400 text-lg">₹{state.selectedService.price}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-8 bg-zinc-900 rounded-r-3xl">
          <div className="p-6 md:p-10 h-full min-h-[650px] flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {state.step === 1 && (
                <ServiceSelection
                  key="step1"
                  services={services}
                  selectedService={state.selectedService}
                  onSelect={(service) => updateState({ selectedService: service })}
                  onNext={nextStep}
                />
              )}
              {state.step === 2 && (
                <DateTimeSelection
                  key="step2"
                  selectedDate={state.selectedDate}
                  selectedTime={state.selectedTime}
                  availableTimes={availableTimes}
                  onSelectDate={(date) => updateState({ selectedDate: date })}
                  onSelectTime={(time) => updateState({ selectedTime: time })}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {state.step === 3 && (
                <DetailsForm
                  key="step3"
                  userDetails={state.userDetails}
                  onChange={(details) => updateState({ userDetails: details })}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {state.step === 4 && (
                <SuccessStep
                  key="step4"
                  state={state}
                  onReset={reset}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        
      </div>
    </div>
  );
}
