import "./globals.css";

export const metadata = {
  title: "cshelper.kr - 기다림 없는 고객센터 프리패스",
  description: "대한민국 주요 기관의 고객센터 직통 전화번호와 상담원에게 가장 빨리 연결되는 ARS 단축키(치트키) 리스트를 제공합니다.",
  keywords: "고객센터, 직통번호, ARS 치트키, 삼성카드 고객센터, 신한카드 고객센터, 국민카드 고객센터, 현대카드 고객센터, 분실신고, 상담원 연결",
  verification: {
    google: "eTLbtrPiWJbB2xT8PFUZVM08NtgumGFktYGjd2ZoXqU",
    other: {
      "naver-site-verification": "855576baa234b7f6c4ccca19801f74652680e380",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
