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
        <ReviewsCarousel />
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <AgentsList />
      </div>
    </div>
  );
}