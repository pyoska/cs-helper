"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Phone,
  Clock,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  Wrench,
  BarChart2,
  Tv,
  Search,
  ChevronRight
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * CATEGORY_MAP: page.js.txt 소스 컨텍스트의 아이콘 정의를 엄격히 준수
 * 시스템 전반의 일관성을 유지하기 위해 아키텍처 가이드에 맞춘 매핑
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

const ITEMS_PER_PAGE = 12;

/**
 * getSlug: 상세 페이지(app/[slug]/page.js)와의 연동을 위해
 * 원천 소스(page.js.txt)의 정규식을 완벽하게 복제하여 404 에러 방지
 */
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터 $/, "")
    .replace(/\s+고객센터\s+고객센터$ /, "")
    .replace(/고객센터$/, "")
    .trim();
  cleanName = cleanName.replace(/[/\: *?"<>|%,.* ]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

/**
 * getDialablePhone: 하이픈 및 숫자 추출 로직
 */
const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/([^)]*)/g, "").replace(/[^0-9+-]/g, "").trim();
};

/**
 * CategoryList: 핵심 비즈니스 로직 및 UI 렌더링 컴포넌트
 */
function CategoryList({ rawCategory }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchTerm, setSearchTerm] = useState("");

  // URL 파라미터 한글 디코딩 및 안전한 처리
  const decodedCategory = useMemo(() => {
    try {
      return decodeURIComponent(rawCategory);
    } catch (e) {
      console.error("Decoding error:", e);
      return rawCategory;
    }
  }, [rawCategory]);

  // 카테고리 필터링 및 검색어 필터링 통합 로직
  const filteredData = useMemo(() => {
    return customerData.filter((item) => {
      const matchesCategory = item.category === decodedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [decodedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /**
   * SEO 최적화: Canonical 및 Pagination 링크 태그 동적 주입 및 정리
   */
  useEffect(() => {
    const head = document.head;
    const baseUrl = "https://cshelper.kr";
    const currentPath = `/category/${rawCategory}`;
    const canonicalUrl = `${baseUrl}${currentPath}?page=${currentPage}`;

    // Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Pagination Tags Cleanup & Injection
    const cleanupPagination = () => {
      document.querySelectorAll('link[rel="prev"], link[rel="next"]').forEach(el => el.remove());
    };
    cleanupPagination();

    if (currentPage > 1) {
      const prevLink = document.createElement("link");
      prevLink.setAttribute("rel", "prev");
      prevLink.setAttribute("href", `${baseUrl}${currentPath}?page=${currentPage - 1}`);
      head.appendChild(prevLink);
    }
    if (currentPage < totalPages) {
      const nextLink = document.createElement("link");
      nextLink.setAttribute("rel", "next");
      nextLink.setAttribute("href", `${baseUrl}${currentPath}?page=${currentPage + 1}`);
      head.appendChild(nextLink);
    }

    return () => cleanupPagination();
  }, [currentPage, totalPages, rawCategory]);

  const catInfo = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: ShieldCheck };
  const IconComponent = catInfo.icon;

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      {/* 상단 네비게이션: 1페이지.png 가이드 준수 */}
      <header className="bg-[#0F172A] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center">
          CS 고객센터 도우미<span className="text-blue-400 text-sm ml-1">.kr</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium opacity-90">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">About Us</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">관리자 모드</span>
        </div>
      </header>

      {/* 검색 섹션: 디자인 가이드에 따라 화이트 배경 및 확장형 UI 적용 */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-blue-50 rounded-3xl border border-blue-100 shadow-sm">
              <IconComponent className="w-14 h-14 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-10 tracking-tight">
            {catInfo.name} 고객센터
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`${catInfo.name} 관련 서비스나 키워드를 입력하세요`}
              className="w-full pl-14 pr-36 py-5 bg-gray-50 border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 shadow-sm transition-all text-lg"
            />
            <button className="absolute right-3 top-2.5 bottom-2.5 px-8 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md">
              검색
            </button>
          </div>
        </div>
      </section>

      {/* 결과 그리드 및 결과 요약 영역 */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 -mt-8 mb-24">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 font-medium text-lg">
            <span className="text-blue-600 font-bold">&apos;{catInfo.name}&apos;</span> 분야 검색결과 <span className="font-extrabold text-slate-900">{filteredData.length}</span>곳
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            이름을 입력하거나 전화번호를 누르면 바로 전화가 걸립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedData.map((item, idx) => {
            const slug = getSlug(item.name);
            const is24h = item.hours?.includes("24시간") || item.name.includes("분실") || item.name.includes("사고");
            
            return (
              <Link 
                key={idx} 
                href={`/${slug}`} 
                className="group bg-white rounded-3xl border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <div className="p-2 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                      <Phone className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-500 font-medium">
                      <Clock className="w-5 h-5 mr-3 text-gray-400" />
                      <span className="text-sm">{item.hours || "정보 확인 필요"}</span>
                      {is24h && (
                        <span className="ml-3 px-2.5 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-md tracking-tighter">24H</span>
                      )}
                    </div>
                    <div className="flex items-center text-blue-600 font-black text-2xl tracking-tighter">
                      <Phone className="w-5 h-5 mr-3" />
                      {item.phone}
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 bg-gray-50/50 p-5 group-hover:bg-blue-600 transition-all duration-300">
                  <div className="flex items-center justify-center text-sm font-bold text-gray-600 group-hover:text-white transition-colors">
                    전화번호 상담원 연결 바로가기
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 페이지네이션 UI: 접근성 및 가독성 최적화 */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  router.push(`/category/${rawCategory}?page=${num}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
                  currentPage === num
                    ? "bg-blue-600 text-white shadow-lg scale-110"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/**
 * CategoryContent Export: Vercel 빌드 안정성을 위해 Suspense Boundary 적용
 * 테마에 맞춘 로딩 스켈레톤 디자인 포함
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F4F7FB] flex flex-col">
        <div className="h-16 bg-[#0F172A] w-full" />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-bold animate-pulse">고객센터 데이터를 안전하게 불러오고 있습니다...</p>
        </div>
      </div>
    }>
      <CategoryList rawCategory={rawCategory} />
    </Suspense>
  );
}
