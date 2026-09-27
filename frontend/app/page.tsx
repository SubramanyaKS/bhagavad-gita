import ThreePath from "./component/ThreePath";
import ExploreTheme from "./component/ExploreTheme";
import BeginJourney from "./component/BeginJourney";
import VerseofDay from "./component/VerseofDay";
import HeroComponent from "./component/HeroComponent";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#29251f]">
      <HeroComponent/>
     <VerseofDay/>
      <ThreePath/>
      <ExploreTheme/>
      <BeginJourney/>
    </main>
  );
}