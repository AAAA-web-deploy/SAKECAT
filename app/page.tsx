import { ClubDoor } from "@/components/ClubDoor";
import { Atmosphere } from "@/components/Atmosphere";
import { Ticker } from "@/components/Ticker";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { GrandTour } from "@/components/GrandTour";
import { MakeItRain } from "@/components/MakeItRain";
import { PosterWall } from "@/components/PosterWall";
import { Ledger } from "@/components/Ledger";
import { Roadmap } from "@/components/Roadmap";
import { HowToBuy } from "@/components/HowToBuy";
import { Footer } from "@/components/Footer";
import { BuyFab } from "@/components/BuyFab";

export default function HomePage() {
  return (
    <>
      <ClubDoor />
      <Atmosphere />
      <Ticker />
      <main>
        <Hero />
        <Story />
        <GrandTour />
        <MakeItRain />
        <PosterWall />
        <Ledger />
        <Roadmap />
        <HowToBuy />
      </main>
      <Footer />
      <BuyFab />
    </>
  );
}
