import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "이용약관 (Terms of Service) - CS 고객센터 도우미",
  description: "CS 고객센터 도우미 서비스 이용 약관이며, 정보 제공의 목적 및 서비스 이용 조건, 면책 조항을 명시합니다.",
};

export default function TermsPage() {
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
            <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
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

        {/* 이용약관 아티클 */}
        <article className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <FileText className="w-8 h-8 text-[#0055FF]" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              서비스 이용약관 (Terms of Service)
            </h1>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            본 이용약관은 이용자가 CS 고객센터 도우미(이하 &quot;사이트&quot;)가 제공하는 모든 정보 및 서비스(이하 &quot;서비스&quot;)를 이용함에 있어 서비스 제공자와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">제1조 (목적 및 서비스의 성격)</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 사이트는 대한민국 주요 기업 및 공공기관의 고객센터 대표전화, 운영시간, ARS 단축 경로 등 대중적 정보 수집 및 이용자의 검색 편의를 돕는 **공개형 정보 유틸리티 서비스**입니다. 
              본 사이트는 해당 기업과 직접적인 대리 관계나 공식 제휴 관계를 형성하고 있지 않은 비공식 참고용 안내 사이트입니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">제2조 (정보의 신뢰성 및 법적 면책)</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              1. 본 사이트에 수록된 기업 대표번호 및 ARS 단축키 정보는 공식 공시 자료 및 검증된 출처를 바탕으로 상시 점검되나, 각 기업의 내부 정책 변경이나 사정에 따라 실제 정보와 차이가 발생할 수 있습니다.<br />
              2. 본 사이트가 제공하는 모든 정보는 참고용이며, 이용자는 중요한 업무 처리 및 상담 시 해당 기업의 공식 홈페이지나 공식 채널을 통해 최종 확정 정보를 재확인하여야 합니다.<br />
              3. 본 사이트의 정보를 활용하여 발생한 직·간접적 손실이나 오해에 대하여 사이트 운영팀은 법적 책임을 지지 않습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">제3조 (저작권 및 지적재산권)</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              1. 본 사이트가 자체적으로 작성한 1인칭 전문가 경험담, 가이드 텍스트, 웹 디자인 및 소스코드는 본 사이트에 저작권이 귀속됩니다.<br />
              2. 각 기업의 상호, 브랜드 로고 및 대표번호 권리는 해당 기업 및 상표권자에게 귀속되며, 본 사이트는 단순 정보 제공 목적으로만 활용합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">제4조 (약관의 개정 및 효력)</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              본 사이트는 관계 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있으며, 개정 시 사이트 하단 공지를 통해 사전 안내합니다. 
              이용자가 변경된 약관 공지 후에도 계속하여 서비스를 이용하는 경우 약관 변경에 동의한 것으로 간주합니다.
            </p>
          </section>
        </article>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
