<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CS Helper Project Operating Rules

These are project-scoped rules for cshelper.kr that the agent MUST always follow.

## 1. Persona and Tone of Voice
- Write all customer center guides, 1st-person experience tips (`experienceTip`), and tag articles in a **professional, authoritative consultant persona**.
- Speak in the 1st person ("제가 직접 해보니", "저희 운영팀이 확인한 바에 따르면").
- Deliver information clearly, decisively, and with confidence (단정적이고 신뢰감 높은 말투), while remaining polite and accessible to the general public.

## 2. Dynamic SEO and Metadata Optimization
- Ensure every single static and dynamic page (such as `/[slug]` and `/tag/[tag]`) generates customized `<title>`, `<meta>` description, and Schema.org structured data (JSON-LD) dynamically to prevent duplicate content penalties and ensure 100% search engine indexation.

## 3. SEO Landing Hubs (Tag Pages)
- Every `/tag/[tag]` route must function as a high-value landing page combining:
  1. The specific tag filter search list.
  2. A highly informative, 300+ words 1st-person expert guide with structured HTML headers (`<h2>`, `<p>`).
  3. A fallback mechanism that serves a helpful customer service call reduction guide instead of rendering an empty page.

## 4. User Satisfaction & Layout Hierarchy
- Place the most critical user-facing elements—such as the verified telephone number, one-click dialing buttons, and operating hours—at the very top of detail page contents.
- Keep the landing pages and dashboard light and optimized for lightning-fast mobile loads.

## 5. Mandatory Disclaimer Badges
- Every informational article, detail page, and tag landing page guide MUST render the legal disclaimer badge:
  `"본 정보는 참고용이며 공식 채널을 통해 재확인하십시오"` (This information is for reference only, please reconfirm via the official corporate channels).

## 6. Zero-Guesswork & Fact Verification (100% 사실 확인 및 사고 설계 지침)
- All strategic decisions, technical diagnoses, and performance reports MUST be grounded in empirical code audits (`node scripts/verify-all.js`), real HTTP headers, and 100% verified facts. No assumptions or unverified claims allowed.

## 7. Team-Specific Standard Operating Procedures & Zero-Recurrence Verification (팀별 세부 업무지침서 및 무결점 재발 방지 규정)

### 7.1 SEO & Routing Division (SEO 및 라우팅 전담팀)
- **Cross-Domain Integrity Check**: Before completing any URL or slug update, run automated validation to confirm that `<link rel="canonical">`, OpenGraph, Twitter Cards, JSON-LD, `sitemap.xml`, and `rss.xml` use identical domain strings (`https://cshelper.kr`) without exception.
- **Malformed URL Exception Protection**: Every dynamic route MUST handle special characters (`+`, `%2B`, spaces, malformed percent sequences) without ever returning HTTP 400 Bad Request or 500 Server Error. Use fallback fuzzy matching (`normalizeSlugKey`).

### 7.2 Content & Natural Language Division (콘텐츠 및 자연어 큐레이션팀)
- **AI-Boilerplate Elimination**: Never use repetitive sentence starters (e.g. `"내가 직접 전화를..."`, `"저희 CS 운영팀이..."`) across data entries. Every entry in `customerData.js` must have 100% unique sentence starters tailored to the specific company and industry.
- **Fact-Based 1st-Person E-E-A-T**: All 1st-person tips (`experienceTip`) must be grounded in verified company phone numbers, actual ARS shortcut codes, and real operating hours. No deceptive or fake real-time claims allowed.

### 7.3 UX, Styling & Policy Division (UX/디자인 및 정책 검수팀)
- **Tailwind v4 Theme Token Discipline**: Any custom color shade, font size, or box shadow used in components MUST be explicitly defined in the `globals.css` `@theme` block before commit to prevent text cloaking or unstyled layout bugs.
- **AdSense Policy Compliance**: Ensure legal disclaimer badges (`"본 정보는 참고용이며 공식 채널을 통해 재확인하십시오"`) are rendered on 100% of data pages. Prevent layout overlaps between sticky call bars and main text.

### 7.4 DevOps & QA Division (배포 및 전수검사 QA팀)
- **Zero GitHub Code Exposure Policy**: NEVER push code to GitHub or external Git remotes to protect source code privacy. Disconnect all Git remotes.
- **Direct Vercel CLI Deployment**: Deploy production releases directly from the local directory via Vercel CLI (`npx vercel --prod`).
- **Zero-Bypass Build Gate**: Execute `node scripts/verify-all.js` and verify that all static pages build cleanly with 0 warnings or errors prior to Vercel deployment.
- **Production Verification**: Verify Vercel production deployment status and confirm domain routing (`cshelper.kr` Production) immediately following any deployment.



