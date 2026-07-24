import Link from "next/link";
import { ArrowLeft, Info, HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "사이트 소개 및 안내 - CS 고객센터 도우미",
  description: "CS 고객센터 도우미(cshelper.kr) 사이트의 개설 목적, 정보 제공 취지 및 주요 서비스 철학을 안내해 드립니다.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      
      {/* 네비게이션 */}
      <nav className="bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
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

      {/* 본문 */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-4 py-8">
        
        {/* 홈으로 가기 버튼 */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-xs font-black text-[#0055FF] hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> 메인 화면으로 돌아가기
        </Link>

        {/* 사이트 안내 아티클 */}
        <article className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Info className="w-8 h-8 text-[#0055FF]" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              사이트 소개 및 기획 목적 (About Us)
            </h1>
          </div>

          <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-bold">
            &quot;ARS 기계음 안내를 듣다 끊어지거나, 상담원 연결 메뉴가 꽁꽁 숨겨져 있어서 스트레스 받으신 적이 없으신가요?&quot;
          </p>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">1. 대한민국 1,000개 기관의 금융 정보를 집대성한 이유</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              정보의 파편화와 불편한 고객 응대 프로세스는 바쁜 일상을 살아가는 사용자들의 소중한 시간을 매일 갉아먹습니다. 
              수많은 대기업과 금융 기관들이 모바일 앱 설치나 디지털 ARS 사용을 반강제하고 있지만, 시각장애인, 고령층을 비롯해 
              단순히 상담원 직통 연결을 즉시 원하는 많은 금융 이용자들은 깊숙한 하위 메뉴 뒤에 감춰진 번호를 찾아 매번 헤매야 했습니다.
            </p>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              **CS 고객센터 도우미**는 이러한 정보 불균형과 이용 불편을 혁신적으로 제거하고자 구축된 전문 데이터 정보 플랫폼입니다. 
              시중에 흩어져 있는 카드사, 은행, 보험사, 통신사, 배달 및 가전 서비스 등 **1,000여 개가 넘는 브랜드의 고객센터 정보**를 
              하나의 검색 인터페이스로 깔끔하게 정렬했습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">2. 사용자들의 시간을 지키는 3가지 혁신</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h3 className="text-xs font-black text-slate-850 mb-1">⚡ ARS 단축 치트키 제공</h3>
                <p className="text-3xs text-slate-550 leading-relaxed">
                  음성 안내를 다 들을 필요 없이 연결 직후 누르면 바로 상담사로 직통 연결되는 고품질 ARS 입력 경로를 제공합니다.
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h3 className="text-xs font-black text-slate-850 mb-1">👥 1인칭 실전 연결 팁</h3>
                <p className="text-3xs text-slate-550 leading-relaxed">
                  직접 전화를 걸어 검증한 실제 통화 연결 팁(경험 노하우)을 매핑하여 대기시간 단축 비책을 상세히 공개합니다.
                </p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl">
                <h3 className="text-xs font-black text-slate-850 mb-1">✅ 공식 정보 실시간 대조</h3>
                <p className="text-3xs text-slate-550 leading-relaxed">
                  주기적으로 정보의 유효성을 실시간 대조하고 업데이트하여 신뢰성 있는 품질 데이터를 안전하게 공급합니다.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">3. 공공 편의 목적의 투명성 안내</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 사이트는 특정 기업과의 영리적 제휴 없이 공공의 알 권리와 편의 제공을 최우선으로 하여 설계되었습니다. 
              언제든지 편리하게 필요한 카드사 및 은행의 최적의 루트를 찾고 시간을 대폭 단축할 수 있는 금융 네비게이터 지도로서 기능하겠습니다.
            </p>
          </section>
        </article>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
