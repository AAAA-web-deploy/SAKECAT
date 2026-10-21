/**
 * EDIT THIS FILE for the Ethereum contract, logo, name, and official links.
 * Leave a field blank rather than borrowing another token's address or socials.
 */
export const site = {
  brand: {
    tokenName: "CatFather",
    displayName: "CatFather",
    ticker: "CATFATHER",
    tagline: "Too calm for this much money.",
    shortTagline: "Count later. Rule now.",
    foundingYear: "2026",
    /** Circular mark in the nav and buy button. Replace with your official logo file. */
    logo: "/assets/branding/catfather-logo-circle-512.png",
  },
  /**
   * The live reference uses the palace portrait in the arch, the street photograph
   * in the newspaper, and the Paris lounge in the ledger. All three are user-supplied art.
   */
  images: {
    heroArch: "/assets/grand-tour/reel-01-the-palace.webp",
    newspaper: "/assets/hero/hero-cat.webp",
    ledger: "/assets/grand-tour/reel-09-paris-lounge.webp",
    doorPeek: "/assets/grand-tour/reel-01-the-palace.webp",
  },
  token: {
    chain: "Ethereum Mainnet",
    chainId: 1,
    contractAddress: "",
    totalSupply: "To be confirmed",
    buyTax: "To be confirmed",
    sellTax: "To be confirmed",
    launch: "To be announced",
    mint: "To be confirmed",
    liquidity: "To be confirmed",
    teamAllocation: "To be confirmed",
  },
  links: {
    buy: "",
    chart: "",
    x: "",
    telegram: "",
    website: "",
    xHandle: "",
    telegramHandle: "",
  },
  game: { durationSeconds: 60, initialLives: 3, savedScoreKey: "sakecat-rain-best" },
} as const;

export const contractIsValid = /^0x[a-fA-F0-9]{40}$/.test(site.token.contractAddress);

export const reels = [
  ["The Palace", "reel-01-the-palace.webp", "Palace hall"],
  ["The Mansion", "reel-02-the-mansion.webp", "Mansion steps"],
  ["Old Town", "reel-03-old-town.webp", "Cobblestone street"],
  ["First Class", "reel-04-first-class.webp", "Train platform"],
  ["Roman Sunset", "reel-05-roman-sunset.webp", "Rome at sunset"],
  ["The Villa", "reel-06-the-villa.webp", "Tuscan villa fountain"],
  ["Opera Night", "reel-07-opera-night.webp", "Opera house at night"],
  ["Red Carpet", "reel-08-red-carpet.webp", "Red carpet"],
  ["Paris Lounge", "reel-09-paris-lounge.webp", "Paris lounge"],
  ["The Back Room", "reel-10-the-back-room.webp", "Cigar lounge"],
].map(([title, file, alt], index) => ({
  title,
  alt,
  number: index + 1,
  image: `/assets/grand-tour/${file}`,
}));

export const posters = [
  ["Who let this boss in?", "poster-01.webp"],
  ["Too calm for this much money", "poster-02.webp"],
  ["Count later. Rule now.", "poster-03.webp"],
  ["Built different", "poster-04.webp"],
  ["Watching the room", "poster-05.webp"],
  ["Still calm", "poster-06.webp"],
  ["Night belongs to CatFather", "poster-07.webp"],
  ["Rich in style. Built for attention.", "poster-08.webp"],
].map(([title, file], index) => ({
  id: index + 1,
  title,
  image: `/assets/posters/${file}`,
}));

export const roadmap = [
  {
    id: "I",
    title: "The Arrival",
    tagline: "The boss walks in.",
    status: "Soon",
    live: false,
    items: ["Fair launch on Ethereum", "X and Telegram open", "Make It Rain goes live"],
  },
  {
    id: "II",
    title: "Made Cats",
    tagline: "The family grows.",
    status: "Next",
    live: false,
    items: ["Daily raids and meme drops", "Weekly high-score nights", "Holder poster contest"],
  },
  {
    id: "III",
    title: "The Empire",
    tagline: "Every screen, one boss.",
    status: "Planned",
    live: false,
    items: ["DEX trackers and trending pushes", "CoinGecko and CMC applications", "Collabs with other families"],
  },
  {
    id: "IV",
    title: "The Legacy",
    tagline: "Still calm. Always.",
    status: "Planned",
    live: false,
    items: ["Boss Lounge community events", "Sticker packs and merch", "Whatever the family votes for"],
  },
] as const;
