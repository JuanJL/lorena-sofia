import ExperienceHero from "@/components/ExperienceHero";
import ExperienceSection from "@/components/ExperienceSection";
import DetailsSection from "@/components/DetailsSection";
import DressCodeSection from "@/components/DressCodeSection";
import MusicSection from "@/components/MusicSection";
import MomentsSection from "@/components/MomentsSection";
import RSVPSection from "@/components/RSVPSection";
import TeaserFooter from "@/components/TeaserFooter";

export default function Home() {
  return (
    <main className="relative">
      <ExperienceHero />
      <ExperienceSection />
      <DetailsSection />
      <DressCodeSection />
      <MusicSection />
      <MomentsSection />
      <RSVPSection />
      <TeaserFooter />
    </main>
  );
}
