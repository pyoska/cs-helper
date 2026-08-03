---
name: ecc-performance-harness
description: ECC Agent Harness for sub-100ms TTFB SSG performance, 0-Defect build gate execution, and mobile utility optimization on cshelper.kr.
---

# ECC Performance Harness Skill

This skill enforces high-performance static site generation (SSG) and zero-defect QA gates.

## 🚀 Performance & Build Gate Standards

1. **Zero-Bypass Build Gate & Direct Vercel Deployment**:
   - MUST run `node scripts/verify-all.js` before any deployment.
   - Deploy directly via Vercel CLI (`npx vercel --prod`) without pushing to GitHub or external Git remotes.
   - MUST compile 1,118+ static pages cleanly with 0 errors and 0 warnings.

2. **Mobile Fast-Pass Utility**:
   - Phone dial button (`tel:`) and ARS cheat key MUST be rendered within the first fold (< 250px scroll).
   - Tailwind v4 theme tokens MUST be explicitly defined in `globals.css` `@theme` block.
