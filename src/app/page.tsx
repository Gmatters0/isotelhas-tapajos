import { Hero } from "@/components/sections/Hero";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { ShowroomSection } from "@/components/sections/ShowroomSection";
import { QuoteFormSection } from "@/components/sections/QuoteFormSection";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <ManifestoSection />
      <ShowcaseSection />
      <ShowroomSection />
      <QuoteFormSection />
    </main>
  );
}
