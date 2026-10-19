# SAKE CAT — Ethereum website

A Next.js 15 + React 19 + TypeScript + Tailwind CSS recreation of the public [SAKE CAT](https://sakecat.lol/) landing page, adapted for **Ethereum mainnet**. The interactions are written in this project. The illustrations in `public/assets` are the supplied artworks.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck
npm run lint
npm run build
npm run verify
```

`npm run build` writes a static site to `out/`.

## Customize

Edit only `lib/site-config.ts`:

| Field | Purpose |
| --- | --- |
| `brand.tokenName`, `brand.ticker` | Name and ticker |
| `brand.logo` | Circular mark. Point this at your official logo file in `public/` |
| `token.contractAddress` | `0x` plus 40 hex characters. Blank stays “Coming soon” |
| `token.totalSupply`, taxes, launch, mint, liquidity, team | Leave as “To be confirmed” until you verify them on-chain |
| `links.buy`, `links.chart`, `links.x`, `links.telegram` | Official `https://` URLs. Empty buttons do not navigate |
| `links.xHandle`, `links.telegramHandle` | Labels shown beside the footer links |
| `roadmap` | Phase copy and status. Set `live: true` only after that phase is actually live |

Do not paste another token’s contract, logo, or social accounts into this file. Buy and chart controls stay on this site until a real HTTPS destination is set. There is no wallet-connection or transaction-signing code.

## Deploy

GitHub Pages is set up in `.github/workflows/pages.yml`. Pushes to `main` build with `NEXT_PUBLIC_BASE_PATH=/SAKECAT` and publish to:

https://aaaa-web-deploy.github.io/SAKECAT/

The repository Pages setting must use **GitHub Actions** as the source. Local `npm run dev` leaves the base path empty, so asset paths stay at `/assets/...`.

Any static host can serve the `out/` folder. If the site is not at the domain root, set `NEXT_PUBLIC_BASE_PATH` before `npm run build`.

## What was matched, and what is still open

The page follows the reference section order, type stack (Abril Fatface, Limelight, Cormorant Garamond, Special Elite, Oswald), gilt palette, door, tape, arched hero, newspaper, film strip, canvas game, poster wall, ledger, roadmap, buy steps, and footer.

Still different on purpose, or because the value was not supplied:

- Contract, logo file, X, and Telegram are placeholders. Phase I reads **Soon**, not Live, until you mark it live.
- Ledger supply, tax, mint, liquidity, and team rows say they are unconfirmed. The Solana site’s “revoked / burned / 0% / none” lines are not repeated as facts.
- Buy instructions use ETH, gas, and an Ethereum wallet. They do not link to the Solana token.
- The arch portrait is the palace artwork, which is what the reference shows. The street photograph is the newspaper picture. Both are supplied files.
- Poster lightbox adds previous, next, and save, which the reference lightbox does not.
- A Menu button appears under 600px so the links the reference hides on small screens stay reachable.
- Original font files, cursor bitmap, and game sprites were not in the asset pack. Type is loaded from Google Fonts, and the game art is redrawn to the same shapes.

This is a close recreation checked against the live page. It is not a claim that every pixel was measured and matched.
