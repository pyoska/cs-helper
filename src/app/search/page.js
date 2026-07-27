"use client";

import { Suspense, useState, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  ChevronDown,
  ChevronUp,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 12;

const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*+]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const currentPage = useMemo(() => {
    const pageVal = searchParams.get("page") || "1";
    const pageNum = parseInt(pageVal, 10);
    return (!isNaN(pageNum) && pageNum > 0) ? pageNum : 1;
  }, [searchParams]);

  const [inputValue, setInputValue] = useState(searchQuery);

  // Sync input value when searchQuery changes (e.g. browser navigation)
  useEffect(() => {
    setTimeout(() => {
      setInputValue(searchQuery);
    }, 0);
  }, [searchQuery]);

  // 검색 전송 핸들러
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputValue.trim()) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("cshelper_search_query", inputValue.trim());
      }
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}&page=1`, { scroll: false });
    }
  };

  // 실시간 필터링
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    return customerData.map((item, index) => ({ item, index })).filter(({ item }) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.phone.includes(query) ||
        (item.experienceTip && item.experienceTip.toLowerCase().includes(query)) ||
        (item.hours && item.hours.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredData.length / ITEMS_PER_PAGE), 1);
  }, [filteredData]);

  // 페이지 이동 처리
  const handlePageChange = (pageNum) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}`);
    const portal = document.getElementById("search-title-section");
    if (portal) {
      portal.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 현재 슬라이스 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      
      {/* 1. 브랜드 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
              CS 고객센터 도우미<span className="text-blue-400 font-semibold text-sm">.kr</span>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/about" className="hover:text-blue-400">About Us</Link>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        
        {/* 상단 검색 폼 (2단계 검색 결과 페이지의 검색창 유지) */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto relative z-10 space-y-6">
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">
              CS 고객센터 통합 검색결과
            </h1>
            <form onSubmit={handleSearchSubmit} className="relative shadow-xl rounded-full border border-slate-200 bg-white group max-w-2xl mx-auto p-1.5 flex items-center">
              <div className="pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-slate-455 group-focus-within:text-[#0055FF] transition-colors" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="삼성카드 고객센터 또는 #분실신고를 검색해보세요"
                className="block w-full pl-6 pr-14 py-4 bg-transparent border-0 rounded-full text-base text-[#333333] focus:outline-none placeholder-slate-400 font-bold"
                aria-label="검색 키워드 재입력창"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="pr-4 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5 bg-slate-100 rounded-full p-0.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#0055FF] hover:bg-blue-700 text-white font-extrabold px-6 py-3.5 rounded-full text-xs md:text-sm shrink-0 cursor-pointer transition-all mr-1"
              >
                검색
              </button>
            </form>
          </div>
        </section>

        {/* E-E-A-T 전문가 팁 상단 칼럼 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-5 md:p-6 shadow-3xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm md:text-base font-extrabold text-slate-900">
              [CS고객센터 도우미 꿀팁] 검색 결과 활용 전문가 조언
            </h3>
          </div>
          <p className="text-xs text-slate-650 leading-relaxed">
            제가 실제 유선 검증을 해 보니 검색창에 기업명(예: &apos;삼성카드&apos;) 혹은 업무 키워드(예: &apos;#분실신고&apos;)를 입력하면, 각 부서별 직통 ARS 대기줄을 스킵할 수 있는 고유 단축번호 경로가 나타납니다. 3초 이내에 빠르게 연결을 원하는 상담 부서를 선택해 상세 보기 가이드를 활용해 보시기 바랍니다.
          </p>
        </section>

        {/* 결과 내역 타이틀 */}
        <div id="search-title-section" className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              &apos;{searchQuery}&apos; 검색 결과 리스트
            </h2>
            <span className="text-xs text-slate-500 font-bold block mt-1">
              총 <strong className="text-[#0055FF]">{filteredData.length}</strong>개 부서 매칭
            </span>
          </div>
          <Link href="/" className="text-xs text-blue-650 hover:underline font-extrabold">
            메인 대시보드로 돌아가기
          </Link>
        </div>

        {/* 검색 결과 리스트 그리드 */}
        <section>
          {filteredData.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map(({ item, index }) => {
                  const is24h = item.hours.includes("24시간") || item.name.includes("분실") || item.name.includes("사고");
                  const slug = getSlug(item.name);
                  return (
                    <Fragment key={item.id || index}>
                      <div
                        className="bg-white border border-slate-150 rounded-3xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-[#0055FF]/40 transition-all flex flex-col justify-between group"
                      >
                        {/* 카드 상단 헤더 */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-slate-700 bg-slate-105 px-2.5 py-1 rounded-full border border-slate-200">
                            {item.category}
                          </span>
                          <span className={`text-2xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            is24h ? "bg-red-50 text-red-655 border border-red-100" : "bg-emerald-50 text-emerald-650 border border-emerald-100"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${is24h ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
                            {is24h ? "24시간 운영" : "연결 원활"}
                          </span>
                        </div>

                        {/* 이름 */}
                        <div className="mb-4">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-black text-slate-900 group-hover:text-[#0055FF] transition-colors truncate">
                              {item.name}
                            </h3>
                            {item.isVerified && (
                              <span className="inline-flex items-center text-3xs font-extrabold text-blue-600 bg-blue-50 border border-blue-150 px-1 py-0.5 rounded-md shrink-0">
                                공식
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
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
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-350 mx-auto mb-4" />
              <h3 className="text-base font-bold text-slate-800 mb-2">검색어와 관련된 결과가 없습니다</h3>
              <p className="text-xs text-slate-400 mb-6">
                입력하신 키워드를 간결화해 검색해보시거나 메인 대시보드를 활용해 보시기 바랍니다.
              </p>
              <Link
                href="/"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors inline-block"
              >
                메인 포털로 돌아가기
              </Link>
            </div>
          )}
        </section>



      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">로딩 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}
