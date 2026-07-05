"use client";

import { useState, useEffect, useMemo, Suspense, Fragment } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Phone,
  Clock,
  Search,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ShoppingBag,
  Plane,
  Laptop,
  Car,
  BarChart2,
  Tv,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Wrench,
  Sparkles
} from "lucide-react";

import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * 유틸리티 함수 및 상수 정의
 */
const ITEMS_PER_PAGE = 12;

const CATEGORY_MAP = {
  "카드": { name: "카드/금융", icon: CreditCard },
  "은행": { name: "은행/금융", icon: Building2 }, // 이미지 기준 "금융"으로 통일
  "통신": { name: "통신/인터넷", icon: Smartphone },
  "가전": { name: "가전/AS", icon: Tv },
  "보험": { name: "보험/증권", icon: ShieldCheck }, // 이미지 기준 "증권"으로 통일
  "배달·쇼핑": { name: "배달/쇼핑", icon: ShoppingBag },
  "항공·여행": { name: "항공/여행", icon: Plane },
  "IT·플랫폼": { name: "IT/플랫폼", icon: Laptop },
  "자동차": { name: "자동차", icon: Car },
  "증권": { name: "증권사", icon: BarChart2 },
  "기타": { name: "기타", icon: HelpCircle }
};

// 전화번호에서 다이얼 가능한 숫자만 추출 (+ 포함)
const getDialablePhone = (phone) => {
  if (!phone) return "";
  // 소스 텍스트 정규식 반영: 괄호 내용 제거 후 숫자 및 + 기호 유지
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

// 한글 이름을 URL 안전한 슬러그로 변환 (404 오류 방지 핵심 로직)
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터$/, "")
    .replace(/\s+고객센터\s+고객센터$/, "")
    .replace(/고객센터$/, "")
    .trim();

  // 특수문자 제거 및 공백을 대시로 변환
  cleanName = cleanName.replace(/[/\: *?"<>|%,.*]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

// 안전한 URI 디코딩 함수 (한글 깨짐 방지)
const safeDecodeURIComponent = (str) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    console.error("Decoding error:", e);
    return str;
  }
};

/**
 * 검색 및 페이징 로직을 담은 내부 컴포넌트
 */
function CategoryInner({ rawCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [searchQuery, setSearchQuery] = useState("");
  const decodedCategory = useMemo(() => safeDecodeURIComponent(rawCategory), [rawCategory]);
  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };
  const CategoryIcon = catDetail.icon;

  // 카테고리 필터링 및 검색어 필터링 통합 로직
  const filteredData = useMemo(() => {
    return customerData.filter((item) => {
      const isMatchCategory = item.category === decodedCategory;
      const isMatchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return isMatchCategory && isMatchSearch;
    });
  }, [decodedCategory, searchQuery]);

  // 페이징 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // 동적 SEO 헤드 태그 주입 (Client Component 방식)
  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname;
    
    // Canonical Link 설정
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}${currentPage > 1 ? `?page=${currentPage}` : ''}`);

    // Pagination Links (Prev/Next) 설정
    const updateLink = (rel, page) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (page >= 1 && page <= totalPages) {
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', rel);
          document.head.appendChild(link);
        }
        link.setAttribute('href', `${baseUrl}?page=${page}`);
      } else if (link) {
        link.remove();
      }
    };

    updateLink('prev', currentPage - 1);
    updateLink('next', currentPage + 1);
  }, [currentPage, totalPages, rawCategory]);

  const handlePageChange = (page) => {
    router.push(`/category/${rawCategory}?page=${page}`, { scroll: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <section className="bg-[#0f172a] pt-16 pb-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <CategoryIcon className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {catDetail.name} 고객센터
          </h1>
          
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${catDetail.name} 관련 서비스나 키워드를 입력하세요`}
              className="w-full pl-14 pr-32 py-5 bg-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg"
            />
            <button className="absolute right-2 top-2 bottom-2 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all text-lg">
              검색
            </button>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 -mt-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600">
            <span className="text-blue-600 font-bold">'{catDetail.name}'</span> 분야 검색결과 <span className="font-bold text-gray-900">{filteredData.length}</span>곳
          </p>
          <p className="text-sm text-gray-400 italic">이름을 입력하거나 전화번호를 누르면 바로 전화가 걸립니다.</p>
        </div>
      </div>

      {/* Result Grid */}
      <main className="max-w-7xl mx-auto w-full px-4 flex-grow mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((item, index) => {
            const is24h = item.hours?.includes("24시간") || item.name?.includes("분실");
            const slug = getSlug(item.name);
            
            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <Link href={`/center/${slug}`} className="group">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className={`text-sm ${is24h ? 'text-red-500 font-medium' : ''}`}>
                        {item.hours || "평일 09:00 ~ 18:00"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500" />
                      <a href={`tel:${getDialablePhone(item.phone)}`} className="text-lg font-bold text-blue-600 hover:underline">
                        {item.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/center/${slug}`}
                  className="w-full py-4 bg-gray-50 border-t border-gray-100 text-center text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  전화번호·상담원 연결 팁 보기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === i + 1 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                    : "bg-white border border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/**
 * 메인 컴포넌트 (Suspense 래퍼)
 * useSearchParams 사용 시의 Vercel 빌드 및 런타임 하이드레이션 오류를 방지하기 위해 필수적으로 적용함.
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 font-medium">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    }>
      <CategoryInner rawCategory={rawCategory} />
    </Suspense>
  );
}