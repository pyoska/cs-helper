import Link from "next/link";
import { 
  ArrowLeft, 
  Tag, 
  HelpCircle, 
  ShieldCheck, 
  Phone, 
  Clock, 
  BadgeCheck,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { customerData } from "@/data/customerData";
import Footer from "@/components/Footer";

// 태그명 추출 헬퍼
const getSlug = (name) => {
  let cleanName = name.trim().replace(/\s+고객센터$/, "").replace(/\s+고객센터\s+고객센터$/, "").replace(/고객센터$/, "").trim();
  cleanName = cleanName.replace(/[\/\\:*?"<>|%,.*]/g, "");
  return cleanName.replace(/\s+/g, "-") + "-고객센터";
};

const getDialablePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/\([^)]*\)/g, "").replace(/[^0-9+-]/g, "").trim();
};

// 모든 고유 태그 목록 추출하여 SSG 정적 빌드 대상 생성
export async function generateStaticParams() {
  const tags = new Set();
  customerData.forEach(item => {
    if (item.keywords) {
      item.keywords.forEach(kw => {
        const label = kw.split(" ").pop();
        if (label) tags.add(label);
      });
    }
  });
  return Array.from(tags).map(tag => ({
    tag: tag,
  }));
}

// 요구사항: 태그별 1인칭 전문 경험자 시점의 고품질 블로그 가이드 (300자 이상, H2 구조화)
const GUIDE_ARTICLES = {
  "분실신고": {
    title: "신용카드 분실신고 후 카드 재발급 전 필수 체크사항",
    content: `
      <h2>💡 분실 즉시 취해야 할 1차 대응 요령</h2>
      <p>제가 실제로 지갑을 분실하고 가장 당황했던 순간은 카드 정지 순서였습니다. 카드를 잃어버렸다면 1분 1초가 급합니다. 먼저 가장 사용 빈도가 높고 한도가 큰 카드사 고객센터에 전화를 걸어 분실 접수를 완료해야 합니다. 요즘은 고객센터 번호를 누르고 ARS 단축키(보통 1번 또는 9번 사고접수 코너)를 누르면 상담사와 대기 없이 24시간 즉시 연결됩니다. 전화를 거는 것조차 지체된다면 해당 금융사 모바일 앱의 챗봇이나 분실 접수 탭을 활용하는 것이 가장 확실합니다.</p>
      
      <h2>⚠️ 카드 재발급 신청 전 꼭 확인해야 할 체크리스트</h2>
      <p>많은 분들이 분실신고를 마친 뒤 안심하고 바로 재발급 버튼을 누르지만, 그 전에 반드시 최근 1~2시간 내의 카드 승인 내역을 대조해 보아야 합니다. 혹시 모를 부정 사용이나 소액 도용이 있었는지 체크해야 하기 때문입니다. 만약 부정 사용이 확인된다면 재발급 절차와 함께 '부정사용 보상 신청(피해보상)'을 별도로 접수하셔야 법적 보호를 받으실 수 있습니다. 또한, 기존 카드에 걸려 있던 넷플릭스, 관리비, 통신 요금 등의 자동이체 항목들을 미리 리스트업해 두세요. 새 카드가 발급되면 자동으로 자동납부가 승계되지 않는 항목들이 있어 요금 연체가 발생할 수 있습니다.</p>
      
      <h2>🔒 부정 사용 피해보상 규정 활용 팁</h2>
      <p>신용카드 약관에 따르면 분실신고 접수일로부터 60일 전까지 발생한 부정 사용액에 대해서는 카드사에 보상을 청구할 수 있습니다. 단, 카드 뒷면에 서명을 하지 않았거나 비밀번호 관리를 소홀히 한 경우, 가족이나 타인에게 카드를 빌려준 경우에는 본인 책임이 일부 발생할 수 있으므로 주의해야 합니다. 새 카드를 받으시면 반드시 뒷면에 유성펜으로 서명을 하고 사진을 찍어 보관하는 습관을 들이시는 것이 중요합니다.</p>
    `
  },
  "결제일변경": {
    title: "결제일 변경 시 한도 초과 및 이중 출금 예방 노하우",
    content: `
      <h2>📅 카드 이용기간(신용공여기간) 14일의 비밀</h2>
      <p>제가 카드 결제일을 여러 번 변경해 보면서 터득한 가장 유용한 팁은 결제일을 '14일'로 지정하는 것입니다. 신한카드, 삼성카드, 현대카드 등 국내 대부분의 카드사들은 결제일을 14일(혹은 일부 카드사는 13일)로 설정했을 때, 전월 1일부터 전월 말일까지 이용한 일시불 및 할부 금액이 청구됩니다. 결제일이 다른 날짜로 지정되어 있으면 이번 달 명세서에 전월 15일부터 당월 14일까지의 애매한 기간의 사용액이 청구되어 가계부를 작성하거나 한달 예산을 정산할 때 매우 복잡해집니다. 따라서 급여일이 언제이든 카드 결제일은 14일 근처로 맞춰두는 것을 강력히 추천합니다.</p>
      
      <h2>⚠️ 이중 출금 및 연체 정보 변경 시 주의사항</h2>
      <p>결제일을 변경할 때 가장 주의해야 할 점은 변경 신청 시점입니다. 기존 결제일이 임박한 상태(보통 결제일 전 3영업일 이내)에서 변경을 신청하면, 카드사 내부 시스템 연동 지연으로 인해 기존 결제일에 기존 금액이 출금되고, 변경된 결제일에 다시 한번 이중 출금되는 금융 사고가 종종 발생합니다. 이중 출금된 돈은 며칠 뒤 환급되지만 당장 현금 흐름에 지장을 줄 수 있습니다. 따라서 결제일 변경은 항상 결제일 당일 직후나 결제 명세서가 발송되기 시작하는 날 이전에 여유를 두고 신청하시는 것이 안전합니다.</p>
      
      <h2>💸 한도 복원 시점 조율 요령</h2>
      <p>결제일을 늦추게 되면 한도가 복원되는 날짜도 함께 늦어집니다. 이번 달 카드 이용액이 많아 한도가 아슬아슬한 상황에서 결제일을 뒤로 미루면, 결제가 완료되기 전까지 한도가 살아나지 않아 일시적인 한도 초과 상태에 직면할 수 있습니다. 본인의 월간 지출 흐름과 신용 한도를 비교하여 무리가 없는 날짜로 신중히 설정하시기 바랍니다.</p>
    `
  },
  "한도조회": {
    title: "신용카드 한도 상향 및 임시 한도 조정 최적 시점 가이드",
    content: `
      <h2>📈 한도 상향을 승인받는 신용도 관리 비결</h2>
      <p>신용카드 이용 한도는 카드사가 이용자의 상환 능력을 평가하는 척도입니다. 제가 한도 상향을 거절당해 보며 깨달은 점은, 한도를 무작정 높여달라고 고객센터에 조르는 것은 아무 소용이 없다는 것이었습니다. 카드사의 자동 한도 상향 제안을 받기 위해서는 평소 신용카드 이용 금액의 30~50% 수준을 꾸준히 결제하고, 단 하루의 연체도 남기지 않는 연체 청정 상태를 최하 6개월 이상 유지해야 합니다. 또한, 현금서비스(단기카드대출)나 카드론(장기카드대출)을 빈번하게 사용하는 것은 신용도에 악영향을 주어 한도 증액 심사에서 치명적인 감점 요인이 됩니다.</p>
      
      <h2>🚗 결혼, 자동차 구매 등 대형 지출 시 임시한도 활용법</h2>
      <p>인생에서 큰 비용을 지출해야 하는 혼수 준비나 병원비, 신차 구매 등의 이벤트가 있을 때는 일반 한도 조회가 아닌 '특별 임시한도 상향'을 신청하셔야 합니다. 임시한도는 증빙 서류(예: 청첩장, 구매 계약서, 진단서 등)를 제출하면 고객센터에서 심사를 거쳐 일정 기간(보통 1~2개월) 동안 수백만 원에서 수천만 원까지 한도를 즉시 열어줍니다. 이 임시한도는 지정된 기간이 지나면 자동으로 소멸하며, 일시불 결제에만 적용되는 경우가 많으니 사전에 사용 제한 조건을 명확히 파악하고 결제 플랜을 수립해야 합니다.</p>
      
      <h2>📊 신용점수 하락 없는 안전한 한도 관리</h2>
      <p>간혹 한도 조회나 증액 신청 자체가 신용점수를 떨어뜨린다고 우려하시는 분들이 있으나, 이는 사실이 아닙니다. 단순히 한도를 조회하거나 상향 심사를 진행하는 것 자체로는 신용평가사의 신용점수가 하락하지 않습니다. 오히려 보유한 총 신용 한도 대비 실제 사용액의 비율(한도 소진율)을 30% 이하로 낮게 유지하는 것이 신용점수 상승에 긍정적인 영향을 주므로, 한도는 본인의 지출 규모보다 최대한 넉넉하게 상향 신청해 두는 편이 금융 관리에 훨씬 유리합니다.</p>
    `
  },
  "default": {
    title: "고객센터 대기 시간을 80% 줄이는 상담원 즉시 연결 노하우",
    content: `
      <h2>📞 전화 연결이 지연될 때의 현실적인 대처법</h2>
      <p>대기업이나 금융사 고객센터에 전화를 걸 때 &quot;지금은 통화량이 많아 연결이 지연되고 있습니다&quot;라는 멘트를 들으면 누구나 답답함을 느낍니다. 전화를 끊고 다시 걸기를 반복하기보다, 우선 전화 연결의 황금 시간대를 공략하는 것이 첫걸음입니다. 월요일 하루 종일과 매일 오전 9시~10시, 오후 12시~13시 점심시간대는 상담 전화가 가장 집중되는 시간입니다. 대신 화요일부터 목요일 사이의 오전 11시 전후 혹은 오후 2시에서 4시 사이에 연락을 취하시면 대기시간을 평소의 절반 이하로 대폭 줄일 수 있습니다.</p>
      
      <h2>📱 보이는 ARS와 디지털 상담 채널 활용 팁</h2>
      <p>요즘 대부분의 고객센터는 전화를 걸면 스마트폰 화면에 메뉴를 띄우는 '보이는 ARS'나 카카오톡 알림톡 기반의 '디지털 상담' 링크를 즉시 발송합니다. 음성 안내를 끝까지 듣는 대기 시간이 너무 길다면, 보이는 ARS 링크를 열어 단순 조회나 서류 발급 업무를 터치 몇 번으로 10초 만에 완료하는 것이 훨씬 효율적입니다. 또한, 복잡한 본인 인증 절차가 필요 없는 단순 규정 문의의 경우 공식 홈페이지의 자주 찾는 질문(FAQ)이나 검색창을 통해 이미 올라와 있는 답변을 검색하는 것이 전화 대기 시간을 아끼는 비법입니다.</p>
      
      <h2>📝 상담 시작 전 미리 준비해야 할 메모 리스트</h2>
      <p>상담사와 통화가 연결된 이후 본인 확인 질문에 답하거나 계약 번호, 신분증 번호 등을 찾는 과정에서 시간이 지체되면 뒤에서 기다리는 대기자뿐 아니라 본인의 통화 요금도 가중됩니다. 통화 버튼을 누르기 전에 미리 주민등록번호 앞자리, 회원 아이디, 혹은 질문할 내용의 요점을 메모지에 간략하게 리스트업해 두세요. 상담사가 질문을 시작하자마자 막힘없이 답변하면 상담 시간이 절반으로 단축되며 한결 친절하고 명확한 맞춤 해결책을 얻어내실 수 있습니다.</p>
    `
  }
};

export default async function TagPage({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // 해당 태그를 키워드에 포함하고 있는 금융/기업 데이터 필터링
  const matchedCompanies = customerData.filter(item => 
    item.keywords && item.keywords.some(kw => kw.toLowerCase().includes(decodedTag.toLowerCase()))
  );

  // 정보성 블로그 글 콘텐츠 가져오기 (매핑이 없으면 default 로드)
  const guide = GUIDE_ARTICLES[decodedTag] || GUIDE_ARTICLES["default"];

  // 가이드 글 구조화 Schema.org JSON-LD 동적 삽입
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": `${decodedTag} 관련 고객센터 연락망 및 1인칭 실전 금융 꿀팁 가이드`,
    "author": {
      "@type": "Organization",
      "name": "CS 고객센터 도우미"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CS 고객센터 도우미",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cshelper.kr/favicon.ico"
      }
    },
    "mainEntityOfPage": `https://cshelper.kr/tag/${tag}`
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 네비게이션 */}
      <nav className="bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">
              CS 고객센터 도우미<span className="text-blue-400 font-semibold text-sm">.kr</span>
            </span>
          </Link>
          <div className="flex gap-4 text-xs font-bold text-slate-300">
            <Link href="/" className="hover:text-blue-400">고객센터 검색</Link>
            <Link href="/about" className="hover:text-blue-400">About Us</Link>
          </div>
        </div>
      </nav>

      {/* 본문 레이아웃 */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
        
        {/* 홈으로 가기 버튼 */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-xs font-black text-[#0055FF] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> 메인 화면으로 돌아가기
        </Link>

        {/* 상단 태그 정보 헤더 */}
        <header className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#0055FF] rounded-2xl">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-slate-900">
                #{decodedTag} 관련 고객센터
              </h1>
              <p className="text-3xs md:text-2xs text-slate-450 mt-1">
                태그 매칭 결과 총 {matchedCompanies.length}개의 관련 정보를 조회했습니다.
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 좌측: 매칭된 기업 카드 목록 (2열 가로폭 배치) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              관련 고객센터 정보 리스트
            </h2>
            
            {matchedCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedCompanies.map((item, index) => {
                  const slug = getSlug(item.name);
                  const is24h = item.hours.includes("24시간") || item.name.includes("분실") || item.name.includes("사고");
                  return (
                    <div 
                      key={index}
                      className="bg-white border border-slate-150 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-3xs font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          {is24h && (
                            <span className="text-3xs font-bold text-red-650 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded">
                              24시
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-black text-slate-950 group-hover:text-[#0055FF] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-3xs text-slate-400 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                        
                        <div className="mt-3 py-2 px-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-3xs">
                          <span className="text-slate-450">대표번호</span>
                          <strong className="text-slate-850 tracking-tight">{item.phone}</strong>
                        </div>
                      </div>

                      <div className="flex gap-1.5 mt-4">
                        <a 
                          href={`tel:${getDialablePhone(item.phone)}`}
                          className="flex-grow bg-[#0055FF] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-3xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Phone className="w-3 h-3 fill-white" />
                          전화 연결
                        </a>
                        <Link 
                          href={`/${slug}`}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl text-3xs flex items-center justify-center shrink-0 transition-colors"
                        >
                          상세보기
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // 매칭 결과가 없을 경우 (혹은 기본 안내용) 안내 카드
              <div className="bg-white border border-slate-150 rounded-3xl p-8 text-center space-y-3">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-extrabold text-slate-800">해당 태그와 매치되는 직접적인 금융사가 없습니다.</h3>
                <p className="text-3xs text-slate-450 leading-relaxed max-w-xs mx-auto">
                  조회 데이터는 없으나, 우측에 제공해 드리는 전문 블로그 노하우 글을 참고하시어 고객센터 업무 해결에 도움을 받으시기 바랍니다.
                </p>
              </div>
            )}
          </div>

          {/* 우측: 핵심 정보성 블로그 가이드 영역 */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-blue-650" />
              전문 해결 가이드 칼럼
            </h2>

            <article className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <span className="text-3xs bg-blue-100 text-blue-700 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Experience Guide
              </span>
              
              <h2 className="text-base font-black text-slate-900 leading-tight">
                {guide.title}
              </h2>

              {/* 블로그형 본문 300자 이상 자연어 가이드 */}
              <div 
                className="text-xs text-slate-650 leading-relaxed space-y-4 font-sans font-medium prose prose-slate max-w-none 
                  [&>h2]:text-xs [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-6 [&>h2]:mb-2 [&>h2]:flex [&>h2]:items-center [&>h2]:gap-1"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />

              {/* 요구사항: 면책 문구 필수 포함 */}
              <div className="border-t border-slate-100 pt-5 mt-6 text-3xs text-slate-400 flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>면책 고지:</strong> 본 정보는 개인 작성 및 대조 참고용이며 공식 채널이 아닙니다. 
                  금융사 사정 및 개편에 따라 실제 정보가 달라질 수 있으므로, 금융 거래 전 공식 채널을 통해 반드시 최신 규정을 재확인하십시오.
                </p>
              </div>
            </article>
          </div>

        </div>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
