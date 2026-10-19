import type { Metadata, Viewport } from "next";
import { Abril_Fatface, Cormorant_Garamond, Limelight, Oswald, Special_Elite } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/paths";

const display = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const deco = Limelight({ weight: "400", subsets: ["latin"], variable: "--font-deco" });
const body = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
});
const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-type" });
const label = Oswald({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-label" });

export const metadata: Metadata = {
  title: `${site.brand.tokenName} · $${site.brand.ticker}`,
  description: `${site.brand.tokenName} ($${site.brand.ticker}) — the cigar-smoking dollar millionaire of Ethereum. ${site.brand.tagline}`,
  openGraph: {
    title: `${site.brand.tokenName} · $${site.brand.ticker}`,
    description: `${site.brand.tagline} The boss of Ethereum.`,
    images: [{ url: site.images.heroArch }],
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0906" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${deco.variable} ${body.variable} ${typewriter.variable} ${label.variable}`}>
      <body style={{ ["--grain" as string]: `url(${asset("/assets/textures/film-grain.svg")})`, ["--cigar-cursor" as string]: `url(${asset("/assets/cursors/cigar.svg")}) 2 8` }}>
        {children}
      </body>
    </html>
  );
}
