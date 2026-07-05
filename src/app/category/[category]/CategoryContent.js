"use client";

import React, { useState, useEffect, useMemo, useDeferredValue, Suspense, Fragment } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  BadgeCheck,
  Wrench,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Search,
  Landmark,
  ShieldAlert
} from "lucide-react";

// 외부 데이터 및 레이아웃 컴포넌트 임포트
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * [상수 설정]
 */
const ITEMS_PER_PAGE = 12;

// [SOURCE_IMAGE_1]의 시각적 위계에 맞춘 카테고리 맵 구성
const CATEGORY_MAP = {
  "은행": { name: "은행/금융", icon: CreditCard, subText: "은행 및 카드사 상담 연결" },
  "배달·쇼핑": { name: "쇼핑몰", icon: ShoppingBag, subText: "주요 이커머스 고객센터" },
  "통신": { name: "통신사", icon: Smartphone, subText: "SKT, KT, LG 통신 장애 및 변경" },
  "공공": { name: "공공기관", icon: Landmark, subText: "민원 상담 및 정부 서비스" },
  "보험": { name: "보험/증권", icon: ShieldCheck, subText: "가입 및 보장 내역 확인" },
  "긴급분실": { name: "긴급분실", icon: ShieldAlert, subText: "카드/통장 분실 즉시 신고" },
  "가전": { name: "가전/AS", icon: Tv },
  "항공·여행": { name: "항공/여행", icon: Plane },
  "IT·플랫폼": { name: "IT/플랫폼", icon: Laptop },
  "자동차": { name: "자동차", icon: Car },
  "증권": { name: "증권사", icon: BarChart2 },
  "기타": { name: "기타", icon: HelpCircle }
};

/**
 * [유틸리티 함수]
 */

// 전화번호에서 숫자만 추출 (tel: 프로토콜용)
const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/[^0-9]/g, "");
};

// SEO 친화적 슬러그 생성 (소문자 변환 및 중복 제거)
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터$/, "")
    .replace(/\s+고객센터\s+고객센터$/, "")
    .replace(/고객센터$/, "")
    .trim();

  // 특수문자 제거, 공백 하이픈 변환, 소문화
  cleanName = cleanName.replace(/[/\:\\*?"<>|%,.*]/g, "");
  const slug = cleanName.replace(/\s+/g, "-").toLowerCase();
  return `${slug}-고객센터`;
};

/**
 * CategoryContentInner: 비즈니스 로직 및 UI 구현
 */
function CategoryContentInner({ rawCategory }) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // 성능 최적화를 위한 검색어 디퍼드 벨류 적용
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // 1. Safe Decoding: 인코딩 오류 방지 처리
  const decodedCategory = useMemo(() => {
    try {
      return rawCategory ? decodeURIComponent(rawCategory).trim() : "";
    } catch (e) {
      console.error("Decoding error:", e);
      return rawCategory || "";
    }
  }, [rawCategory]);

  // 2. Search & Filter Logic: 카테고리 매칭 및 검색 필터링
  const filteredData = useMemo(() => {
    return customerData.filter((item) => {
      const isCategoryMatch = item.category === decodedCategory;
      const isSearchMatch = (item.name || "").toLowerCase().includes(deferredSearchTerm.toLowerCase());
      return isCategoryMatch && isSearchMatch;
    });
  }, [decodedCategory, deferredSearchTerm]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // 4. SEO Dynamic Injection: Canonical 및 Pagination Tag 관리
  useEffect(() => {
    const head = document.head;
    const baseUrl = `https://cs-helper.kr/category/${rawCategory}`;
    const canonicalUrl = `${baseUrl}${currentPage > 1 ? `?page=${currentPage}` : ""}`;

    // 태그 생성/업데이트 함수
    const setTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (tag) {
        tag.setAttribute("href", href);
      } else {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        tag.setAttribute("href", href);
        head.appendChild(tag);
      }
      return tag;
    };

    const canonicalTag = setTag("canonical", canonicalUrl);
    
    let prevTag = null;
    if (currentPage > 1) {
      prevTag = setTag("prev", `${baseUrl}?page=${currentPage - 1}`);
    }

    let nextTag = null;
    if (currentPage < totalPages) {
      nextTag = setTag("next", `${baseUrl}?page=${currentPage + 1}`);
    }

    // Cleanup: 언마운트 시 동적 태그 제거 (태그 중복 방지)
    return () => {
      if (canonicalTag) canonicalTag.remove();
      const p = document.querySelector('link[rel="prev"]');
      const n = document.querySelector('link[rel="next"]');
      if (p) p.remove();
      if (n) n.remove();
    };
  }, [currentPage, totalPages, rawCategory]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };
  const CategoryIcon = catDetail.icon;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Search Section: [SOURCE_IMAGE_1] 테마 적용 */}
      <section className="bg-[#0f172a] pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <CategoryIcon className="w-10 h-10 text-blue-400" />
            {catDetail.name} 고객센터
          </h1>
          
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="삼성카드 고객센터 또는 #분실신고를 검색해보세요"
              className="w-full pl-14 pr-24 py-5 rounded-full shadow-lg focus:ring-4 focus:ring-blue-500/30 outline-none text-gray-900 text-lg transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button className="absolute right-3 top-2.5 bottom-2.5 px-6 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
              검색
            </button>
          </div>

          {/* 인기 검색어 row [SOURCE_IMAGE_1] 기반 */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-300">
            <span className="opacity-70">인기 검색어:</span>
            {["신한카드", "삼성카드", "현대카드", "국민카드", "롯데카드"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-1.5 rounded-md border border-gray-700 hover:bg-gray-800 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result Info & Grid Layout */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 -mt-12 mb-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-gray-700 text-lg">
            <span className="font-bold text-blue-600">'{catDetail.name}'</span> 분야 검색결과 
            <span className="font-bold ml-1">{filteredData.length}곳</span>
          </p>
          <p className="text-gray-400 text-sm italic">이름을 입력하거나 전화번호를 누르면 바로 전화가 걸립니다.</p>
        </div>

        {/* 서비스 카드 그리드: [SOURCE_IMAGE_2] 디자인 반영 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((item, index) => {
            const name = item?.name || "정보 없음";
            const hours = item?.hours || "";
            // 분실 관련 키워드가 있거나 24시간 표기가 있으면 강조
            const is24h = hours.includes("24시간") || name.includes("분실");
            const slug = getSlug(name);
            const dialPhone = getDialablePhone(item?.phone);

            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {name}
                    </h3>
                    <Link href={`/details/${slug}`} className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-[15px] text-gray-500">
                      <Clock className="w-5 h-5 mr-3 text-gray-300" />
                      <span className={is24h ? "text-blue-600 font-semibold" : ""}>
                        {hours || "운영시간 정보 없음"}
                      </span>
                    </div>
                    <div className="flex items-center text-[15px]">
                      <Phone className="w-5 h-5 mr-3 text-gray-300" />
                      <a 
                        href={`tel:${dialPhone}`} 
                        className="text-blue-600 font-bold hover:underline"
                      >
                        {item?.phone || "번호 정보 없음"}
                      </a>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/details/${slug}`}
                  className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform"
                >
                  <Phone className="w-4 h-4 mr-1.5" />
                  전화번호 · 상담원 연결 팁 보기 →
                </Link>
              </div>
            );
          })}
        </div>

        {/* 결과 없음 UI */}
        {filteredData.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <AlertCircle className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <p className="text-gray-500 text-xl font-medium">검색 결과가 없습니다.</p>
            <p className="text-gray-400 mt-2">다른 검색어를 입력하거나 카테고리를 확인해주세요.</p>
          </div>
        )}

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200"
                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {pageNum}
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
 * CategoryContent (Main Export): Vercel 빌드 및 클라이언트 사이드 Hook 안정성 확보를 위한 Suspense 적용
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold animate-pulse">고객센터 정보를 불러오는 중입니다...</p>
      </div>
    }>
      <CategoryContentInner rawCategory={rawCategory} />
    </Suspense>
  );
}