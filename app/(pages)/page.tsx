import AgentsCarouselTwo from "@/components/smoothui/reviews-carousel";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content - Full Height on All Devices */}
      <main className="flex-1 flex flex-col md:min-h-screen">
        <section className="flex-1 px-5 pt-8 pb-12 text-center flex items-center justify-center">
          <div className="w-full">
            <AgentsCarouselTwo />
          </div>
        </section>

        {/* Add other sections here */}
      </main>
    </div>
  );
}