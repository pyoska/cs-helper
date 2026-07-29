"use client";

import { useState } from "react";
import { Globe, Phone, Clock, CheckCircle2, Copy, Check } from "lucide-react";

const LANG_DATA = [
  {
    code: "ko",
    flag: "🇰🇷",
    name: "한국어",
    title: "1330 관광통역안내전화 (24시간 무상)",
    subtitle: "한국관광공사 공식 24시간 8개 국어 무료 통역 및 정보 안내",
    dialNotice: "국내 통화 시 1330 (서울/지방 02-1330)",
    tipHeader: "💡 1330 3자 통화 이용 팁",
    tipBody: "택시 기사, 호텔, 식당 등 외국인과 대화 중 언어 장벽이 있을 때 1330으로 전화하시면 즉시 3자 통화로 100% 무료 동시통역을 지원합니다.",
    subtasks: [
      { name: "관광통역 및 안내 (한국어/영/일/중 등 8개국어)", phone: "1330" },
      { name: "외국인 관광 불편신고 및 긴급 민원", phone: "1330" },
      { name: "지역별 관광정보 유선 연결", phone: "02-1330" }
    ]
  },
  {
    code: "en",
    flag: "🇺🇸",
    name: "English",
    title: "1330 Korea Travel Helpline (24/7 Free)",
    subtitle: "Official 24/7 Tourist Information & Interpretation by KTO",
    dialNotice: "Dial 1330 in Korea (02-1330 for regional info)",
    tipHeader: "💡 3-Way Interpretation Call Tip",
    tipBody: "When communicating with taxi drivers, hotel staff, or restaurants, call 1330 for free real-time 3-way interpretation.",
    subtasks: [
      { name: "Tourist Interpretation & Info (English)", phone: "1330" },
      { name: "Tourist Complaints & Emergency Assistance", phone: "1330" },
      { name: "Regional Tourism Info Direct Line", phone: "02-1330" }
    ]
  },
  {
    code: "ja",
    flag: "🇯🇵",
    name: "日本語",
    title: "1330 韓国観光通訳案内電話 (24時間無料)",
    subtitle: "韓国観光公社公式 24時間 日本語通訳＆旅行案内サービス",
    dialNotice: "韓国国内から 1330（ソウル/市外 02-1330）",
    tipHeader: "💡 3者通訳機能のご利用ガイド",
    tipBody: "タクシー運転手、ホテル、レストランとの会話で言葉に困った場合、1330に電話すると即座に日本語通訳士が3者通話でサポートします。",
    subtasks: [
      { name: "観光通訳＆案内（日本語専用）", phone: "1330" },
      { name: "観光苦情・緊急サポート", phone: "1330" },
      { name: "地域別観光情報案内", phone: "02-1330" }
    ]
  },
  {
    code: "zh",
    flag: "🇨🇳",
    name: "中文",
    title: "1330 韩国旅游咨询与翻译电话 (24小时免费)",
    subtitle: "韩国旅游发展局官方 24小时 中文翻译与旅游指南",
    dialNotice: "韩国境内直拨 1330（首尔及各地 02-1330）",
    tipHeader: "💡 三方通话翻译使用指南",
    tipBody: "在出租车、酒店、餐厅遇到沟通障碍时，拨打1330即可获得专业中文翻译员提供的免费三方实时翻译。",
    subtasks: [
      { name: "旅游翻译与咨询（中文服务）", phone: "1330" },
      { name: "旅游投诉与紧急协助", phone: "1330" },
      { name: "地区旅游信息查询", phone: "02-1330" }
    ]
  },
  {
    code: "ru",
    flag: "🇷🇺",
    name: "Русский",
    title: "1330 Линия туристической помощи (24/7 Бесплатно)",
    subtitle: "Официальный круглосуточный перевод и гид от НОТК (KTO)",
    dialNotice: "Звоните 1330 в Корее (02-1330 для регионов)",
    tipHeader: "💡 Как использовать 3-сторонний перевод",
    tipBody: "При общении с водителями такси, отелями или ресторанами позвоните по номеру 1330 для бесплатного перевода.",
    subtasks: [
      { name: "Туристический перевод (Русский)", phone: "1330" },
      { name: "Жалобы и экстренная помощь", phone: "1330" },
      { name: "Информация о регионах", phone: "02-1330" }
    ]
  },
  {
    code: "vi",
    flag: "🇻🇳",
    name: "Tiếng Việt",
    title: "1330 Đường dây nóng Du lịch Hàn Quốc (24/7 Miễn phí)",
    subtitle: "Thông tin du lịch & phiên dịch 24/7 chính thức từ KTO",
    dialNotice: "Bấm 1330 tại Hàn Quốc (02-1330 cho vùng khác)",
    tipHeader: "💡 Mẹo gọi phiên dịch 3 bên",
    tipBody: "Khi giao tiếp với tài xế taxi, khách sạn hoặc nhà hàng, hãy gọi 1330 để được phiên dịch viên hỗ trợ miễn phí.",
    subtasks: [
      { name: "Phiên dịch & Hướng dẫn Du lịch (Tiếng Việt)", phone: "1330" },
      { name: "Hỗ trợ Khẩn cấp & Khiếu nại", phone: "1330" },
      { name: "Thông tin du lịch vùng", phone: "02-1330" }
    ]
  },
  {
    code: "th",
    flag: "🇹🇭",
    name: "ภาษาไทย",
    title: "1330 ศูนย์บริการข้อมูลท่องเที่ยวเกาหลี (24 ชั่วโมง)",
    subtitle: "บริการล่ามและข้อมูลท่องเที่ยวเกาหลีฟรี 24 ชั่วโมง โดย KTO",
    dialNotice: "โทร 1330 ในเกาหลี (02-1330 สำหรับต่างจังหวัด)",
    tipHeader: "💡 คำแนะนำการใช้บริการล่าม 3 สาย",
    tipBody: "เมื่อต้องการสื่อสารกับคนขับแท็กซี่ พนักงานโรงแรม หรือร้านอาหาร โทร 1330 เพื่อขอล่ามแปลภาษาฟรี",
    subtasks: [
      { name: "บริการล่ามและข้อมูลท่องเที่ยว (ภาษาไทย)", phone: "1330" },
      { name: "ร้องเรียนและช่วยเหลือฉุกเฉิน", phone: "1330" },
      { name: "ข้อมูลท่องเที่ยวแต่ละภูมิภาค", phone: "02-1330" }
    ]
  },
  {
    code: "id",
    flag: "🇮🇩",
    name: "Bahasa Indo",
    title: "1330 Layanan Informasi & Penerjemah Wisata (24/7 Gratis)",
    subtitle: "Layanan Penerjemah & Panduan Wisata Resmi KTO 24 Jam",
    dialNotice: "Hubungi 1330 di Korea (02-1330 untuk daerah)",
    tipHeader: "💡 Panduan Panggilan Penerjemah 3 Arah",
    tipBody: "Saat berkomunikasi dengan sopir taksi, staf hotel, atau restoran, hubungi 1330 untuk penerjemahan gratis.",
    subtasks: [
      { name: "Penerjemah & Informasi Wisata (Bahasa Indo)", phone: "1330" },
      { name: "Bantuan Darurat & Keluhan Wisata", phone: "1330" },
      { name: "Informasi Wisata Daerah", phone: "02-1330" }
    ]
  }
];

export default function MultiLangHelplineCard() {
  const [activeLang, setActiveLang] = useState("ko");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const current = LANG_DATA.find(x => x.code === activeLang) || LANG_DATA[0];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-700/40 my-8">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-blue-400/30">
            <Globe className="w-6 h-6 text-blue-400 animate-spin-slow" />
          </div>
          <div>
            <span className="text-2xs font-extrabold text-blue-300 bg-blue-400/20 px-3 py-1 rounded-full uppercase tracking-wider">
              8-Language 24/7 Helpline
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              다국어 24시간 관광통역 다이얼
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-300">
          <Clock className="w-4 h-4" /> 24Hours 365Days Free
        </div>
      </div>

      {/* Language Selector Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {LANG_DATA.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              activeLang === lang.code
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105 border border-blue-400"
                : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Active Language Content Display */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-6">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>{current.flag}</span> {current.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">{current.subtitle}</p>
        </div>

        {/* Big Call Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-5 bg-blue-600/30 rounded-2xl border border-blue-400/40">
          <div className="flex items-center gap-4">
            <a 
              href="tel:1330"
              className="w-14 h-14 bg-blue-500 hover:bg-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 shrink-0"
            >
              <Phone className="w-7 h-7" />
            </a>
            <div>
              <p className="text-2xs font-extrabold text-blue-200 uppercase tracking-widest">{current.dialNotice}</p>
              <a href="tel:1330" className="text-3xl font-black text-white tracking-tight hover:underline">
                1330
              </a>
            </div>
          </div>
          <a
            href="tel:1330"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white text-sm font-extrabold rounded-xl text-center shadow-md transition-colors"
          >
            Direct Dial 1330 📞
          </a>
        </div>

        {/* Tip Box */}
        <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-500/30 text-xs sm:text-sm text-slate-200">
          <p className="font-extrabold text-blue-300 mb-1">{current.tipHeader}</p>
          <p className="leading-relaxed">{current.tipBody}</p>
        </div>

        {/* Subtask Table */}
        <div>
          <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
            Dial Menu Options
          </p>
          <div className="space-y-2">
            {current.subtasks.map((task, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <span className="font-semibold text-slate-200">{task.name}</span>
                <div className="flex items-center gap-3">
                  <a href={`tel:${task.phone}`} className="font-extrabold text-blue-400 hover:underline">
                    {task.phone}
                  </a>
                  <button
                    onClick={() => handleCopy(task.phone, idx)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone Number"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
