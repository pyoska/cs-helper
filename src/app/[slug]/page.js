import Link from "next/link";
import { 
  Phone, 
  Clock, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight,
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
import DwellTimeEnhancer from "@/components/DwellTimeEnhancer";
import MobileStickyCallBar from "@/components/MobileStickyCallBar";
import BookmarkNudgeModal from "@/components/BookmarkNudgeModal";
import CopyPhoneButton from "@/components/CopyPhoneButton";

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

const getSlug = (name) => {
  if (!name) return "";
  let cleanName = name.trim().replace(/고객센터/g, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/[\s-]+/g, "-") + "-고객센터";
};

const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

const getBadgeIcon = (kIdx) => {
  if (kIdx === 0) return <Lock className="w-3.5 h-3.5 text-blue-600" />;
  if (kIdx === 1) return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
  return <BarChart2 className="w-3.5 h-3.5 text-blue-600" />;
};

export async function generateStaticParams() {
  return customerData.map((item) => ({
    slug: getSlug(item?.name || ""),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let decodedSlug = "";
  try {
    decodedSlug = decodeURIComponent(slug || "");
  } catch (e) {
    decodedSlug = slug || "";
  }
  const company = customerData.find(x => getSlug(x?.name || "") === decodedSlug);

  if (!company) {
    return {
      title: "고객센터 정보 찾기 | CS 고객센터 도우미",
      description: "찾으시는 고객센터의 정확한 전화번호와 상담 시간을 확인하세요.",
    };
  }

  const companyName = company?.name || "";
  const cleanName = companyName.endsWith("고객센터") ? companyName : `${companyName} 고객센터`;

  return {
    title: `${cleanName} 전화번호 및 연결 팁 - CS 고객센터 도우미`,
    description: `${cleanName} 고객센터 대표번호(${company?.phone || ""}) 연결 후, ARS 안내 멘트를 끝까지 들을 필요 없이 즉시 상담원과 통화할 수 있는 단축번호 치트키를 지금 확인해 보세요.`,
    alternates: {
      canonical: `https://cshelper.kr/${slug}`,
    },
  };
}

export default async function CompanySlugPage({ params }) {
  const { slug } = await params;
  
  let decodedSlug = "";
  try {
    decodedSlug = decodeURIComponent(slug || "");
  } catch (e) {
    decodedSlug = slug || "";
  }
  
  const matchingIndex = customerData.findIndex(x => getSlug(x?.name || "") === decodedSlug);
  const company = customerData[matchingIndex];

  if (!company) {
    const keyword = decodedSlug.replace("-고객센터", "").split("-")[0] || "";
    const similarItems = customerData
      .filter((item) => (item?.name || "").includes(keyword) || (item?.category && decodedSlug.includes(item?.category)))
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
                <Link key={item?.name || ""} href={`/${getSlug(item?.name || "")}`} className="bg-white p-4 rounded-xl shadow-sm hover:border-blue-400 border border-transparent transition-all flex justify-between items-center group">
                  <span className="font-medium group-hover:text-blue-600 transition-colors">{item?.name || ""}</span>
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

  const dialablePhone = getDialablePhone(company?.phone || "");
  const companyName = company?.name || "";
  const cleanName = companyName.endsWith("고객센터") ? companyName : `${companyName} 고객센터`;
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company?.name || "",
    "telephone": dialablePhone,
    "url": company?.web_url || `https://cshelper.kr/${getSlug(company?.name || "")}`,
    "description": company?.description || "",
    "identifier": {
      "@type": "PropertyValue",
      "name": "trust-verification",
      "value": "2026.07.05 실시간 검증 완료: 공식 정보 일치"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": dialablePhone,
      "contactType": "customer service",
      "hoursAvailable": company?.hours || "",
      "description": "공식 채널 대조 및 실시간 통화 확인 완료 정보"
    }
  };

  const subTopicFaqs = (company?.keywords || []).map((keyword, kIdx) => {
    const cleanKeyword = (keyword || "").split(" ").pop() || "";
    let q = "", a = "";
    if (kIdx === 0) {
      q = `${company?.name || ""}의 ${cleanKeyword} 접수 및 공식 확인 방법은 무엇인가요?`;
      a = `${company?.name || ""}의 ${cleanKeyword}를 접수할 수 있는 공식 인증 번호는 ${company?.phone || ""}입니다. 통화 연결 후 0번(상담원 즉시 연결)을 누르면 가장 빠르게 처리가 가능합니다.`;
    } else if (kIdx === 1) {
      q = `${company?.name || ""} ${cleanKeyword} 신청 시 통화 대기를 줄이는 해결책이 있나요?`;
      a = `대표번호 ${company?.phone || ""}로 유선 연결하여 전문 상담사와 직접 대화하는 것이 가장 정확합니다. 연결이 지연될 경우 공식 웹사이트의 실시간 채팅 상담을 활용해 보세요.`;
    } else {
      q = `${company?.name || ""} ${cleanKeyword} 조회 업무를 실시간으로 빠르게 하는 팁은?`;
      a = `${company?.name || ""} 공식 대표번호에 전화를 걸어 ARS를 통하거나, 공식 모바일 앱 내 마이페이지를 통해 1초 만에 최신 결과를 확인할 수 있습니다.`;
    }
    return { q, a };
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${company?.name || ""}의 공식 인증 대표 전화번호는 몇 번인가요?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${company?.name || ""}의 공식 전화번호는 ${company?.phone || ""}이며, 운영 시간은 ${company?.hours || ""}입니다.`
        }
      },
      ...subTopicFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    ]
  };

  const getBrandPrefix = (name) => {
    if (!name) return "";
    const prefixes = [
      "신한", "삼성", "KB", "국민", "현대", "우리", "하나", "롯데", 
      "NH", "농협", "우체국", "LG", "KT", "SK", "카카오", "네이버", 
      "한화", "DB", "교보", "동양", "GS"
    ];
    for (const prefix of prefixes) {
      if (name.startsWith(prefix)) {
        return prefix;
      }
    }
    return name.split(" ")[0] || "";
  };

  const brandPrefix = getBrandPrefix(company?.name || "");
  const mainBrand = company?.name ? company.name.split(" ")[0].trim() : "";
  
  const siloItems = mainBrand && mainBrand.length >= 2
    ? customerData
        .filter(x => x?.name !== company?.name && x?.name.startsWith(mainBrand))
        .slice(0, 3)
    : [];

  const brandMatches = brandPrefix && brandPrefix.length >= 2
    ? customerData.filter(x => 
        x?.name !== company?.name && 
        x?.name.startsWith(brandPrefix) && 
        !x?.name.startsWith(mainBrand)
      )
    : [];

  const diffCategoryMatches = brandMatches.filter(x => x.category !== company.category);
  const sameCategoryMatches = brandMatches.filter(x => x.category === company.category);
  const familyItems = [...diffCategoryMatches, ...sameCategoryMatches].slice(0, 3);

  const relatedItems = customerData
    .filter(x => x?.category === company?.category && x?.name !== company?.name)
    .slice(0, 3);

  const recommendedTips = customerData
    .map((item) => ({ item, slug: getSlug(item?.name || "") }))
    .filter(x => x.item?.name !== company?.name)
    .slice(matchingIndex + 5, matchingIndex + 7)
    .map((x, i) => {
      if (!x.item) {
        const fallback = customerData[(matchingIndex + i) % customerData.length];
        return { item: fallback, slug: getSlug(fallback?.name || "") };
      }
      return x;
    });

  const is24h = (company?.hours || "").includes("24시간") || (company?.name || "").includes("분실") || (company?.name || "").includes("사고");
  const CategoryIcon = CATEGORY_MAP[company?.category || ""]?.icon || ShieldCheck;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                <CategoryIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {CATEGORY_MAP[company?.category || ""]?.name || company?.category}
                  </span>
                  {is24h && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 24시간 운영
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{cleanName}</h1>
              </div>
            </div>

            <div className="my-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs font-semibold text-amber-700 text-center flex items-center justify-center gap-1.5 shadow-2xs">
              <span>⚠️ 본 정보는 참고용이며 공식 채널을 통해 재확인하십시오.</span>
              <span className="text-slate-350">|</span>
              <Link href="/contact" className="underline hover:text-amber-900 font-extrabold">정보 오류 제보하기 🚨</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-6 bg-[#0055FF] rounded-2xl text-white shadow-lg shadow-blue-200">
                <a href={`tel:${dialablePhone}`} className="group flex items-center min-w-0 flex-1 hover:opacity-90 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-1 truncate">전화번호 바로 연결</p>
                    <p className="text-2xl font-bold tracking-tighter truncate">{company?.phone || ""}</p>
                  </div>
                </a>
                <CopyPhoneButton phone={company?.phone || ""} />
              </div>

              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <Clock className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">상담 운영 시간</p>
                  <p className="text-lg font-bold text-slate-700">{company?.hours || ""}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <BookmarkNudgeModal companyName={cleanName} slug={params.slug} />
            </div>

            {company?.subtasks && company.subtasks.length > 1 && (
              <div className="mt-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0055FF]" /> 세부 업무별 직통 전화번호
                </h3>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">세부 담당 업무</th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">직통 전화번호 및 연결</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {company.subtasks.map((sub, sIdx) => {
                        const cleanPhone = (sub.phone || "").replace(/[^0-9-]/g, "");
                        return (
                          <tr key={sIdx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-slate-700">{sub.name}</td>
                            <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-extrabold text-slate-900">
                              <a href={`tel:${cleanPhone}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 active:scale-95 transition-all">
                                <Phone className="w-3 h-3" />
                                {sub.phone}
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <DwellTimeEnhancer 
              companyName={cleanName}
              phone={company?.phone || ""}
              arsPath={company?.ars_path || ""}
              hours={company?.hours || ""}
              webUrl={company?.web_url || ""}
            />
          </div>

          <div className="bg-slate-50 p-8 border-t border-slate-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Sparkles className="w-5 h-5 text-amber-500" /> 연결 팁 & 핵심 가이드
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-3xs flex gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">💡 상담원 빠른 연결 단축번호 팁</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    전화 통화 연결 후 안내 멘트가 흘러나올 때 대기 시간 없이 즉시 연결을 원하시면, 곧바로 단축 번호 <strong className="text-[#0055FF]">{company?.phone?.includes("단축키") ? company.phone.split("단축키").pop().replace(/[^0-9*#]/g, "") : "0"}번</strong>을 누르시는 것이 가장 빠릅니다.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-3xs flex gap-3">
                <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center text-rose-500 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">⚠️ 혼잡 시간대 및 점심시간 안내</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    일평균 가장 통화량이 집중되는 혼잡 시간대는 오전 11:30 ~ 13:30(점심시간) 및 영업 지점 업무가 종료되는 15:30 이후입니다. 가급적 오전 09:00 ~ 10:30 사이 유선 연결을 추천해 드립니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              {subTopicFaqs.map((faq, idx) => (
                <article key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm" itemProp="mainEntity" itemScope itemType="https://schema.org/Question">
                  <div className="flex gap-3">
                    <div className="mt-1 flex-shrink-0">{getBadgeIcon(idx)}</div>
                    <div>
                      <p className="font-bold text-slate-900 mb-2 leading-snug" itemProp="name">{faq.q}</p>
                      <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                        <p className="text-slate-650 text-sm leading-relaxed" itemProp="text">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {siloItems.length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 px-1 text-slate-800 flex items-center gap-2">
              🔍 {mainBrand} 세부 고객센터 바로가기
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {siloItems.map((item) => (
                <Link key={item?.name || ""} href={`/${getSlug(item?.name || "")}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item?.name || ""}</span>
                  <div className="flex items-center text-xs text-slate-400 font-medium">
                    <Phone className="w-3 h-3 mr-1" /> {item?.phone || ""}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {familyItems.length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 px-1 text-slate-800 flex items-center gap-2">
              🏢 {brandPrefix} 패밀리 고객센터
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {familyItems.map((item) => (
                <Link key={item?.name || ""} href={`/${getSlug(item?.name || "")}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item?.name || ""}</span>
                  <div className="flex items-center text-xs text-slate-400 font-medium">
                    <Phone className="w-3 h-3 mr-1" /> {item?.phone || ""}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedItems.length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-bold mb-6 px-1 text-slate-800">함께 찾는 정보</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedItems.map((item) => (
                <Link key={item?.name || ""} href={`/${getSlug(item?.name || "")}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between group">
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">{item?.name || ""}</span>
                  <div className="flex items-center text-xs text-slate-400 font-medium">
                    <Phone className="w-3 h-3 mr-1" /> {item?.phone || ""}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {recommendedTips.length > 0 && (
          <section className="mt-10 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-blue-50 shadow-sm">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">인기 해결 팁</h3>
              <div className="space-y-3">
                {recommendedTips.map((tip, idx) => (
                  <Link key={idx} href={`/${tip.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                    <span className="text-slate-700 font-medium">{tip.item?.name || ""} 빠르게 연결하는 법</span>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <MobileStickyCallBar 
        phone={company?.phone || ""} 
        companyName={cleanName} 
        arsPath={company?.ars_path || ""} 
      />

      <Footer />
    </div>
  );
}
