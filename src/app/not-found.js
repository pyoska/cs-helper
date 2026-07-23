import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans">
      <nav className="bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">
              CS 고객센터 도우미<span className="text-blue-400 font-semibold text-sm">.kr</span>
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold mb-2 text-slate-900">고객센터 정보를 찾을 수 없습니다.</h1>
        <p className="text-slate-600 mb-8 text-sm leading-relaxed">
          요청하신 고객센터 안내 페이지가 이동되었거나 삭제되었을 수 있습니다. 대표번호 조회를 위해 메인 화면에서 다시 검색해 주세요.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0055FF] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> 메인 화면으로 이동
        </Link>
      </main>

      <Footer />
    </div>
  );
}
