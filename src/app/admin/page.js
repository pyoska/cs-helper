"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Building2, 
  Search, 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  Settings,
  ShieldCheck,
  CreditCard,
  Building,
  TrendingUp,
  Tv,
  ShoppingBag,
  Info
} from "lucide-react";
import { customerData } from "@/data/customerData";

export default function AdminDashboardPage() {
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // 수정 필드 상태들
  const [editName, setEditName] = useState(customerData[0]?.name || "");
  const [editPhone, setEditPhone] = useState(customerData[0]?.phone || "");
  const [editHours, setEditHours] = useState(customerData[0]?.hours || "");
  const [editDescription, setEditDescription] = useState(customerData[0]?.description || "");
  const [editExperienceTip, setEditExperienceTip] = useState(customerData[0]?.experienceTip || "");
  const [editArsPath, setEditArsPath] = useState(customerData[0]?.ars_path || "");
  const [editWebUrl, setEditWebUrl] = useState(customerData[0]?.web_url || "");
  const [editCategory, setEditCategory] = useState(customerData[0]?.category || "");
  const [editIsVerified, setEditIsVerified] = useState(customerData[0]?.isVerified || false);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 전체 데이터 통계 계산
  const stats = useMemo(() => {
    const total = customerData.length;
    const verified = customerData.filter(x => x.isVerified).length;
    const categories = {};
    customerData.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    return { total, verified, categories };
  }, []);

  // 리스트 검색 필터
  const filteredList = useMemo(() => {
    return customerData
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => {
        const query = searchTerm.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.phone.includes(query)
        );
      });
  }, [searchTerm]);

  // 특정 아이템 선택 핸들러
  const handleSelect = (idx) => {
    const item = customerData[idx];
    if (!item) return;

    setSelectedIndex(idx);
    setEditName(item.name);
    setEditPhone(item.phone);
    setEditHours(item.hours);
    setEditDescription(item.description || "");
    setEditExperienceTip(item.experienceTip || "");
    setEditArsPath(item.ars_path || "");
    setEditWebUrl(item.web_url || "");
    setEditCategory(item.category || "");
    setEditIsVerified(item.isVerified || false);
    setMessage("");
  };

  // 저장 API 핸들러
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: selectedIndex,
          updatedItem: {
            name: editName,
            phone: editPhone,
            hours: editHours,
            description: editDescription,
            experienceTip: editExperienceTip,
            ars_path: editArsPath,
            web_url: editWebUrl,
            category: editCategory,
            isVerified: editIsVerified
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ 데이터 저장이 성공적으로 완료되었습니다! (Next.js 핫 릴로딩 반영됨)");
      } else {
        setMessage("❌ 에러 발생: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ 네트워크 연결 실패: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 관리자 헤더 */}
      <nav className="bg-slate-900 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-white hover:text-blue-400">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-400" />
              CS 고객센터 도우미 <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold">CMS-lite</span>
            </span>
          </div>
          <Link href="/" className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl transition-colors">
            사용자 페이지 바로가기
          </Link>
        </div>
      </nav>

      {/* 메인 관리 영역 */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 space-y-6">
        
        {/* 통계 요약 보드 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-3xs font-extrabold text-slate-400 tracking-wider uppercase block">전체 수집 기관</span>
              <strong className="text-2xl font-black text-slate-950 mt-1 block">{stats.total}개</strong>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Building className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-3xs font-extrabold text-slate-400 tracking-wider uppercase block">공식 검증 완료</span>
              <strong className="text-2xl font-black text-emerald-600 mt-1 block">{stats.verified}개</strong>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-3xs font-extrabold text-slate-400 tracking-wider uppercase block">카테고리 분야</span>
              <strong className="text-2xl font-black text-orange-600 mt-1 block">{Object.keys(stats.categories).length}개 분류</strong>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* 편집 분할 패널 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 왼쪽 목록 패널 (lg: 4cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col h-[600px] shadow-xs">
            <h3 className="text-sm font-black text-slate-900 mb-4">기관 목록 ({filteredList.length})</h3>
            
            {/* 검색바 */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="기관명, 대표번호 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* 목록 리스트 */}
            <div className="flex-grow overflow-y-auto space-y-1.5 scrollbar-none pr-1">
              {filteredList.map(({ item, index }) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-full p-3.5 rounded-xl text-left text-xs font-bold transition-all flex justify-between items-center ${
                    selectedIndex === index 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-750"
                  }`}
                >
                  <span className="truncate pr-2">{item.name}</span>
                  <span className={`text-4xs px-2 py-0.5 rounded-md shrink-0 ${
                    selectedIndex === index ? "bg-white/20 text-white" : "bg-slate-200 text-slate-650"
                  }`}>
                    {item.category}
                  </span>
                </button>
              ))}
              {filteredList.length === 0 && (
                <div className="text-center py-10 text-xs text-slate-400">일치하는 정보가 없습니다.</div>
              )}
            </div>
          </div>

          {/* 오른쪽 편집 폼 패널 (lg: 8cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-black text-slate-900">기관 세부 설정</h3>
                  <p className="text-2xs text-slate-400 mt-1">Index {selectedIndex}: customerData.js 파일의 원본 데이터를 실시간 수정합니다.</p>
                </div>
                {editIsVerified ? (
                  <span className="text-3xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    공식 인증 배지 활성화
                  </span>
                ) : (
                  <span className="text-3xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    비인증
                  </span>
                )}
              </div>

              {/* 편집 양식 */}
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">기관 및 업체명 (H1/Title 생성)</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">카테고리</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                  >
                    <option value="카드">카드/금융</option>
                    <option value="은행">은행/저축</option>
                    <option value="통신">통신/인터넷</option>
                    <option value="가전">가전/AS</option>
                    <option value="보험">보험/상조</option>
                    <option value="배달·쇼핑">배달/쇼핑</option>
                    <option value="항공·여행">항공/여행</option>
                    <option value="IT·플랫폼">IT/플랫폼</option>
                    <option value="자동차">자동차</option>
                    <option value="증권">증권사</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">대표전화 번호 (tel: 발신 연동)</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">고객센터 운영시간</label>
                  <input
                    type="text"
                    value={editHours}
                    onChange={(e) => setEditHours(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">ARS 단축 치트키 경로 (선택)</label>
                  <input
                    type="text"
                    value={editArsPath}
                    onChange={(e) => setEditArsPath(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-600">공식 웹사이트 URL</label>
                  <input
                    type="text"
                    value={editWebUrl}
                    onChange={(e) => setEditWebUrl(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="font-extrabold text-slate-600">기본 설명 문구 (SEO Meta)</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="font-extrabold text-slate-600">작성자 1인칭 경험 팁 (내가 직접 전화해 보니)</label>
                  <textarea
                    value={editExperienceTip}
                    onChange={(e) => setEditExperienceTip(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    required
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2 pt-2 select-none">
                  <input
                    type="checkbox"
                    id="isVerified"
                    checked={editIsVerified}
                    onChange={(e) => setEditIsVerified(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isVerified" className="font-extrabold text-slate-700 cursor-pointer">
                    2026.07.05 실시간 검증 완료 공식 정보 일치 여부 체크
                  </label>
                </div>

                {message && (
                  <div className="md:col-span-2 p-3.5 bg-blue-50/50 text-blue-700 font-bold rounded-xl border border-blue-100 mt-2">
                    {message}
                  </div>
                )}

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-extrabold px-6 py-4 rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/10 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <Save className="w-4.5 h-4.5" />
                    {saving ? "저장 진행 중..." : "설정 데이터 저장"}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-slate-150 py-6 text-slate-400 text-3xs shadow-inner mt-12 text-center">
        <p>© 2026 CS 고객센터 도우미 CMS-lite. 사당동 1010-29 4층.</p>
      </footer>
    </div>
  );
}
