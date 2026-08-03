"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function HomeSearchForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cshelper_search_query", inputValue.trim());
      }
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}&page=1`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative shadow-2xl rounded-full border border-slate-200 bg-white group max-w-2xl mx-auto p-1.5 flex items-center">
      <div className="pl-6 flex items-center pointer-events-none">
        <Search className="h-7 w-7 text-slate-450 group-focus-within:text-[#0055FF] transition-colors" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="삼성카드 고객센터 또는 #분실신고를 검색해보세요"
        className="block w-full pl-6 pr-14 py-6 md:py-7 bg-transparent border-0 rounded-full text-lg md:text-xl text-[#333333] focus:outline-none placeholder-slate-400 font-bold font-sans"
        aria-label="고객센터 브랜드명 또는 해시태그 검색 입력창"
        title="고객센터 대표번호 및 가이드 찾기 검색창"
      />
      {inputValue && (
        <button
          type="button"
          onClick={() => setInputValue("")}
          className="pr-6 text-slate-400 hover:text-slate-655"
          title="검색어 초기화"
          aria-label="입력된 검색어 지우기"
        >
          <X className="h-6 w-6" />
        </button>
      )}
      <button
        type="submit"
        className="mr-1.5 px-7 py-4.5 bg-[#0055FF] hover:bg-blue-700 text-white rounded-full font-extrabold text-base md:text-lg transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
      >
        <span>검색</span>
      </button>
    </form>
  );
}
