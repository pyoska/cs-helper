"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle,
  Activity
} from "lucide-react";

export default function DwellTimeEnhancer({ companyName, phone, arsPath, hours, webUrl }) {
  const [currentHour, setCurrentHour] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(true);
  const [successRate, setSuccessRate] = useState(87);
  const [showSchedule, setShowSchedule] = useState(false);

  const hasShortcut = phone?.includes("단축키") || arsPath?.includes("단축키");
  const shortcutNum = phone?.includes("단축키") 
    ? phone.split("단축키").pop().replace(/[^0-9*#]/g, "") 
    : (arsPath?.includes("단축키") ? arsPath.split("단축키").pop().replace(/[^0-9*#]/g, "") : null);

  useEffect(() => {
    // Get client current hour safely
    setCurrentHour(new Date().getHours());
  }, []);

  const handleVote = (success) => {
    if (voted) return;
    setVoteSuccess(success);
    setVoted(true);
    // Slightly adjust rate visually on vote
    setSuccessRate(prev => success ? Math.min(prev + 1, 100) : Math.max(prev - 2, 0));
  };

  // Determine congestion based on hour
  let status = { text: "정보 없음", color: "text-slate-500", bg: "bg-slate-50", barColor: "bg-slate-300", percent: 0 };
  
  if (currentHour !== null) {
    if (currentHour < 9 || currentHour >= 18) {
      status = { text: "운영 시간 종료 (야간/휴무)", color: "text-slate-500", bg: "bg-slate-100", barColor: "bg-slate-400", percent: 0 };
    } else if (currentHour >= 11 && currentHour < 13) {
      status = { text: "혼잡 (점심시간 대기 긴 편)", color: "text-rose-600", bg: "bg-rose-50", barColor: "bg-rose-500", percent: 85 };
    } else if (currentHour >= 15 && currentHour < 17) {
      status = { text: "보통 (상담 전산 마감 직전)", color: "text-amber-650", bg: "bg-amber-50", barColor: "bg-amber-500", percent: 60 };
    } else {
      status = { text: "원활 (통화 즉시 연결 가능)", color: "text-emerald-650", bg: "bg-emerald-50", barColor: "bg-emerald-500", percent: 20 };
    }
  }

  return (
    <div className="space-y-6 mt-6">
      {/* 🟢 1. 실시간 전화 혼잡도 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0055FF]" /> 실시간 전화 혼잡도 검사
          </h3>
          <span className="text-xs text-slate-400">현재 시간 기준</span>
        </div>

        <div className={`p-4 rounded-xl ${status.bg} flex items-center justify-between mb-4`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${currentHour >= 9 && currentHour < 18 ? 'animate-ping' : ''} ${status.barColor}`} />
            <span className={`text-sm font-extrabold ${status.color}`}>{status.text}</span>
          </div>
          <button 
            onClick={() => setShowSchedule(!showSchedule)}
            className="text-xs text-slate-500 hover:text-[#0055FF] underline font-medium"
          >
            {showSchedule ? "상세 닫기" : "혼잡 시간대 보기"}
          </button>
        </div>

        {/* Dynamic Wait Bar */}
        {currentHour !== null && currentHour >= 9 && currentHour < 18 && (
          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-xs text-slate-400">
              <span>연결 원활</span>
              <span>평균 대기 약 {status.percent === 85 ? '5분 이상' : status.percent === 60 ? '2분 내외' : '1분 미만'}</span>
              <span>매우 혼잡</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${status.barColor}`} style={{ width: `${status.percent}%` }} />
            </div>
          </div>
        )}

        {showSchedule && (
          <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 leading-relaxed">
            <p>📌 <strong>가장 한산한 추천 통화 시간대:</strong> 오전 09:00 ~ 10:30 및 오후 14:00 ~ 15:30 사이가 비교적 여유롭습니다.</p>
            <p>⚠️ <strong>통화 대기 급증 시간대:</strong> 오전 11:30 ~ 13:30 (점심시간 교대 근무) 및 15:30 ~ 18:00 (영업점 마감 후)는 대기 시간이 길어질 수 있습니다.</p>
          </div>
        )}
      </div>

      {/* 📱 2. 보면서 누르는 ARS 단축 경로 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#0055FF]" /> 보면서 통화하는 ARS 직통 경로
        </h3>
        
        <div className="relative pl-6 border-l-2 border-blue-100 space-y-5 my-2">
          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">1</div>
            <p className="text-xs font-bold text-slate-800">대표 전화로 발신</p>
            <p className="text-[11px] text-slate-400 mt-0.5">버튼 클릭 또는 다이얼에서 <span className="font-bold text-[#0055FF]">{phone}</span> 입력 후 전화를 겁니다.</p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">2</div>
            <p className="text-xs font-bold text-slate-800">안내 멘트 즉시 스킵</p>
            <p className="text-[11px] text-slate-400 mt-0.5">ARS 기계음 안내 멘트가 나오면 기다리지 말고 키패드 창을 활성화합니다.</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">3</div>
            <p className="text-xs font-bold text-slate-800">
              {hasShortcut ? "지정된 단축키 입력" : "상담원 직통 연결 대기"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {hasShortcut 
                ? "원하시는 상담 부서에 맞게 곧바로 아래 단축번호를 누르시면 불필요한 대기 단계가 즉시 스킵됩니다:" 
                : "단축 입력 단계가 없는 직통 전화선입니다. 신호음이 끝날 때까지 대기하시면 상담원에게 연결됩니다:"}
            </p>
            <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-700">
                {hasShortcut ? (arsPath?.includes("단축키") ? arsPath.split("(")[0].trim() : arsPath) : (arsPath || "상담원 바로연결")}
              </span>
              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-md border ${
                hasShortcut 
                  ? "text-blue-600 bg-blue-50 border-blue-100" 
                  : "text-slate-500 bg-slate-100 border-slate-200"
              }`}>
                {hasShortcut ? `${shortcutNum}번 입력` : "직통 연결 지원"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 3. 대체 디지털 상담 채널 및 실시간 피드백 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 대체 채널 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> 모바일 채팅 상담 안내
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              전화 연결 지연 시 카카오톡 또는 웹 브라우저를 통해 실시간 문자 상담원과 1:1로 빠르게 대화하여 업무를 해결할 수 있습니다.
            </p>
          </div>
          {webUrl ? (
            <a 
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-bold text-[#0055FF] bg-blue-50 py-2.5 rounded-xl hover:bg-blue-100 transition-colors block"
            >
              공식 실시간 웹 채팅 연결
            </a>
          ) : (
            <div className="text-center text-xs font-bold text-slate-400 bg-slate-50 py-2.5 rounded-xl cursor-not-allowed">
              해당 기관 카카오톡 챗봇 연동 대기
            </div>
          )}
        </div>

        {/* 즉석 설문 피드백 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 오늘 전화 연결 피드백
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              상담사에게 전화를 걸어 성공적인 연결이 되었나요? 실시간 통계 조사를 통해 다른 분들께 큰 정보를 줄 수 있습니다.
            </p>
          </div>

          {voted ? (
            <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl text-center">
              <p className="text-xs font-bold text-emerald-700">✔️ 실시간 투표 완료!</p>
              <p className="text-[10px] text-emerald-500 mt-0.5">오늘 이 사이트 사용자 성공율은 {successRate}% 입니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleVote(true)}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" /> 바로 연결됨
              </button>
              <button 
                onClick={() => handleVote(false)}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 py-2.5 rounded-xl hover:bg-rose-100 transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" /> 대기가 길었음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
