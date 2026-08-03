"use client";

import Link from "next/link";

export default function HomePagination({ currentPage, totalPages }) {
  const pages = [];
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      {currentPage > 1 && (
        <Link
          href={currentPage - 1 === 1 ? "/" : `/?page=${currentPage - 1}`}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer shadow-3xs"
        >
          이전
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={p === 1 ? "/" : `/?page=${p}`}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
            p === currentPage
              ? "bg-[#0055FF] text-white shadow-md shadow-blue-500/20"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 shadow-3xs"
          }`}
        >
          {p}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer shadow-3xs"
        >
          다음
        </Link>
      )}
    </div>
  );
}
