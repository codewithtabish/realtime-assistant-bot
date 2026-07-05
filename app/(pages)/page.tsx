// app/page.tsx

import AgentsList from "@/components/general/agenet-list";
import { Header } from "@/components/header";
import ReviewsCarousel from "@/components/smoothui/reviews-carousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Mobile */}
     <div className="block md:hidden">
  <section className="px-5 pt-8 pb-6 text-center">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">
      Choose Your AI Tutor
    </h1>

    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
      Learn naturally with expert AI tutors. Swipe through the available
      tutors, choose the one that matches your learning style, and start a
      real-time voice conversation in seconds.
    </p>
  </section>

  <ReviewsCarousel />
</div>

      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <AgentsList />
      </div>
    </div>
  );
}