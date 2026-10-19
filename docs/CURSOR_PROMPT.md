# Cursor build/refinement prompt

You are working on a complete Next.js 15 + TypeScript + Tailwind CSS 3 SAKE CAT Ethereum landing-page codebase. The files are already present. **DO NOT start from scratch.** Inspect `README.md`, `lib/site-config.ts`, `app/globals.css`, all `components/`, and `public/assets/` before making changes.

Goal: Bring the existing implementation as close as practical to https://sakecat.lol/ for desktop, tablet and mobile by comparing against the live page in the browser, while keeping independently written React logic and honoring ownership/licensing. Do not fetch or invent copyrighted media not supplied by the owner. Preserve all site sections and functionality.

Required fidelity checklist:
1. Preserve section order and scrolling anchors: door → nav → hero → Daily Whiskers → Grand Tour → Make It Rain → Poster Wall → Ledger → House Rules → Get Made → footer.
2. Match typography sizes, color palette, paper grain, frame lines, art crops, spacing, overall density and transition pacing with visual screenshot comparison. The user's archive art is already mapped in `lib/site-config.ts`.
3. Check 3-knock door and skip. Confirm menu works on mobile.
4. Confirm Grand Tour arrows/thumbs/swipe and Poster Wall modal/navigation/download.
5. Confirm fully working 60-second game: falling bills (+$1K), bundles (+$10K), gold (+$50K), cigar (6s Boss Mode, 3x + magnet), taxman (-25% score), candle (-1 life), 3 lives, best score saved locally. Mouse, touchscreen and arrow keys must work without scroll interference.
6. Make CA, ticker, logo and all official links editable ONLY through `lib/site-config.ts` (no hardcoded fake CA). A missing CA must never be presented as a valid one.
7. Ethereum mainnet = chain ID 1, ETH for gas, Ethereum-compatible wallets and a verifiable swap pair. Never leave any Solana/pump.fun instructions, inaccurate mint-authority claims or unverified guarantees.
8. Run `npm install`, `npm run typecheck`, `npm run lint`, `npm run build` and fix all errors. Test at widths 375, 768, 1280, 1600px. Add screenshots for regression checking only if a screenshot tool is available.
9. Accessibility: semantic headings, contrast, reduced motion, focus-visible, modal keyboard behavior, meaningful alt text and disabled links.
10. Avoid introducing a backend, account/login flow, financial guarantees or unrelated UI redesigns.

Deliver: a successful build, a summary of fixes, screenshots showing desktop/mobile, and a list of remaining limitations, WITHOUT claiming original code was recovered or that pixel-perfect similarity was automatically proven.
