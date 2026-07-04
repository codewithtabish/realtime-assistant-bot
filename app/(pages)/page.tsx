// app/page.tsx

import AgentsList from "@/components/general/agenet-list";

export default function Home() {
  return (
    <div className="min-h-screen ">
     

        {/* Agents List */}
        <AgentsList />

        {/* Footer Info */}
        <div className="text-center mt-20 text-zinc-500 text-sm">
          Powered by OpenAI Realtime API • Built with Next.js
        </div>
      </div>
  );
}