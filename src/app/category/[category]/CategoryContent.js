'use client';

/**
 * [파일명: CategoryContent.js]
 * 
 * @description 
 * 특정 카테고리의 고객센터 데이터를 필터링하여 리스트로 출력하는 Next.js 클라이언트 컴포넌트입니다.
 * Senior Full-Stack Engineer 관점에서 SEO 최적화(Canonical, Prev/Next), Hydration Mismatch 방지,
 * 그리고 모바일 친화적인 Sliding Window 페이지네이션을 구현했습니다.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Phone,
  Clock,
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
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

import { customerData } from '@/data/customerData';
import Footer from '@/components/Footer';

// --- 상수 정의 ---

const ITEMS_PER_PAGE = 12;

// 카테고리 매핑 데이터 (Source Context 기반)
const CATEGORY_MAP = {
  "카드": { name: "카드/금융", icon: CreditCard },
  "은행": { name: "은행/저축", icon: Building2 },
  "통신": { name: "통신/인터넷", icon: Smartphone },
  "가전": { name: "가전/AS", icon: Tv },
  "보험": { name: "보험/상조", icon: ShieldCheck },
  "배달·쇼핑": { name: "배달/쇼핑", icon: ShoppingBag },
  "항공·여행": { name: "항공/여행", icon: Plane },
  "IT·플랫폼": { name: "IT/플랫폼", icon: Laptop },
  "자동차": { name: "자동차", icon: Car },
  "증권": { name: "증권사", icon: BarChart2 },
  "기타": { name: "기타", icon: HelpCircle }
};

// --- 유틸리티 함수 ---

/**
 * 전화번호 문자열에서 숫자와 +, - 기호만 추출합니다. (Source Context 반영)
 * @param {string} phone 
 * @returns {string}
 */
const getDialablePhone = (phone) => {
  if (!phone) return "";
  // 괄호 및 괄호 안의 내용을 제거하고 숫자/기호만 남김
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

/**
 * SEO에 적합한 URL 슬러그를 생성합니다. (Source Context 반영)
 * @param {string} name 
 * @returns {string}
 */
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터$/, "")
    .replace(/\s+고객센터\s+고객센터$/, "")
    .replace(/고객센터$/, "")
    .trim();

  // 소스 컨텍스트의 정규식 [/\: *?"<>|%,.* ] 을 적용하여 특수문자 및 공백 제거
  cleanName = cleanName.replace(/[/\: *?"<>|%,.* ]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

// --- 메인 컴포넌트 ---

export default function CategoryContent({ rawCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL 쿼리 파라미터에서 현재 페이지를 읽어와 초기 상태값 설정
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration Mismatch 방지: 클라이언트 마운트 여부 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. 카테고리명 디코딩 (Safe Decoding)
  const decodedCategory = useMemo(() => {
    try {
      return decodeURIComponent(rawCategory).trim();
    } catch (e) {
      console.error("Decoding error:", e);
      return rawCategory;
    }
  }, [rawCategory]);

  // 2. 데이터 필터링
  const filteredData = useMemo(() => {
    return customerData.filter((item) => 
      item.category && item.category.trim() === decodedCategory
    );
  }, [decodedCategory]);

  // 3. 페이지네이션 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // 4. 동적 SEO 헤드 주입 (Canonical, Prev, Next)
  useEffect(() => {
    if (!isMounted) return;

    const head = document.head;
    const protocol = window.location.protocol;
    const host = window.location.host;
    const pathname = window.location.pathname;
    const baseUrl = `${protocol}//${host}${pathname}`;
    
    const cleanupTags = () => {
      const selectors = ['link[rel="canonical"]', 'link[rel="prev"]', 'link[rel="next"]'];
      selectors.forEach(sel => {
        const tags = head.querySelectorAll(sel);
        tags.forEach(t => t.remove());
      });
    };

    cleanupTags();

    // Canonical Tag
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`;
    head.appendChild(canonical);

    // Prev Tag
    if (currentPage > 1) {
      const prev = document.createElement('link');
      prev.rel = 'prev';
      prev.href = currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`;
      head.appendChild(prev);
    }

    // Next Tag
    if (currentPage < totalPages) {
      const next = document.createElement('link');
      next.rel = 'next';
      next.href = `${baseUrl}?page=${currentPage + 1}`;
      head.appendChild(next);
    }

    return () => cleanupTags();
  }, [currentPage, totalPages, isMounted]);

  // 5. 이벤트 핸들러
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    // URL 쿼리 파라미터 업데이트 (SEO 및 뒤로가기 대응)
    router.push(`?page=${pageNum}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // UI 데이터 매핑
  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };
  const CategoryIcon = catDetail.icon;

  // Sliding Window 페이지네이션 로직 (UI 파괴 방지)
  const renderPaginationButtons = () => {
    const pages = [];
    const windowSize = 2; // 현재 페이지 앞뒤로 보여줄 개수

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - windowSize && i <= currentPage + windowSize)
      ) {
        pages.push(i);
      } else if (
        i === currentPage - windowSize - 1 || 
        i === currentPage + windowSize + 1
      ) {
        pages.push('ellipsis');
      }
    }

    // 중복 ellipsis 제거
    const uniquePages = pages.filter((v, i, a) => a.indexOf(v) === i);

    return uniquePages.map((p, idx) => {
      if (p === 'ellipsis') {
        return <MoreHorizontal key={`ellipsis-${idx}`} className="text-gray-400" />;
      }
      return (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`w-10 h-10 rounded-xl font-bold transition-all duration-200 ${
            currentPage === p
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          {p}
        </button>
      );
    });
  };

  if (!isMounted) return null; // 서버 사이드 렌더링 시 빈 화면 방지

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-slate-900">
      {/* 상단 히어로 섹션 */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="inline-flex p-4 bg-blue-50 rounded-3xl text-blue-600 shadow-sm w-fit">
              <CategoryIcon size={36} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                {catDetail.name} <span className="text-blue-600">고객센터</span>
              </h1>
              <p className="text-gray-500 text-lg font-medium">
                총 {filteredData.length}개의 검증된 고객센터 정보를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 리스트 */}
      <main className="flex-grow max-w-7xl mx-auto px-5 py-12 w-full">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedData.map((item, index) => {
              const name = item?.name || "명칭 미상";
              const hours = item?.hours || "운영 시간 정보 없음";
              const is24h = item?.hours?.includes("24시간") || item?.name?.includes("분실");
              const dialablePhone = getDialablePhone(item?.phone);
              const slug = getSlug(name);

              return (
                <article 
                  key={`${item.id || index}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {name}
                      </h3>
                      {is24h && (
                        <span className="shrink-0 bg-red-50 text-red-600 text-[11px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                          <AlertCircle size={12} /> 24H
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <Phone size={18} className="mr-3 text-blue-500 shrink-0" />
                        <span className="font-bold text-lg">{item?.phone || "번호 정보 없음"}</span>
                      </div>
                      <div className="flex items-start text-gray-500 px-1">
                        <Clock size={16} className="mr-3 mt-1 text-gray-400 shrink-0" />
                        <p className="text-sm leading-relaxed">{hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href={`tel:${dialablePhone}`}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                    >
                      <Phone size={20} fill="currentColor" /> 전화하기
                    </a>
                    <Link
                      href={`/center/${slug}`}
                      className="w-full bg-white text-gray-600 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      상세정보 <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
            <HelpCircle size={64} className="mx-auto text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold text-gray-400">등록된 데이터가 없습니다</h2>
            <p className="text-gray-400 mt-2">다른 카테고리를 선택해 주세요.</p>
          </div>
        )}

        {/* 페이지네이션 (Sliding Window 구현) */}
        {totalPages > 1 && (
          <nav className="mt-16 flex justify-center items-center gap-3">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
              {renderPaginationButtons()}
            </div>

            {/* 모바일용 심플 페이지 표시 */}
            <div className="sm:hidden font-bold text-gray-500">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-xl hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight size={24} />
            </button>
          </nav>
        )}
      </main>

      <Footer />
    </div>
  );
}
