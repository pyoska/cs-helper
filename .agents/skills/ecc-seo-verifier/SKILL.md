---
name: ecc-seo-verifier
description: ECC Verification Loop skill for 100% all-platform canonical routing, Schema.org 5-types, and robots/sitemap parity on cshelper.kr.
---

# ECC SEO Verifier Skill

This skill enforces the ECC Verification Loop for Search Engine Optimization across Google, Naver, Daum, Bing, Zum, and AI search crawlers.

## 🔍 Verification Checklist

1. **Cross-Domain Canonical Integrity**:
   - ALL pages MUST use `https://cshelper.kr` (non-www).
   - ALL `www.cshelper.kr` requests MUST return `HTTP 308 Permanent Redirect`.

2. **Schema.org 5-Type Verification**:
   - `LocalBusiness` & `ContactPoint` on `[slug]/page.js`.
   - `ItemList` on `page.js` and `CategoryContent.js`.
   - `Article` on `tag/[tag]/page.js`.
   - `FAQPage` on detail and hub pages.

3. **Crawl Budget Protection (`public/robots.txt`)**:
   - Explicitly ALLOW: Yeti, Googlebot, Daumoa, Bingbot, ZumBot, GPTBot, PerplexityBot, ClaudeBot, Bytespider, Google-Extended.
   - DISALLOW: `/search`, `/admin`, `/api/`, `/management`.
