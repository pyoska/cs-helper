"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Search, Phone, Clock, ArrowRight, ChevronLeft, ChevronRight,
  CreditCard, Building2, Smartphone, Tv, ShieldCheck, 
  ShoppingBag, Wrench, BarChart2
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * CATEGORY_MAP: page.js.txt 소스 컨텍스트의 아이콘 정의를 엄격히 준수
 * IT·플랫폼=Smartphone, 자동차=Wrench, 항공·여행=Wrench, 기타=ShieldCheck 매핑 확인
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
 * getSlug: 상세 페이지(app/[slug]/page.js)와의 정합성을 위해 
 * page.js.txt의 정규식 및 공백 처리를 캐릭터 단위로 완벽 복제
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
 * getDialablePhone: tel: 링크용 숫자 및 하이픈 추출 (page.js.txt 로직 준수)
 */
const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/([^)]*)/g, "").replace(/[^0-9+-]/g, "").trim();
};

/**
 * CategoryList: 핵심 비즈니스 로직 및 UI 렌더링
 */
function CategoryList({ rawCategory }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchTerm, setSearchTerm] = useState("");

  // URL 파라미터 한글 깨짐 방지를 위한 디코딩
  const decodedCategory = useMemo(() => {
    try {
      return decodeURIComponent(rawCategory).trim();
    } catch (e) {
      return rawCategory;
    }
  }, [rawCategory]);

  // 카테고리 필터링 및 검색어 매칭 로직
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
   * SEO 최적화: Canonical, Prev, Next 태그 동적 주입 및 중복 방지 Cleanup
   */
  useEffect(() => {
    const baseUrl = "https://cshelper.kr";
    const currentPath = `/category/${rawCategory}`;
    const head = document.head;

    // 기존 태그 삭제 (Cleanup)
    const removeExistingTags = () => {
      const selectors = ['link[rel="canonical"]', 'link[rel="prev"]', 'link[rel="next"]'];
      selectors.forEach(selector => {
        head.querySelectorAll(selector).forEach(el => el.remove());
      });
    };

    const createTag = (rel, href) => {
      const tag = document.createElement("link");
      tag.rel = rel;
      tag.href = href;
      head.appendChild(tag);
    };

    removeExistingTags();
    createTag("canonical", `${baseUrl}${currentPath}?page=${currentPage}`);
    if (currentPage > 1) createTag("prev", `${baseUrl}${currentPath}?page=${currentPage - 1}`);
    if (currentPage < totalPages) createTag("next", `${baseUrl}${currentPath}?page=${currentPage + 1}`);

    return () => removeExistingTags();
  }, [currentPage, totalPages, rawCategory]);

  const catInfo = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: ShieldCheck };
  const CategoryIcon = catInfo.icon;

  const handlePageChange = (page) => {
    router.push(`/category/${rawCategory}?page=${page}`, { scroll: true });
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans">
      {/* 상단 네비게이션 (SOURCE_IMAGE_3 준수) */}
      <header className="bg-[#0F172A] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center">
          CS 고객센터 도우미<span className="text-blue-400 text-sm ml-1">.kr</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium opacity-90">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">About Us</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">관리자 모드</span>
        </div>
      </header>

      {/* 히어로 및 검색 영역 (SOURCE_IMAGE_2 디자인 반영) */}
      <section className="bg-[#0F172A] pt-12 pb-20 px-4 text-center">
        <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-4">
          <CategoryIcon className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-8">{catInfo.name} 고객센터</h1>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`${catInfo.name} 관련 서비스나 키워드를 입력하세요`}
              className="w-full pl-14 pr-32 py-4 rounded-full bg-white text-slate-900 focus:outline-none shadow-xl text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
          </form>
        </div>
      </section>

      {/* 결과 요약 및 리스트 (SOURCE_IMAGE_2 기준) */}
      <main className="max-w-6xl mx-auto w-full px-4 -mt-10 mb-20 flex-grow">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-6 flex justify-between items-center">
          <p className="text-slate-600 text-sm">
            <span className="text-blue-600 font-bold">'{catInfo.name}'</span> 분야 검색결과 <span className="font-bold">{filteredData.length}</span>곳
          </p>
          <span className="text-xs text-slate-400 hidden sm:block">이름을 입력하거나 전화번호를 누르면 바로 전화가 걸립니다.</span>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedData.map((item, idx) => {
            const slug = getSlug(item.name);
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <Link href={`/${slug}`}>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{item.hours || "정보 없음"}</span>
                    </div>
                    <a 
                      href={`tel:${getDialablePhone(item.phone)}`}
                      className="flex items-center text-xl font-extrabold text-blue-600 hover:underline"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {item.phone}
                    </a>
                  </div>
                </div>

                <Link 
                  href={`/${slug}`}
                  className="w-full flex justify-center items-center py-3 bg-slate-50 rounded-xl text-slate-600 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"
                >
                  전화번호·상담원 연결 팁 보기
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  currentPage === i + 1 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors"
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
 * CategoryContent Main: Vercel 배포 시 useSearchParams 오류 방지를 위해 Suspense 적용
 */
export default function CategoryContent({ rawCategory }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">데이터를 구성하고 있습니다...</p>
        </div>
      </div>
    }>
      <CategoryList rawCategory={rawCategory} />
    </Suspense>
  );
}
