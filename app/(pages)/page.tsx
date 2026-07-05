// app/page.tsx

import AgentsList from "@/components/general/agenet-list";
import AgentsStack from "@/components/general/agenet-stack";
import { Header } from "@/components/header";
import ReviewsCarousel, { Review } from "@/components/smoothui/reviews-carousel";

export default function Home() {
  
const sampleReviews: Review[] = [
  {
    id: 1,
    body: "SmoothUI has completely transformed how I build user interfaces. The animations are smooth, the components are well-designed, and the documentation is excellent. Highly recommend!",
    author: "Sarah Johnson",
    title: "Frontend Developer at TechCorp",
  },
  {
    id: 2,
    body: "I've been using SmoothUI for my latest project and I'm impressed by the quality of the components. The spring animations feel natural and the API is intuitive.",
    author: "Michael Chen",
    title: "UI/UX Designer",
  },
  {
    id: 3,
    body: "The best part about SmoothUI is how easy it is to customize. I can create beautiful, animated interfaces without spending hours on implementation details.",
    author: "Emily Rodriguez",
    title: "Full Stack Developer",
  },
  {
    id: 4,
    body: "As someone who values both aesthetics and performance, SmoothUI hits the perfect balance. The components are performant and look amazing.",
    author: "David Kim",
    title: "Product Engineer",
  },
  {
    id: 5,
    body: "The carousel component is particularly impressive. The spring physics make the interactions feel natural and delightful. Great work!",
    author: "Lisa Anderson",
    title: "Creative Director",
  },
];
  return (
    <div className="min-h-screen">
      <Header />

      {/* Mobile */}
     <div className="block md:block">
  <section className="px-5 pt-8 pb-6 text-center">
            <ReviewsCarousel height="300px" reviews={sampleReviews} />

   
  </section>


</div>

      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <AgentsList />
      </div>
    </div>
  );
}