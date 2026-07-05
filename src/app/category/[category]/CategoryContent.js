"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  AlertCircle
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 12;

// 카테고리 정의 및 아이콘 매핑
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

const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

const getSlug = (name) => {
  let cleanName = name.trim().replace(/\s+고객센터$/, "").replace(/\s+고객센터\s+고객센터$/, "").replace(/고객센터$/, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

export default function CategoryContent({ rawCategory }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // URL에서 page 파라미터 읽어오기
  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      const pageVal = p.get("page") || "1";
      const pageNum = parseInt(pageVal, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }
  }, []);

  // 실시간 필터링
  const filteredData = useMemo(() => {
    return customerData.map((item, index) => ({ item, index })).filter(({ item }) => {
      return item.category === rawCategory;
    });
  }, [rawCategory]);

  // 총 페이지 수
  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredData.length / ITEMS_PER_PAGE), 1);
  }, [filteredData]);

  // 페이지 이동 처리
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    router.push(`/category/${encodeURIComponent(rawCategory)}?page=${pageNum}`);
    const portal = document.getElementById("category-title-section");
    if (portal) {
      portal.scrollIntoView({ behavior: "smooth" });
    }
  };

  // canonical 및 prev/next 동적 헤드 태그 주입
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.title = `CS 고객센터 도우미 - ${rawCategory} 카테고리 정보 (${currentPage}페이지)`;

    const oldTags = document.head.querySelectorAll('link[rel="canonical"], link[rel="prev"], link[rel="next"]');
    oldTags.forEach(el => el.remove());

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `https://cshelper.kr/category/${encodeURIComponent(rawCategory)}?page=${currentPage}`;
    document.head.appendChild(canonical);

    if (currentPage > 1) {
      const prev = document.createElement("link");
      prev.rel = "prev";
      prev.href = `https://cshelper.kr/category/${encodeURIComponent(rawCategory)}?page=${currentPage - 1}`;
      document.head.appendChild(prev);
    }

    if (currentPage < totalPages) {
      const next = document.createElement("link");
      next.rel = "next";
      next.href = `https://cshelper.kr/category/${encodeURIComponent(rawCategory)}?page=${currentPage + 1}`;
      document.head.appendChild(next);
    }
  }, [currentPage, totalPages, rawCategory]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const catDetail = CATEGORY_MAP[rawCategory] || { name: rawCategory, icon: HelpCircle };
  const IconComp = catDetail.icon;

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
        
        {/* 상단 헤더 배너 */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center space-y-4">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <IconComp className="w-8 h-8" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {catDetail.name} 고객센터 안내
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-lg">
              검증된 대표 전화번호와 ARS 상담사 단축 치트키 정보를 한곳에서 만나보세요.
            </p>
          </div>
        </section>

        {/* 전문가 꿀팁 상단 칼럼 */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-5 md:p-6 shadow-3xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm md:text-base font-extrabold text-slate-900">
              [CS고객센터 도우미 꿀팁] {catDetail.name} 분야 고객지원 가이드
            </h3>
          </div>
          <p className="text-xs text-slate-655 leading-relaxed">
            제가 직접 {catDetail.name} 카테고리에 속한 브랜드 콜센터들을 점검해 본 결과, 타사 대비 대표번호 통화량이 항상 집중되어 유선 요금 및 연결 대기 시간이 크게 소모되는 편입니다. 아래 목록에서 원하는 카드의 <strong>대표 치트키 보기</strong> 버튼을 눌러 상세한 1인칭 해결 팁을 습득하시는 것을 권장합니다.
          </p>
        </section>

        {/* 결과 타이틀 구역 */}
        <div id="category-title-section" className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-900">
              분류: {catDetail.name} ({currentPage}페이지)
            </h2>
            <span className="text-xs text-slate-500 font-bold block mt-1">
              총 <strong className="text-[#0055FF]">{filteredData.length}</strong>개 매칭완료
            </span>
          </div>
          <Link href="/" className="text-xs text-blue-650 hover:underline font-extrabold">
            전체 카테고리 보기
          </Link>
        </div>

        {/* 그리드 데이터 */}
        <section>
          {paginatedData.length > 0 ? (
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
                        {/* 카드 상단 배지 */}
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

                        {/* 제목 */}
                        <div className="mb-4">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-black text-slate-900 group-hover:text-[#0055FF] transition-colors truncate">
                              {item.name}
                            </h3>
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
                            <ArrowRight className="w-3.5 h-3.5" />
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
              <h3 className="text-base font-bold text-slate-800 mb-2">카테고리 결과가 존재하지 않습니다</h3>
              <Link
                href="/"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors inline-block"
              >
                메인 포털로 가기
              </Link>
            </div>
          )}
        </section>



      </main>

      <Footer />
    </div>
  );
}
