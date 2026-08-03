"use client";

import Link from "next/link";
import { 
  HelpCircle, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Tv, 
  ShieldCheck, 
  ShoppingBag, 
  Plane, 
  Laptop, 
  Car, 
  BarChart2 
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "전체", icon: HelpCircle, href: "/" },
  { id: "카드", name: "카드/금융", icon: CreditCard, href: "/category/카드" },
  { id: "은행", name: "은행/저축", icon: Building2, href: "/category/은행" },
  { id: "통신", name: "통신/인터넷", icon: Smartphone, href: "/category/통신" },
  { id: "가전", name: "가전/AS", icon: Tv, href: "/category/가전" },
  { id: "보험", name: "보험/상조", icon: ShieldCheck, href: "/category/보험" },
  { id: "배달·쇼핑", name: "배달/쇼핑", icon: ShoppingBag, href: "/category/배달·쇼핑" },
  { id: "항공·여행", name: "항공/여행", icon: Plane, href: "/category/항공·여행" },
  { id: "IT·플랫폼", name: "IT/플랫폼", icon: Laptop, href: "/category/IT·플랫폼" },
  { id: "자동차", name: "자동차", icon: Car, href: "/category/자동차" },
  { id: "증권", name: "증권사", icon: BarChart2, href: "/category/증권" },
];

export default function HomeCategoryFilter({ activeCategory = "all" }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
        카테고리별 검색 필터
      </h2>
      <div className="flex flex-wrap gap-2 pt-1">
        {CATEGORIES.map((cat) => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0055FF] border-[#0055FF] text-white shadow-md shadow-blue-500/20"
                  : "bg-white border-slate-200 text-slate-650 hover:border-[#0055FF] hover:bg-blue-50/10"
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
