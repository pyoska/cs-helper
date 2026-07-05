import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-150 py-10 mt-auto text-slate-400 text-xs shadow-inner">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
        
        {/* 푸터 네비게이션 링크 */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-slate-500 font-bold text-xs">
          <Link href="/" className="hover:text-[#0055FF] transition-colors">고객센터 검색</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:text-[#0055FF] transition-colors">개인정보처리방침</Link>
          <span>|</span>
          <Link href="/about" className="hover:text-[#0055FF] transition-colors">사이트 안내</Link>
          <span>|</span>
          <Link href="/management" className="hover:text-[#0055FF] transition-colors">운영자 안내</Link>
          <span>|</span>
          <Link href="/contact" className="hover:text-[#0055FF] transition-colors">문의하기</Link>
        </div>
        
        <div className="text-3xs font-black text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full inline-block border border-slate-200">
          최종 업데이트: 2026.07.05
        </div>

        {/* 요구사항 상세 고지 안내 문구 전면 교체 */}
        <div className="max-w-3xl mx-auto text-left md:text-center text-slate-400/90 leading-relaxed space-y-2 text-2xs md:text-xs">
          <p>
            본 사이트(cshelper.kr)는 특정 금융사나 카드사, 각 기업들의 공식 운영 채널이 아닙니다.
          </p>
          <p>
            본 사이트는 공공에 공개된 금융사별 고객센터 연락처, ARS 단축키, 서비스 이용 안내 정보를 이용자가 검색하기 쉽도록 취합·정리하여 제공하는 독립적인 정보 제공 서비스입니다.
          </p>
          <p>
            본 사이트에서 제공하는 모든 정보는 게시 시점 기준으로 작성되었으며, 금융사의 정책 변경이나 시스템 상황에 따라 실제 연락처와 운영 시간이 달라질 수 있습니다. 
            따라서 실제 서비스 이용 전, 각 금융사의 <strong className="text-slate-600 font-extrabold">공식 홈페이지나 고객센터를 통해 최신 정보를 반드시 재확인</strong>하시기 바랍니다.
          </p>
          <p>
            본 사이트가 제공하는 정보를 활용하여 발생한 문제나 결과에 대하여, 본 사이트는 법적 책임을 지지 않으며, 모든 이용은 사용자의 판단과 책임하에 이루어집니다.
          </p>
        </div>

        <p className="text-slate-400 text-3xs pt-2">
          Copyright © 2026 CS Helper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
