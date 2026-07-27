import CategoryContent from "./CategoryContent";

const siteUrl = "https://cshelper.kr";

export async function generateStaticParams() {
  const categories = ["카드", "은행", "통신", "가전", "보험", "배달·쇼핑", "항공·여행", "IT·플랫폼", "자동차", "증권", "기타"];
  return categories.map(cat => ({
    category: encodeURIComponent(cat)
  }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const cleanCategory = decodedCategory.trim();
  const canonicalUrl = `${siteUrl}/category/${encodeURIComponent(cleanCategory)}`;
  const title = `${cleanCategory} 고객센터 대표전화 모음 및 ARS 단축키 - CS 고객센터 도우미`;
  const description = `대한민국 주요 ${cleanCategory} 관련 기업 고객센터 대표 전화번호, ARS 0번 직통 연결 단축키, 상담 운영시간, 피크시간 회피 노하우를 한눈에 확인하세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "CS 고객센터 도우미",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return <CategoryContent rawCategory={decodedCategory} />;
}
