import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "개인정보처리방침 (Privacy Policy) - CS 고객센터 도우미",
  description: "CS 고객센터 도우미 사이트의 공식 개인정보처리방침이며, 구글 애드센스 맞춤형 광고 쿠키 활용 및 거부(Opt-out) 안내를 상세히 명시합니다.",
};

export default function PrivacyPage() {
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

        {/* 개인정보처리방침 아티클 */}
        <article className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <ShieldCheck className="w-8 h-8 text-[#0055FF]" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              개인정보처리방침 (Privacy Policy)
            </h1>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            CS 고객센터 도우미(이하 &quot;본 사이트&quot;)는 이용자의 개인정보를 소중하게 보호하며, 관련 법령을 성실히 준수합니다. 
            본 사이트가 어떠한 목적으로 정보를 활용하고 안전하게 관리하는지 아래와 같이 안내해 드립니다.
          </p>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">1. 수집하는 개인정보 항목 및 목적</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 사이트는 회원가입이나 민감 정보를 취합하지 않는 **비로그인 방식의 개방형 정보 플랫폼**입니다. 
              따라서 이용자의 이름, 전화번호, 이메일 등 개인을 식별할 수 있는 정보를 기본적으로 수집하지 않습니다. 
              다만, 서비스 품질 개선과 통계 분석을 위해 아래와 같은 자동 수집 항목이 로그 정보로 임시 발생할 수 있습니다:
            </p>
            <ul className="list-disc pl-5 text-xs md:text-sm text-slate-600 space-y-1.5">
              <li>접속 IP 주소, 쿠키(Cookie), 접속 로그, OS/브라우저 유형</li>
              <li>방문 일시 및 웹사이트 탐색 패턴 통계 정보</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">2. 구글 애드센스 광고 쿠키 및 외부 플랫폼 안내</h2>
            <div className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-2">
              <p>
                본 사이트는 웹사이트 활성화 및 맞춤형 서비스 제공을 위해 광고 파트너사 및 구글 애드센스(Google AdSense) 광고 플랫폼의 쿠키를 활용할 수 있습니다.
              </p>
              <p>
                - 구글(Google)을 포함한 제3자 판매자는 쿠키를 사용하여 사용자가 본 사이트 또는 다른 웹사이트를 이전에 방문한 내역을 기반으로 맞춤형 광고를 게재합니다.
              </p>
              <p>
                - 구글의 광고 쿠키 사용을 통해 구글과 그 파트너사는 사용자의 본 사이트 및 인터넷상의 다른 사이트 방문 정보를 토대로 사용자에게 유익한 광고를 제공할 수 있습니다.
              </p>
              <p>
                - 이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">구글 광고 설정 페이지</a>를 방문하여 맞춤형 광고를 해제할 수 있습니다. (또는 <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">www.aboutads.info</a>를 방문하여 제3자 판매자의 맞춤형 광고용 쿠키 사용을 원천 차단할 수 있습니다.)
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">3. 개인정보의 제3자 제공 및 수탁</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 사이트는 이용자의 식별 정보를 수집하지 않으므로 제3자에게 개인정보를 매매하거나 불법 유출할 위험이 원천적으로 차단되어 있습니다. 
              또한 이용자가 직접 작성하여 발송한 문의 메일 정보는 문의에 대한 답변 목적으로만 단독 사용되며 지체 없이 파기합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">4. 개인정보 보호 문의</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 처리방침에 관하여 의문 사항이나 정정 요청이 있으실 경우 [문의하기(/contact)] 메뉴의 공식 안내창을 통하여 의견을 제보해 주시면 신속히 반영해 드리겠습니다.
            </p>
          </section>
        </article>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
