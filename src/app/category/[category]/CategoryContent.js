"use client";

import React, { useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Phone, 
  Clock, 
  Search, 
  ArrowLeft, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Tv, 
  ShieldCheck, 
  ShoppingBag, 
  Wrench, 
  BarChart2, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * [상수 정의]
 * 페이지당 노출 아이템 수
 */
const ITEMS_PER_PAGE = 12;

/**
 * [CATEGORY_MAP]
 * Source Context(page.js.txt)와 1:1 일치하도록 정의
 */
const CATEGORY_MAP = {
  "카드": { name: "카드/금융", icon: CreditCard },
  "은행": { name: "은행/저축", icon: Building2 },
  "통신": { name: "통신/인터넷", icon: Smartphone },
  "가전": { name: "가전/AS", icon: Tv },
  "보험": { name: "보험/상조", icon: ShieldCheck },
  "배달·쇼핑": { name: "배달/쇼핑", icon: ShoppingBag },
  "항공·여행": { name: "항공/여행", icon: Wrench },
  "IT·플랫폼": { name: "IT/플랫폼", icon: Smartphone },
  "자동차": { name: "자동차", icon: Wrench },
  "증권": { name: "증권사", icon: BarChart2 },
  "기타": { name: "기타", icon: ShieldCheck }
};

/**
 * [getSlug]
 * 정규표현식 및 로직을 Source Context와 한 토씨도 틀리지 않게 구현
 */
const getSlug = (name) => {
  let cleanName = name.trim()
    .replace(/\s+고객센터 $/, "")
    .replace(/\s+고객센터\s+고객센터$ /, "")
    .replace(/고객센터$/, "")
    .trim();
  cleanName = cleanName.replace(/[/\: *?"<>|%,.* ]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

/**
 * [CategoryList 컴포넌트]
 * 실제 데이터 로직 및 UI 렌더링 담당
 */
function CategoryList({ rawCategory }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 안전한 디코딩 처리 (한글 깨짐 방지)
  const decodedCategory = useMemo(() => {
    try {
      return decodeURIComponent(rawCategory);
    } catch (e) {
      console.error("Decoding error:", e);
      return rawCategory;
    }
  }, [rawCategory]);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };

  // 데이터 필터링
  const filteredData = useMemo(() => {
    return customerData.filter((item) => item.category === decodedCategory);
  }, [decodedCategory]);

  // 페이징 계산
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // 동적 SEO 메타 태그 주입
  useEffect(() => {
    const canonicalUrl = `https://cshelper.kr/category/${rawCategory}?page=${currentPage}`;
    
    let linkCanonical = document.querySelector("link[rel='canonical']");
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);

    // Prev/Next 관계 설정
    const handleLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel='${rel}']`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    if (currentPage > 1) {
      handleLinkTag("prev", `https://cshelper.kr/category/${rawCategory}?page=${currentPage - 1}`);
    }
    if (currentPage < totalPages) {
      handleLinkTag("next", `https://cshelper.kr/category/${rawCategory}?page=${currentPage + 1}`);
    }
  }, [currentPage, totalPages, rawCategory]);

  const handlePageChange = (page) => {
    router.push(`/category/${rawCategory}?page=${page}`, { scroll: true });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      {/* 상단 네비게이션 */}
      <nav className="bg-[#0f172a] py-4 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span><span className="text-blue-400">CS</span> 고객센터 도우미</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm text-slate-400 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">About Us</span>
            <span className="hover:text-white cursor-pointer transition-colors">관리자 모드</span>
          </div>
        </div>
      </nav>

      {/* 검색 섹션 (Navy Hero Section) */}
      <section className="bg-[#0f172a] pt-12 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600/10 p-5 rounded-3xl border border-blue-500/20 backdrop-blur-sm">
              {catDetail.icon && <catDetail.icon className="w-14 h-14 text-blue-400" />}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-10 tracking-tight">
            {catDetail.name} 고객센터
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder={`${catDetail.name} 관련 서비스나 키워드를 입력하세요`}
              className="w-full pl-16 pr-36 py-6 rounded-full bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-2xl text-lg transition-all"
            />
            <button className="absolute right-3 top-3 bottom-3 px-10 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95">
              검색
            </button>
          </div>
        </div>
      </section>

      {/* 결과 요약 바 */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-800 text-lg">
            <span className="text-blue-600 font-extrabold">'{decodedCategory}'</span> 분야 검색결과 <span className="font-extrabold text-slate-900">{totalItems}</span>곳
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>이름을 입력하거나 전화번호를 누르면 바로 전화가 걸립니다.</span>
          </div>
        </div>
      </div>

      {/* 메인 리스트 (Grid Card UI) */}
      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedData.map((item, idx) => {
            const slug = getSlug(item.name);
            return (
              <div 
                key={`${item.name}-${idx}`} 
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col group"
              >
                <div className="p-7 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="p-2.5 bg-blue-50 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-2">
                    <div className="flex items-center text-slate-500 gap-2.5">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">{item.hours || "평일 09:00 ~ 18:00"}</span>
                    </div>
                    <div className="text-2xl font-black text-blue-600 tracking-tight flex items-center gap-2">
                      {item.phone}
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/${slug}`}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-base transition-colors flex items-center justify-center gap-2"
                >
                  전화번호 상담원 연결 바로가기
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-xl border font-bold text-lg transition-all ${
                    currentPage === i + 1
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/**
 * [메인 내보내기 컴포넌트]
 * Suspense를 사용하여 CSR 페칭 및 useSearchParams 관련 Vercel 배포 오류 해결
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F7FB] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">데이터를 안전하게 불러오는 중입니다...</p>
      </div>
    }>
      <CategoryList rawCategory={rawCategory} />
    </Suspense>
  );
}