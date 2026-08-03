"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HomeFaqAccordion({ faqData }) {
  const [openFaq, setOpenFaq] = useState(null);

  const handleFaqToggle = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {faqData.map((faq, idx) => {
        const isOpen = openFaq === idx;
        return (
          <div 
            key={idx} 
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
          >
            <button
              onClick={() => handleFaqToggle(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 text-base md:text-lg">
                <span className="text-[#0055FF] font-black text-xl">Q.</span>
                {faq.q}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-slate-600 text-sm md:text-base border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
