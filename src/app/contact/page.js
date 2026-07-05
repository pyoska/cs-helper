import Link from "next/link";
import { ArrowLeft, Mail, MessageSquareCheck } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
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

        {/* 문의하기 아티클 */}
        <article className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Mail className="w-8 h-8 text-[#0055FF]" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              제보 및 문의하기 (Contact Us)
            </h1>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            잘못 기록된 대표번호 정정 제보, 새로운 신규 브랜드 고객센터 정보 입점 신청, 제휴 및 기타 의문 사항 등 
            다양한 목소리를 귀담아듣습니다. 정중하고 조속하게 검토한 뒤 시스템에 빠르게 적용하겠습니다.
          </p>

          {/* 문의처 카드 정보 */}
          <div className="bg-slate-50 border border-slate-150 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-100/50 rounded-xl text-[#0055FF]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-450 tracking-wide uppercase">공식 문의/제보 이메일</h3>
                <a 
                  href="mailto:contact@cshelper.kr" 
                  className="text-lg font-black text-slate-850 hover:text-[#0055FF] tracking-tight block mt-0.5"
                >
                  contact@cshelper.kr
                </a>
                <span className="text-3xs text-slate-400 mt-1 block">
                  (접수 확인 즉시 24시간 이내 데이터 정정 릴리즈 적용)
                </span>
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
              <MessageSquareCheck className="w-5 h-5 text-emerald-650" />
              정정 요청 시 기재해 주시면 좋은 정보
            </h2>
            <p className="text-xs md:text-sm text-slate-650 leading-relaxed">
              더욱 정확한 조치를 위해 이메일 발송 시 아래 템플릿 항목을 참고하셔서 적어주시면 큰 도움이 됩니다:
            </p>
            <div className="bg-slate-100 p-4 rounded-xl text-3xs md:text-2xs font-mono text-slate-700 space-y-1">
              <p>1. 대상 업체/기관명: (예: 삼성카드 고객센터)</p>
              <p>2. 발견한 오류 항목: (예: 대표번호 불일치, ARS 팁 변경)</p>
              <p>3. 올바른 최신 공식 정보: (예: 변경된 전화번호 1588-XXXX)</p>
              <p>4. 공식 웹페이지 증빙 링크: (예: 해당 카드사 공식 공지사항 페이지 URL)</p>
            </div>
          </section>

          <section className="space-y-3 text-xs md:text-sm text-slate-600 leading-relaxed">
            <p>
              CS 고객센터 도우미는 대중의 활발한 참여와 정정 제보를 환영하며, 이용자들께서 제보해 주신 검증된 변경 사항들은 
              매일 원본 데이터에 즉시 주입 빌드됩니다. 작은 제보 하나가 매일 방문하는 수천 명의 시간을 절약하는 큰 기적이 될 수 있습니다. 
              정성 어린 피드백과 소중한 제보에 깊이 머리 숙여 감사드립니다.
            </p>
          </section>
        </article>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
