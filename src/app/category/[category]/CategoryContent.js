"use client";

import { useState, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Phone, Clock, CreditCard, Building2, Smartphone, ShieldCheck, HelpCircle,
  ShoppingBag, Plane, Laptop, Car, BarChart2, Tv, BadgeCheck, Wrench, Sparkles, 
  ArrowRight, AlertCircle
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 12;

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

const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/\s+고객센터$/, "").replace(/고객센터$/, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

export default function CategoryContent({ rawCategory }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const decodedCategory = useMemo(() => decodeURIComponent(rawCategory).trim(), [rawCategory]);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const pageVal = p.get("page") || "1";
    const pageNum = parseInt(pageVal, 10);
    if (!isNaN(pageNum) && pageNum > 0) setCurrentPage(pageNum);
  }, []);

  const filteredData = useMemo(() => {
    return customerData.filter((item) => (item.category || "").trim() === decodedCategory);
  }, [decodedCategory]);

  const totalPages = useMemo(() => Math.max(Math.ceil(filteredData.length / ITEMS_PER_PAGE), 1), [filteredData]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    router.push(`/category/${rawCategory}?page=${pageNum}`);
    const portal = document.getElementById("category-title-section");
    if (portal) portal.scrollIntoView({ behavior: "smooth" });
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `CS 고객센터 도우미 - ${decodedCategory} (${currentPage}페이지)`;
    }
  }, [currentPage, decodedCategory]);

  const catDetail = CATEGORY_MAP[decodedCategory] || { name: decodedCategory, icon: HelpCircle };
  const IconComp = catDetail.icon;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-white">CS 고객센터 도우미</Link>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        <section className="bg-slate-900 rounded-3xl p-12 text-center text-white">
          <IconComp className="w-12 h-12 mx-auto mb-4 text-blue-400" />
          <h1 className="text-3xl font-black">{catDetail.name} 고객센터 안내</h1>
        </section>

        <section id="category-title-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black">분류: {catDetail.name}</h2>
            <span className="text-xs font-bold text-slate-500">총 {filteredData.length}개</span>
          </div>

          {paginatedData.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedData.map((item, index) => {
                  const is24h = (item?.hours || "").includes("24시간") || (item?.name || "").includes("분실");
                  const slug = getSlug(item.name);
                  return (
                    <div key={item.id || index} className="bg-white border p-6 rounded-3xl shadow-sm">
                      <div className="font-bold text-sm mb-2">{item.category}</div>
                      <h3 className="text-base font-black mb-2">{item.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">{item.description}</p>
                      <Link href={`/${slug}`} className="block w-full bg-[#0055FF] text-white py-3 rounded-xl font-extrabold text-center">
                        상담원 연결 바로가기
                      </Link>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-8">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>이전</button>
                  <span>{currentPage} / {totalPages}</span>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>다음</button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-16">결과가 없습니다.</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}