// data/agents.ts
export interface Agent {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  voice: string;
  voiceProperty: string;
  expertise: string;
  description: string;
  image: string;
  toolsEnabled: boolean;
  instructions: string;
}

export const agents: Agent[] = [
  {
    id: 0,
    name: "Emma Thompson",
    gender: "Female",
    voice: "Alloy",
    voiceProperty: "Soft & Warm",
    expertise: "English Language",
    description: "Patient and encouraging English tutor for all levels",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Emma, an expert English language tutor...",
  },
  {
    id: 1,
    name: "Aarav Sharma",
    gender: "Male",
    voice: "Shimmer",
    voiceProperty: "Cheerful & Energetic",
    expertise: "Hindi & Urdu",
    description: "Friendly tutor helping with Hindi and Urdu conversation",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Aarav, an expert Hindi & Urdu tutor...",
  },
  {
    id: 2,
    name: "Layla Al-Sayed",
    gender: "Female",
    voice: "Nova",
    voiceProperty: "Gentle & Elegant",
    expertise: "Arabic Language",
    description: "Passionate Modern Standard Arabic teacher",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Layla, an expert Arabic language tutor...",
  },
  {
    id: 3,
    name: "Hans Müller",
    gender: "Male",
    voice: "Echo",
    voiceProperty: "Clear & Professional",
    expertise: "German Language",
    description: "Structured and friendly German tutor",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Hans, an expert German language tutor...",
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    gender: "Female",
    voice: "Alloy",
    voiceProperty: "Warm & Expressive",
    expertise: "Spanish Language",
    description: "Energetic Spanish conversation partner",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Sofia, an expert Spanish language tutor...",
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    gender: "Female",
    voice: "Shimmer",
    voiceProperty: "Calm & Precise",
    expertise: "Japanese Language",
    description: "Patient Japanese tutor focusing on natural conversation",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Yuki, an expert Japanese language tutor...",
  },
  {
    id: 6,
    name: "Liam Dubois",
    gender: "Male",
    voice: "Echo",
    voiceProperty: "Friendly & Clear",
    expertise: "French Language",
    description: "Passionate French tutor for beginners to advanced",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Liam, an expert French language tutor...",
  },
];