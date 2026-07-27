"use client";

import { useState, useEffect } from "react";
import { Star, Bookmark, Check, X, Smartphone } from "lucide-react";

export default function BookmarkNudgeModal({ companyName, slug }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !companyName) return;
    try {
      const favs = JSON.parse(localStorage.getItem("cshelper_favorites") || "[]");
      const exists = favs.some((item) => item.name === companyName);
      setIsFavorite(exists);
    } catch (e) {
      // silently ignore localStorage errors
    }
  }, [companyName]);

  const toggleFavorite = () => {
    if (typeof window === "undefined" || !companyName) return;
    try {
      let favs = JSON.parse(localStorage.getItem("cshelper_favorites") || "[]");
      const exists = favs.some((item) => item.name === companyName);

      if (exists) {
        favs = favs.filter((item) => item.name !== companyName);
        setIsFavorite(false);
        setToastMsg(`'${companyName}' 즐겨찾기 해제됨`);
      } else {
        favs.push({ name: companyName, slug });
        setIsFavorite(true);
        setToastMsg(`'${companyName}' 자주 찾는 고객센터에 추가됨!`);
      }

      localStorage.setItem("cshelper_favorites", JSON.stringify(favs));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      // silently ignore localStorage errors
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. 자주 찾는 센터 퀵 추가 버튼 */}
      <button
        onClick={toggleFavorite}
        className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          isFavorite
            ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
        }`}
      >
        <Star className={`w-4 h-4 ${isFavorite ? "fill-amber-400 text-amber-500" : "text-slate-400"}`} />
        <span>{isFavorite ? "⭐ 자주 찾는 고객센터에 저장됨 (클릭 시 해제)" : "★ 자주 찾는 고객센터로 내 브라우저에 저장"}</span>
      </button>

      {/* 2. 재방문 넛지 안내 카드 */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-2xl border border-blue-800 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">다음에도 대기 없이 빠르게 연결하려면?</p>
            <p className="text-3xs text-blue-200 mt-0.5">브라우저 메뉴에서 <strong className="text-amber-300">[홈 화면에 추가]</strong> 또는 <strong className="text-amber-300">[북마크(Ctrl+D)]</strong>해 두세요!</p>
          </div>
        </div>
      </div>

      {/* 알림 토스트 */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
