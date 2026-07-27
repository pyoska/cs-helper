"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyPhoneButton({ phone }) {
  const [copied, setCopied] = useState(false);

  if (!phone) return null;

  const cleanPhone = phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleanPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 active:scale-95"
      title="전화번호 클립보드 복사"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-200">복사 완료!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>번호 복사</span>
        </>
      )}
    </button>
  );
}
