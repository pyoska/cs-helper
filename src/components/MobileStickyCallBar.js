"use client";

import { useState, useEffect } from "react";
import { Phone, ChevronUp } from "lucide-react";

export default function MobileStickyCallBar({ phone, companyName, arsPath }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 250px on mobile
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || !phone) return null;

  const dialablePhone = phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-3xs font-extrabold text-blue-400 uppercase tracking-widest truncate">{companyName}</p>
          <p className="text-xs font-bold text-white truncate">
            {arsPath ? `단축키: ${arsPath}` : "직통 상담원 연결 지원"}
          </p>
        </div>
        <a
          href={`tel:${dialablePhone}`}
          className="bg-[#0055FF] hover:bg-blue-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-500/30 active:scale-95 transition-all shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>전화 걸기</span>
        </a>
      </div>
    </div>
  );
}
