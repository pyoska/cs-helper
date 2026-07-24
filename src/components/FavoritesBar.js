"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight, X } from "lucide-react";

export default function FavoritesBar() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const favs = JSON.parse(localStorage.getItem("cshelper_favorites") || "[]");
      setFavorites(favs);
    } catch (e) {
      // silently ignore localStorage errors
    }
  }, []);

  const removeFavorite = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = favorites.filter((item) => item.name !== name);
      setFavorites(updated);
      localStorage.setItem("cshelper_favorites", JSON.stringify(updated));
    } catch (err) {
      // silently ignore localStorage errors
    }
  };

  if (!favorites || favorites.length === 0) return null;

  return (
    <section className="bg-white border border-amber-200 rounded-3xl p-6 shadow-xs animate-in fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          <h2 className="text-base md:text-lg font-black text-slate-900">⭐ 내가 자주 찾는 고객센터 (내 브라우저 저장)</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">총 {favorites.length}개</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {favorites.map((fav, idx) => (
          <Link
            key={idx}
            href={`/${fav.slug}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-50/60 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-slate-800 transition-all group cursor-pointer"
          >
            <span>{fav.name}</span>
            <button
              onClick={(e) => removeFavorite(e, fav.name)}
              className="text-amber-400 hover:text-amber-700 p-0.5 rounded-full hover:bg-amber-200/50"
              title="즐겨찾기 삭제"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}
