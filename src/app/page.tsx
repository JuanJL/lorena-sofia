import BookCoverHero from "@/components/BookCoverHero";
import Chapter1SaveTheDate from "@/components/Chapter1SaveTheDate";
import Chapter2Story from "@/components/Chapter2Story";
import Chapter3Details from "@/components/Chapter3Details";
import Chapter4Glossary from "@/components/Chapter4Glossary";
import Chapter5RSVP from "@/components/Chapter5RSVP";
import Chapter6Epilogue from "@/components/Chapter6Epilogue";

export default function Home() {
  return (
    <main className="relative">
      <BookCoverHero />
      <Chapter1SaveTheDate />
      <Chapter2Story />
      <Chapter3Details />
      <Chapter4Glossary />
      <Chapter5RSVP />
      <Chapter6Epilogue />
    </main>
  );
}
