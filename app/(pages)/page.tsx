import AgentsCarouselTwo from "@/components/smoothui/reviews-carousel";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden overflow-y-hidden">
      <Header />
      <Link href="/books" className="fixed top-4 right-4 z-50 rounded-md bg-primary px-4 py-2 text-white shadow-lg hover:bg-primary/90 transition-colors">
      Go to Books
      </Link>

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


// This is called runtime caching, and it's one of the most powerful features of a Service Worker.