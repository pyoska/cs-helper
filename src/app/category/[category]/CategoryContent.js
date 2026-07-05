"use client";

import { useState, useEffect, useMemo, Suspense, Fragment } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Lucide-React 아이콘 임포트: 성능 및 가독성을 고려한 선별적 사용
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
  Wrench,
  Sparkles,
  ArrowRight
} from "lucide-react";

// 데이터 및 컴포넌트 임포트
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * 1. 전역 상수 정의
 */
const ITEMS_PER_PAGE = 12;

// 카테고리별 아이콘 및 표시 이름 매핑 (가전 카테고리는 AS 전문성을 위해 Wrench 아이콘 적용)
const CATEGORY_MAP = {
  "카드": { name: "카드/금융", icon: CreditCard },
  "은행": { name: "은행/저축", icon: Building2 },
  "통신": { name: "통신/인터넷", icon: Smartphone },
  "가전": { name: "가전/AS", icon: Wrench },
  "보험": { name: "보험/상조", icon: ShieldCheck },
  "배달·쇼핑": { name: "배달/쇼핑", icon: ShoppingBag },
  "항공·여행": { name: "항공/여행", icon: Plane },
  "IT·플랫폼": { name: "IT/플랫폼", icon: Laptop },
  "자동차": { name: "자동차", icon: Car },
  "증권": { name: "증권사", icon: BarChart2 },
  "기타": { name: "기타", icon: HelpCircle }
};

/**
 * 2. 유틸리티 함수 (Source Context 기반 데이터 가공)
 */

// 전화번호 정제: 괄호 내용 제거 후 숫자와 +, - 기호만 남김
const getDialablePhone = (phone) => {
  if (!phone) return "";
  // Source Context 지시사항: 괄호 및 포함된 문자열 우선 제거 후 숫자 관련 기호 추출
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

// URL 친화적 슬러그 생성: 중복 문구 제거 및 특수문자 처리
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터$/, "")
    .replace(/\s+고객센터\s+고객센터$/, "")
    .replace(/고객센터$/, "")
    .trim();

  // 특수문자 제거 및 공백을 하이픈으로 변환
  cleanName = cleanName.replace(/[/\: *?"<>|%,.*]/g, "");
  // 연속된 하이픈 방지 및 최종 슬러그 생성
  return cleanName.replace(/\s+/g, "-").replace(/-+/g, "-") + "-고객센터";
};

/**
 * 3. CategoryInner 컴포넌트 (핵심 로직부)
 * useSearchParams 사용으로 인한 Build Error 방지를 위해 Suspense 내부에서 실행됩니다.
 */
function CategoryInner({ rawCategory }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL 쿼리 파라미터에서 현재 페이지 추출 (기본값 1)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // 카테고리 디코딩 및 데이터 안전 처리
  const decodedCategory = useMemo(() => {
    try {
      return decodeURIComponent(rawCategory).trim();
    } catch (e) {
      return rawCategory;
    }
  }, [rawCategory]);

  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };
  const CategoryIcon = catDetail.icon;

  // 필터링: 공백 및 대소문자 오차 방지를 위한 정규화 필터링
  const filteredData = useMemo(() => {
    return customerData.filter((item) => 
      item.category?.trim() === decodedCategory
    );
  }, [decodedCategory]);

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /**
   * 4. SEO 및 동적 메타 데이터 최적화
   * useEffect를 통한 클라이언트 사이드 Head 주입 (Canonical, Prev, Next)
   */
  useEffect(() => {
    const head = document.head;
    const baseUrl = window.location.origin + window.location.pathname;

    const updateLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (tag) {
        if (href) {
          tag.setAttribute("href", href);
        } else {
          tag.remove();
        }
      } else if (href) {
        const newTag = document.createElement("link");
        newTag.rel = rel;
        newTag.href = href;
        head.appendChild(newTag);
      }
    };

    // Canonical 설정
    updateLinkTag("canonical", `${baseUrl}?page=${currentPage}`);

    // Prev/Next 관계 링크 설정
    updateLinkTag("prev", currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : null);
    updateLinkTag("next", currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : null);

    // Cleanup: 컴포넌트 언마운트 시 추가된 태그 관리 (선택 사항이나 아키텍처상 유지)
  }, [currentPage, totalPages, decodedCategory]);

  // 페이지 변경 시 스크롤 상단 이동 및 라우팅
  const handlePageChange = (pageNum) => {
    router.push(`?page=${pageNum}`, { scroll: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* 헤더 섹션: 카테고리 정보 표시 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-50 rounded-2xl shadow-sm">
            <CategoryIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {catDetail.name} 고객센터 안내
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              총 <span className="font-semibold text-blue-600">{filteredData.length}개</span>의 관련 채널이 검색되었습니다.
            </p>
          </div>
        </div>

        {/* 리스트 그리드: 모바일 1열 / 태블릿 2열 / 데스크탑 3열 반응형 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedData.map((item, index) => {
            const name = item?.name || "정보 없음";
            const hours = item?.hours || "";
            const is24h = hours.includes("24시간") || name.includes("분실") || name.includes("사고");
            const slug = getSlug(name);
            const dialablePhone = getDialablePhone(item?.phone);

            return (
              <div key={`${name}-${index}`} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {name}
                  </h2>
                  {is24h && (
                    <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3 h-3" /> 24H
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </div>
                    <a href={`tel:${dialablePhone}`} className="text-sm font-bold tracking-wider hover:text-blue-600">
                      {item?.phone || "번호 정보 없음"}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600 gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-sm font-medium">{hours || "운영시간 미정"}</span>
                  </div>
                </div>

                <Link 
                  href={`/customer-service/${slug}`}
                  className="w-full py-3.5 bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  상세 정보 확인 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션: 접근성 및 클릭 편의성 고려 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-11 h-11 rounded-xl font-bold transition-all duration-200 ${
                  currentPage === num
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110"
                    : "bg-white text-gray-400 hover:bg-gray-100 border border-gray-100"
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
 * 5. 메인 엔트리 포인트 (Suspense Boundary)
 * Next.js SSR 환경에서 클라이언트 훅의 안전한 실행을 보장합니다.
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse">고객센터 정보를 불러오고 있습니다...</p>
        </div>
      </div>
    }>
      <CategoryInner rawCategory={rawCategory} />
    </Suspense>
  );
}