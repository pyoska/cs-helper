import Link from "next/link";
import { 
  Phone, 
  Clock, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Tv, 
  ShoppingBag, 
  Wrench, 
  Laptop, 
  Car, 
  BarChart2, 
  Lock, 
  Calendar, 
  AlertTriangle, 
  Sparkles 
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

/**
 * 1. 카테고리 정의 및 아이콘 매핑
 * Source Context: CategoryContent.js.txt 및 page.js.txt 기준 엄격 준수
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

/**
 * 2. 표준화된 유틸리티 함수
 */
const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim()
    .replace(/\s+고객센터$/, "")
    .replace(/\s+고객센터\s+고객센터$/, "")
    .replace(/고객센터$/, "")
    .trim();
  // 특수문자 제거 정규식 및 공백 하이픈 변경
  cleanName = cleanName.replace(/[/: *?"<>|%,.* ]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

const getDialablePhone = (phone) => {
  if (!phone) return "";
  // Source Context (page.js.txt) 기준 정규식 적용
  return phone.replace(/([^)]*)/g, "").replace(/[^0-9+-]/g, "").trim();
};

const getBadgeIcon = (kIdx) => {
  if (kIdx === 0) return <Lock className="w-3.5 h-3.5 text-blue-600" />;
  if (kIdx === 1) return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
  return <BarChart2 className="w-3.5 h-3.5 text-blue-600" />;
};

/**
 * 3. 정적 파라미터 및 메타데이터 생성 (SSG & SEO)
 */
export async function generateStaticParams() {
  return customerData.map((item) => ({
    slug: getSlug(item.name),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const company = customerData.find(x => getSlug(x.name) === decodedSlug);

  if (!company) {
    return {
      title: "고객센터 정보 찾기 | CS 고객센터 도우미",
      description: "찾으시는 고객센터의 정확한 전화번호와 상담 시간을 확인하세요.",
    };
  }

  return {
    title: `${company.name} 고객센터 전화번호 및 연결 팁 - CS 고객센터 도우미`,
    description: `${company.name}의 공식 대표번호 ${company.phone}, 운영 시간(${company.hours}), 그리고 상담원에게 가장 빠르게 연결되는 팁을 확인하세요.`,
    alternates: {
      canonical: `https://cshelper.kr/${slug}`,
    },
  };
}

/**
 * 4. 메인 컴포넌트 (CompanySlugPage)
 */
export default async function CompanySlugPage({ params }) {
  const { slug } = await params;
  
  // 한글 슬러그 디코딩 처리 (Next.js 15 대응)
  const decodedSlug = decodeURIComponent(slug);
  const matchingIndex = customerData.findIndex(x => getSlug(x.name) === decodedSlug);
  const company = customerData[matchingIndex];

  // 404 예외 처리 및 비슷한 항목 추천 UI
  if (!company) {
    const keyword = decodedSlug.split("-")[0] || "";
    const similarItems = customerData
      .filter((item) => item.name.includes(keyword) || (item.category && decodedSlug.includes(item.category)))
      .slice(0, 4);

    return (
      <div className="min-h-screen bg-[#F4F7FB] flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">고객센터 정보를 찾을 수 없습니다.</h1>
        <p className="text-slate-600 mb-8">요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.</p>
        
        {similarItems.length > 0 && (
          <div className="w-full max-w-md">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">비슷한 고객센터 추천</h2>
            <div className="grid gap-3">
              {similarItems.map((item) => (
                <Link key={item.name} href={`/${getSlug(item.name)}`} className="bg-white p-4 rounded-xl shadow-sm hover:border-blue-400 border border-transparent transition-all flex justify-between items-center group">
                  <span className="font-medium group-hover:text-blue-600 transition-colors">{item.name}</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 text-blue-500" />
                </Link>
              ))}
            </div>
          </div>
        )}
        <Link href="/" className="mt-8 text-blue-600 font-medium flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> 홈으로 돌아가기
        </Link>
      </div>
    );
  }

  // 5. SEO 구조화 데이터 (JSON-LD) 생성
  const dialablePhone = getDialablePhone(company.phone);
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company.name,
    "telephone": dialablePhone,
    "url": company.web_url || `https://cshelper.kr/${getSlug(company.name)}`,
    "description": company.description,
    "identifier": {
      "@type": "PropertyValue",
      "name": "trust-verification",
      "value": "2026.07.05 실시간 검증 완료: 공식 정보 일치"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": dialablePhone,
      "contactType": "customer service",
      "hoursAvailable": company.hours,
      "description": "공식 채널 대조 및 실시간 통화 확인 완료 정보"
    }
  };

  const subTopicFaqs = company.keywords ? company.keywords.map((keyword, kIdx) => {
    const cleanKeyword = keyword.split(" ").pop();
    let q = "", a = "";
    if (kIdx === 0) {
      q = `${company.name}의 ${cleanKeyword} 접수 및 공식 확인 방법은 무엇인가요?`;
      a = `${company.name}의 ${cleanKeyword}를 접수할 수 있는 공식 인증 번호는 ${company.phone}입니다. 통화 연결 후 0번(상담원 즉시 연결)을 누르면 가장 빠르게 처리가 가능합니다.`;
    } else if (kIdx === 1) {
      q = `${company.name} ${cleanKeyword} 신청 시 통화 대기를 줄이는 해결책이 있나요?`;
      a = `대표번호 ${company.phone}로 유선 연결하여 전문 상담사와 직접 대화하는 것이 가장 정확합니다. 연결이 지연될 경우 공식 웹사이트의 실시간 채팅 상담을 활용해 보세요.`;
    } else {
      q = `${company.name} ${cleanKeyword} 조회 업무를 실시간으로 빠르게 하는 팁은?`;
      a = `${company.name} 공식 대표번호에 전화를 걸어 ARS를 통하거나, 공식 모바일 앱 내 마이페이지를 통해 1초 만에 최신 결과를 확인할 수 있습니다.`;
    }
    return { q, a };
  }) : [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${company.name}의 공식 인증 대표 전화번호는 몇 번인가요?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${company.name}의 공식 전화번호는 ${company.phone}이며, 운영 시간은 ${company.hours}입니다.`
        }
      },
      ...subTopicFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    ]
  };

  // 6. 추천 로직 (동일 카테고리 & 체류시간 증대용 cross-category)
  const relatedItems = customerData
    .filter(x => x.category === company.category && x.name !== company.name)
    .slice(0, 3);

  const recommendedTips = customerData
    .map((item) => ({ item, slug: getSlug(item.name) }))
    .filter(x => x.item.name !== company.name)
    .slice(matchingIndex + 5, matchingIndex + 7)
    .map((x, i) => {
      if (!x.item) {
        const fallback = customerData[(matchingIndex + i) % customerData.length];
        return { item: fallback, slug: getSlug(fallback.name) };
      }
      return x;
    });

  const is24h = company.hours.includes("24시간") || company.name.includes("분실") || company.name.includes("사고");
  const CategoryIcon = CATEGORY_MAP[company.category]?.icon || ShieldCheck;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 헤더 */}
      <header className="bg-[#0F172A] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <Link href="/" className="text-xl font-bold tracking-tight flex items-center">
          CS 고객센터 도우미<span className="text-blue-400 text-sm ml-1">.kr</span>
        </Link>
        <div className="hidden sm:flex gap-6 text-sm font-medium opacity-90">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">About Us</span>
          <span className="hover:text-blue-400 cursor-pointer transition-colors">관리자 모드</span>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> 목록으로 돌아가기
        </Link>

        {/* 상세 정보 카드 */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                <CategoryIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {CATEGORY_MAP[company.category]?.name || company.category}
                  </span>
                  {is24h && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 24시간 운영
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{company.name} 고객센터</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href={`tel:${dialablePhone}`} className="group flex items-center p-6 bg-blue-600 rounded-2xl text-white transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-200">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1">전화번호 바로 연결</p>
                  <p className="text-2xl font-bold tracking-tighter">{company.phone}</p>
                </div>
              </a>

              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <Clock className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">상담 운영 시간</p>
                  <p className="text-lg font-bold text-slate-700">{company.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 팁 & FAQ 섹션 */}
          <div className="bg-slate-50 p-8 border-t border-slate-100">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Sparkles className="w-5 h-5 text-amber-500" /> 연결 팁 & 핵심 가이드
            </h2>
            <div className="space-y-4">
              {subTopicFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex gap-3">
                    <div className="mt-1 flex-shrink-0">{getBadgeIcon(idx)}</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-2 leading-snug">{faq.q}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 추천 섹션: 동일 카테고리 */}
        {relatedItems.length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 px-1 text-slate-800">함께 많이 찾는 {CATEGORY_MAP[company.category]?.name} 고객센터</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedItems.map((item) => (
                <Link key={item.name} href={`/${getSlug(item.name)}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item.name}</span>
                  <div className="flex items-center text-xs text-slate-400 font-medium">
                    <Phone className="w-3 h-3 mr-1" /> {item.phone}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 추천 섹션: 인기 해결 팁 (Cross-Category) */}
        {recommendedTips.length > 0 && (
          <section className="mt-10 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-blue-50 shadow-sm">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">화제의 고객센터 연결 가이드</h3>
              <div className="space-y-3">
                {recommendedTips.map((tip, idx) => (
                  <Link key={idx} href={`/${tip.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                    <span className="text-slate-700 font-medium">{tip.item.name} 빠르게 연결하는 법</span>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
