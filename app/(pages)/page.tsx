// app/page.tsx

import AgentsList from "@/components/general/agenet-list";
import { Header } from "@/components/header";
import AgentsCarouselTwo from "@/components/smoothui/reviews-carousel";

export default function Home() {
  

  return (
    <div className="min-h-screen">
      <Header />

      {/* Mobile */}
     <div className="block ">
  <section className="px-5 pt-8 pb-6 text-center">
    <AgentsCarouselTwo/>

   
  </section>


</div>

      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <AgentsList />
      </div>
    </div>
  );
}