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

