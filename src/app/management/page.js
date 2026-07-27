import Link from "next/link";
import { ArrowLeft, Award, HelpCircle } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "운영진 및 사이트 관리자 안내 - CS 고객센터 도우미",
  description: "CS 고객센터 도우미 사이트를 성실히 가동하고 정합성을 검증하는 운영 책임자 정보와 관리 방침을 공유합니다.",
};

export default function ManagementPage() {
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

        {/* 운영자 안내 아티클 */}
        <article className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <Award className="w-8 h-8 text-[#0055FF]" />
            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
              운영자 안내 및 관리 원칙 (Management)
            </h1>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            CS 고객센터 도우미는 100% 신뢰할 수 있는 데이터 신선도를 유지하기 위해 엄격한 정비 메커니즘과 투명한 운영 철학을 유지합니다. 
            가짜 정보와 먹통 번호가 넘쳐나는 웹 생태계에서 당당하게 공식 정보를 검증하여 안내해 드릴 것을 약속합니다.
          </p>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">1. 투명한 정보 운영 철학</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              저희 운영팀은 사용자가 번호를 눌러 즉각적으로 문제를 상담하는 과정에서 그 어떤 왜곡된 정보나 결제 유도, 유료 안내 채널을 개설하지 않습니다. 
              오로지 공공의 이익을 위한 통신 안내 치트키 노선을 수동 대조하여 기록하며, 정확한 가이드만을 배포합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">2. 사용자 참여형 신뢰 구조 (User-Driven Trust)</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              금융 정책의 변경이나 임시 ARS 메뉴 개편 등으로 인해, 실시간 대조 시에도 갱신이 간혹 누락되거나 번호가 달라질 수 있습니다. 
              이에 저희는 이용자 여러분이 직접 참여하여 정보를 완성해 나가는 **사용자 참여형 협업 모델**을 강력하게 지향합니다.
            </p>
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-xs md:text-sm text-slate-700 leading-relaxed">
              <h3 className="font-extrabold text-blue-700 mb-1">💡 신속 정보 정정 약속</h3>
              운영자가 발견하지 못한 최신 번호 변경 정보나 ARS 번호 경로 변경 사항이 있다면, 언제든지 문의하기 채널로 의견을 남겨주세요. 
              **접수 즉시 24시간 이내에 원본 데이터베이스 수정 및 프로덕션 빌드 배포**를 통해 사이트 내 데이터를 실시간 업데이트하겠습니다.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-800">3. 상시 모니터링 가동</h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              단순히 가만히 기다리지 않고, 정기적인 스크립트 모니터링 분석 및 주기적인 상담사 수동 전화를 실시하여 유효 전화 상태를 검증합니다. 
              앞으로도 이용자의 소중한 시간을 대기음 속에서 낭비하지 않는 대한민국 넘버원 CS 포털을 만들어가겠습니다.
            </p>
          </section>
        </article>
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
}
