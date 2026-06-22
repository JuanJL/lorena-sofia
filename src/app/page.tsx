import BookCoverHero from "@/components/BookCoverHero";
import Chapter1SaveTheDate from "@/components/Chapter1SaveTheDate";
import Chapter2Story from "@/components/Chapter2Story";
import Chapter3Details from "@/components/Chapter3Details";
import AfterpartySection from "@/components/AfterpartySection";
import Chapter4Glossary from "@/components/Chapter4Glossary";
import Chapter5RSVP from "@/components/Chapter5RSVP";
import Chapter6SummerPastel from "@/components/Chapter6SummerPastel";
import Chapter7Epilogue from "@/components/Chapter7Epilogue";
import { SHOW_AFTERPARTY } from "@/lib/config";

export default function Home() {
  return (
    <main className="relative">
      <BookCoverHero />
      <Chapter1SaveTheDate />
      <Chapter2Story />
      <Chapter3Details />
      {SHOW_AFTERPARTY && <AfterpartySection />}
      <Chapter4Glossary />
      <Chapter5RSVP />
      <Chapter6SummerPastel />
      <Chapter7Epilogue />
    </main>
  );
}
