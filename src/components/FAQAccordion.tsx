'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        
        return (
          <div 
            key={i} 
            className={`
              bg-white rounded-2xl border transition-all duration-300 overflow-hidden
              ${isOpen ? 'border-primary shadow-xl shadow-primary/5' : 'border-gray-100 shadow-sm hover:border-gray-200'}
            `}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 group"
            >
              <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-gray-900 group-hover:text-primary/70'}`}>
                {item.q}
              </h3>
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
                ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-50 text-gray-400 rotate-0'}
              `}>
                <ChevronDown size={18} strokeWidth={3} />
              </div>
            </button>
            
            <div className={`
              grid transition-all duration-300 ease-in-out
              ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
            `}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-gray-500 leading-relaxed font-medium">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
