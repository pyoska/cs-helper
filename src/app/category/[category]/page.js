import CategoryContent from "./CategoryContent";

export async function generateStaticParams() {
  const categories = ["카드", "은행", "통신", "가전", "보험", "배달·쇼핑", "항공·여행", "IT·플랫폼", "자동차", "증권", "기타"];
  return categories.map(cat => ({
    category: encodeURIComponent(cat)
  }));
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return <CategoryContent rawCategory={decodedCategory} />;
}
