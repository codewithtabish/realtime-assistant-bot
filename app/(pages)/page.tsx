// app/page.tsx

import AgentsList from "@/components/general/agenet-list";
import AgentsStack from "@/components/general/agenet-stack";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Mobile */}
     <div className="block md:hidden">
  <section className="px-5 pt-8 pb-6 text-center">
   
  <AgentsStack/>
  </section>


</div>

      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <AgentsList />
      </div>
    </div>
  );
}