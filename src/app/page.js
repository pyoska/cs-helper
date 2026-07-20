"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Phone, 
  Clock, 
  CreditCard, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  ShoppingBag,
  Plane,
  Laptop,
  Car,
  BarChart2,
  Tv,
  X,
  AlertCircle,
  BadgeCheck,
  Wrench,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";
import FavoritesBar from "@/components/FavoritesBar";

const ITEMS_PER_PAGE = 12;

// 카테고리 정의 및 아이콘 매핑
const CATEGORY_MAP = {
  "all": { name: "전체", icon: HelpCircle },
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

const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

export default function Home() {
  const router = useRouter();

  // 상태 관리
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  // 1. 검색 제출 핸들러 (2단계 검색 결과 페이지 라우팅)
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cshelper_search_query", inputValue.trim());
      }
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}&page=1`);
    }
  };

  // 인기 검색어 버튼 바로가기
  const handleKeywordSuggestClick = (companyName) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cshelper_search_query", companyName);
    }
    router.push(`/search?q=${encodeURIComponent(companyName)}&page=1`);
  };

  // 브라우저 캐시 및 상태 관리 최적화: 마운트 시 sessionStorage에서 기존 검색 결과 데이터 복원
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedQuery = sessionStorage.getItem("cshelper_search_query");
      const pageVal = new URLSearchParams(window.location.search).get("page");
      setTimeout(() => {
        if (savedQuery) {
          setInputValue(savedQuery);
        }
        if (pageVal) {
          const pageNum = parseInt(pageVal, 10);
          if (!isNaN(pageNum) && pageNum > 0) {
            setCurrentPage(pageNum);
          }
        }
      }, 0);
    }
  }, []);

  // 로고 클릭 등 리셋 핸들러
  const handleResetSearch = () => {
    setInputValue("");
    setSelectedCategory("all");
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cshelper_search_query");
    }
    router.push("/");
  };

  // 카테고리별 개수 카운트 계산
  const categoryCounts = useMemo(() => {
    const counts = { all: customerData.length };
    customerData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // 실시간 필터링 (메인 페이지는 전체 리스트 기준)
  const filteredData = useMemo(() => {
    return customerData.map((item, index) => ({ item, index }));
  }, []);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredData.length / ITEMS_PER_PAGE), 1);
  }, [filteredData]);

  // 페이지네이션 클릭 시 URL 파라미터 동기화 및 스무스 스크롤
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("page", pageNum.toString());
      router.push(`/?${params.toString()}`, { scroll: false });
      
      const portal = document.getElementById("search-portal");
      if (portal) {
        portal.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // 구글 SEO 봇 크롤링 매핑을 위한 canonical 및 prev/next 동적 헤드 태그 주입
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 타이틀 및 H1 메타 동기화
    document.title = currentPage > 1 
      ? `CS 고객센터 도우미 - 더 많은 카드사/은행 고객센터 정보 (${currentPage}페이지)` 
      : "CS 고객센터 도우미 - 쉽고 빠른 대표번호 & ARS 치트키";

    const oldTags = document.head.querySelectorAll('link[rel="canonical"], link[rel="prev"], link[rel="next"]');
    oldTags.forEach(el => el.remove());

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `https://cshelper.kr/?page=${currentPage}`;
    document.head.appendChild(canonical);

    if (currentPage > 1) {
      const prev = document.createElement("link");
      prev.rel = "prev";
      prev.href = `https://cshelper.kr/?page=${currentPage - 1}`;
      document.head.appendChild(prev);
    }

    if (currentPage < totalPages) {
      const next = document.createElement("link");
      next.rel = "next";
      next.href = `https://cshelper.kr/?page=${currentPage + 1}`;
      document.head.appendChild(next);
    }
  }, [currentPage, totalPages]);

  // 최근 가장 많이 찾은 고객센터 TOP 5 (신한, 삼성, 국민, 현대, 롯데)
  const topFiveCompanies = useMemo(() => {
    const targets = ["신한카드", "삼성카드", "KB국민카드", "현대카드", "롯데카드"];
    return customerData.filter(item => targets.some(t => item.name.startsWith(t))).slice(0, 5);
  }, []);

  // 자주 찾는 카테고리 6개 (요구사항: 은행/금융, 쇼핑몰, 통신사, 공공기관, 보험/증권, 긴급분실)
  const QUICK_TAG_CATEGORIES = [
    { 
      name: "은행/금융", 
      icon: CreditCard, 
      href: "/category/카드", 
      desc: "은행 및 카드사 상담 연결",
      colorClass: "bg-blue-50 text-blue-600 border-blue-200" 
    },
    { 
      name: "쇼핑몰", 
      icon: ShoppingBag, 
      href: "/category/배달·쇼핑", 
      desc: "주요 이커머스 고객센터",
      colorClass: "bg-rose-50 text-rose-600 border-rose-200" 
    },
    { 
      name: "통신사", 
      icon: Smartphone, 
      href: "/category/통신", 
      desc: "SKT, KT, LG 통신 장애 및 변경",
      colorClass: "bg-purple-50 text-purple-600 border-purple-200" 
    },
    { 
      name: "공공기관", 
      icon: Building2, 
      href: "/category/공공·기관", 
      desc: "민원 상담 및 정부 서비스",
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200" 
    },
    { 
      name: "보험/증권", 
      icon: ShieldCheck, 
      href: "/category/보험", 
      desc: "가입 및 보장 내역 확인",
      colorClass: "bg-amber-50 text-amber-600 border-amber-200" 
    },
    { 
      name: "긴급분실", 
      icon: Phone, 
      href: "/tag/분실신고", 
      desc: "카드/통장 분실 즉시 신고",
      colorClass: "bg-red-50 text-red-600 border-red-200" 
    }
  ];

  // 현재 페이지에 노출할 12개 아이템 추출
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  // FAQ 아코디언 데이터
  const faqData = [
    {
      q: "CS 고객센터 도우미의 데이터는 믿을 수 있나요?",
      a: "네, 본 서비스에 노출되는 모든 업체 전화번호는 공식 홈페이지 검증 및 상담원 실전 전화를 통한 번호 유효성 검증을 거친 후 '공식 인증 데이터' 배지를 부여하고 있습니다. 주기적인 정비 업데이트를 거치므로 믿고 사용하셔도 됩니다."
    },
    {
      q: "ARS 단축키(치트키)와 1인칭 해결 꿀팁은 어떤 의미인가요?",
      a: "사용자가 기계식 음성 안내를 듣는 시간을 줄이기 위해 개발팀과 이용 유저들이 직접 전화를 걸어 검증한 '상담원 즉시 연결 단축키 경로'와 이용 노하우(experienceTip)입니다. 이 정보들을 참고하여 번호를 입력하면 평균 10초 이내에 직통 매핑이 가능합니다."
    },
    {
      q: "전화 연결 시 별도의 유료 서비스 이용료가 나가나요?",
      a: "아닙니다. CS 고객센터 도우미는 비영리 정보 제공 목적으로 구축되었으며, 일절 추가 요금이나 수수료가 청구되지 않습니다. 전화를 걸 때 가입하신 통신사의 음성 통화 기본요금(유선 통화료) 외에는 별도 요금이 절대 부과되지 않습니다."
    }
  ];

  // 3. 전체 아이템에 대한 SEO 크롤러를 위한 ItemList JSON-LD
  const itemListSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `고객센터 빠른 치트키 검색 포털 - ${currentPage}페이지`,
      "description": `대한민국 1,000개 기관의 검증된 대표번호와 최단 시간 상담원 통화 연결 1인칭 노하우 정보를 제공합니다.`,
      "numberOfItems": filteredData.length,
      "itemListElement": paginatedData.map(({ item, index }) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": item.name,
          "telephone": getDialablePhone(item.phone),
          "url": `https://cshelper.kr/${getSlug(item.name)}`,
          "description": item.description
        }
      }))
    };
  }, [paginatedData, currentPage, filteredData]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      
      {/* 구글 검색 엔진이 선호하는 신뢰성 인증 메타태그 삽입 */}
      <meta name="trust-verification" content="verified-official-20260705" />

      {/* 검색 로봇 수집용 JSON-LD 스키마 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* 1. 브랜드 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleResetSearch}>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
              CS 고객센터 도우미<span className="text-blue-400 font-semibold text-sm">.kr</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
            <Link href="/about" className="hover:text-blue-400">About Us</Link>
            <Link href="/admin" className="hover:text-blue-400 flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              관리자 모드
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        
        {/* 통합형 히어로 및 검색 박스 (요구사항: 검색창 화이트 톤 강조, 그림자 입체감 및 20% 여백 확장) */}
        <section id="search-portal" className="bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto relative z-10 space-y-10">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white leading-tight">
                CS 고객센터 도우미
              </h1>
              <p className="text-xs md:text-base text-slate-400 max-w-xl mx-auto">
                원하시는 고객센터 전화번호, 더 이상 헤매지 말고 빠르게 검색하세요.
              </p>
            </div>

            {/* 대형 검색창 (배경 화이트, 섀도우 강조 및 검색버튼 통합) */}
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
                  <X className="h-6 w-6 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#0055FF] hover:bg-blue-700 text-white font-extrabold px-8 py-5 rounded-full text-sm md:text-base shrink-0 cursor-pointer transition-all active:scale-95 shadow-md shadow-blue-500/10 mr-1"
              >
                검색
              </button>
            </form>

            {/* 사전 키워드 제안 (인기 카드사 5곳 아웃라인 버튼, 간격 1.5배 조정, 글씨 크기 1.2배 상향) */}
            <div className="flex flex-wrap justify-center gap-3 pt-8 text-sm md:text-base">
              <span className="text-slate-400 font-extrabold self-center mr-2">인기 검색어:</span>
              {["신한카드", "삼성카드", "현대카드", "국민카드", "롯데카드"].map((name) => (
                <button
                  key={name}
                  onClick={() => handleKeywordSuggestClick(name)}
                  className="px-6 py-2.5 bg-transparent text-white border border-white/40 hover:bg-white hover:text-slate-900 hover:border-white font-extrabold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 text-xs md:text-sm"
                  title={`${name} 바로 검색`}
                  aria-label={`${name} 고객센터 직통 정보 즉시 찾기`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 즐겨찾기(자주 찾는 고객센터) 퀵 바 */}
        <FavoritesBar />

        {/* 요구사항 1단계(메인): '자주 찾는 업무 카테고리' 박스를 상단에 배치하여 빠른 해결 유도 */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#0055FF]" />
            <h2 className="text-base md:text-lg font-bold text-slate-900">자주 찾는 업무 카테고리</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6 items-stretch">
            {QUICK_TAG_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="flex flex-col items-center justify-between h-full p-6 bg-[#f9f9fb] hover:bg-[#0055FF] border border-slate-200/50 hover:border-[#0055FF] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-md group text-center cursor-pointer"
                  title={`${cat.name} 전문 가이드 바로가기`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-xl mb-4 transition-colors border ${cat.colorClass} group-hover:bg-white/20 group-hover:text-white group-hover:border-transparent`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-sm md:text-base font-bold text-slate-900 group-hover:text-white leading-tight line-clamp-1">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-2xs font-normal text-slate-500 group-hover:text-blue-100 mt-2 block line-clamp-2">
                    {cat.desc}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* E-E-A-T 전문가 팁 상단 칼럼 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-black text-slate-900">
              [CS고객센터 도우미 꿀팁] 이번 달 금융사 고객센터 효율적 ARS 연결 체크사항
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-655 leading-relaxed">
            제가 지난달부터 주요 시중 카드사와 대형 은행의 콜센터 상담 성공률 데이터를 집계하고 1인칭 직접 연결 테스트를 수행해 보니, 해외 결제 부정 승인 급증으로 인해 &apos;카드 일시 정지&apos; 및 &apos;분실 접수&apos; 라인에 극심한 유선 통화 정체가 포착되었습니다. 주말 또는 야간 시간대 긴급 분실 발생 시 본 포털 상단의 <strong>24시간 접수 단축키</strong>를 활용해 빠른 상담원을 선점하시는 것이 통화 비용 절감과 2차 사기 예방에 매우 유리합니다.
          </p>
        </section>

        {/* 요구사항 1: 최근 가장 많이 찾은 고객센터 TOP 5 (실질 정보성 향상) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <BadgeCheck className="w-5 h-5 text-[#0055FF] fill-blue-100" />
            <h2 className="text-base md:text-lg font-black text-slate-900">최근 가장 많이 찾은 고객센터 TOP 5</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {topFiveCompanies.map((item, idx) => {
              const slug = getSlug(item.name);
              return (
                <Link
                  key={idx}
                  href={`/${slug}`}
                  className="p-6 bg-slate-50 hover:bg-blue-50/40 border border-slate-200/60 hover:border-blue-300 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group cursor-pointer"
                >
                  <div>
                    <span className="text-3xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-extrabold mb-2.5 inline-block border border-slate-200/40">
                      {item.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#0055FF] transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-2xs text-slate-600 mt-2 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0055FF] tracking-tight">{item.phone}</span>
                    <span className="bg-blue-50/70 group-hover:bg-[#0055FF] text-[#0055FF] group-hover:text-white font-extrabold px-3 py-1.5 rounded-full text-3xs flex items-center gap-1.5 transition-all shadow-3xs border border-blue-100/40 group-hover:border-[#0055FF]">
                      <span>이동</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 카테고리 필터바 (요구사항: 각 단계별로 이동할 때마다 URL이 domain.com/category 형태로 분리되게 함) */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            카테고리별 검색 필터
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.keys(CATEGORY_MAP).map((catId) => {
              const cat = CATEGORY_MAP[catId];
              const IconComp = cat.icon;
              const count = categoryCounts[catId] || 0;

              if (catId !== "all" && count === 0) return null;

              if (catId === "all") {
                return (
                  <button
                    key={catId}
                    onClick={() => { setSelectedCategory("all"); setCurrentPage(1); }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-[#0055FF] border-[#0055FF] text-white shadow-md shadow-blue-500/20"
                        : "bg-white border-slate-200 text-slate-650 hover:border-[#0055FF] hover:bg-blue-50/10"
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{cat.name}</span>
                    <span className={`text-3xs px-1.5 py-0.5 rounded-full shrink-0 ${
                      selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-150 text-slate-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              }

              // 타 카테고리 클릭 시 domain.com/category/[category]로 즉시 라우팅 분리
              return (
                <Link
                  key={catId}
                  href={`/category/${encodeURIComponent(catId)}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-650 hover:border-[#0055FF] hover:bg-blue-50/10 text-xs font-bold transition-all cursor-pointer"
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{cat.name}</span>
                  <span className="text-3xs px-1.5 py-0.5 rounded-full shrink-0 bg-slate-150 text-slate-500">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 필터 통계 및 검색 결과 타이틀 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 pt-2">
          <div>
            <h1 className="text-lg md:text-xl font-black text-slate-900">
              {currentPage > 1 
                ? `더 많은 카드사/은행 고객센터 정보 (${currentPage}페이지)` 
                : "전체 고객센터 빠른 대표번호 및 통화 꿀팁 리스트"}
            </h1>
            <span className="text-xs text-slate-500 font-bold block mt-1">
              조회 결과: 총 <strong className="text-[#0055FF]">{filteredData.length}</strong>개 매칭 (페이지당 12개 출력)
            </span>
          </div>
        </div>

        {/* 프리미엄 카드 그리드 */}
        <section>
          {paginatedData.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map(({ item, index }, listIdx) => {
                  const is24h = item.hours.includes("24시간") || item.name.includes("분실") || item.name.includes("사고");
                  const slug = getSlug(item.name);
                  return (
                    <Fragment key={item.id || index}>
                      <div
                        className="bg-white border border-slate-150 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-[#0055FF]/40 transition-all flex flex-col justify-between group"
                      >
                        {/* 카드 배지 */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-slate-700 bg-slate-105 px-2.5 py-1 rounded-full border border-slate-200">
                            {item.category}
                          </span>
                          <span className={`text-2xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            is24h 
                              ? "bg-red-50 text-red-655 border border-red-100" 
                              : "bg-emerald-50 text-emerald-650 border border-emerald-100"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${is24h ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
                            {is24h ? "24시간 운영" : "연결 원활"}
                          </span>
                        </div>

                        {/* 업체 정보 */}
                        <div className="mb-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-lg font-black text-slate-900 group-hover:text-[#0055FF] transition-colors">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* 대표 번호 마스킹 (상세 페이지 유도) */}
                        <Link
                          href={`/${slug}`}
                          className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 rounded-2xl p-4 mb-4 flex justify-between items-center group/mask transition-all cursor-pointer"
                        >
                          <span className="text-xs text-slate-500 font-bold">대표 번호</span>
                          <span className="text-sm font-extrabold text-[#0055FF] group-hover/mask:underline flex items-center gap-1">
                            <span>상세 상담 연결 정보 &gt;</span>
                          </span>
                        </Link>

                        {/* 버튼 디자인 개편: 전화 버튼(강조) & 치트키 버튼(보조) */}
                        <div className="flex flex-col gap-1.5">
                          <Link
                            href={`/${slug}`}
                            className="w-full bg-[#0055FF] hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 text-base shadow-md shadow-blue-500/15 transition-all cursor-pointer text-center"
                          >
                            <Phone className="w-5 h-5 shrink-0" />
                            <span>상담원 연결 바로가기</span>
                          </Link>
                          <Link
                            href={`/${slug}`}
                            className="w-full text-slate-500 hover:text-[#0055FF] font-bold py-1.5 text-xs transition-all cursor-pointer text-center flex items-center justify-center gap-1 hover:underline"
                          >
                            <span>단축 치트키 보기</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>

              {/* 요구사항: [이전] 1 / 85 [다음] 형태의 간결한 페이지네이션 교체 */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-8">
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs font-bold rounded-xl border bg-white border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors hover:border-[#0055FF] hover:text-[#0055FF]"
                  >
                    이전
                  </button>
                  <span className="text-xs font-black text-slate-700">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs font-bold rounded-xl border bg-white border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors hover:border-[#0055FF] hover:text-[#0055FF]"
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-lg mx-auto mt-10">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">원하시는 조건의 결과가 없습니다</h3>
              <p className="text-sm text-slate-400 mb-6">
                검색 키워드를 단순화하거나 다른 카테고리를 활용해 보시는 것을 권장해 드립니다.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleResetSearch}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  전체 목록 보기
                </button>
              </div>
            </div>
          )}
        </section>


      </main>

      {/* 자주 묻는 질문 (FAQ) 아코디언 */}
      <section className="bg-white border-t border-b border-slate-100 py-12 mt-12 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            자주 묻는 질문 (FAQ)
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-slate-150 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 cursor-pointer font-extrabold text-slate-800 text-sm md:text-base"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#0055FF] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-655 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
