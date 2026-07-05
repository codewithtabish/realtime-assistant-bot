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
  rating: number;
  students: number;
  languages: string[];
  fluency: string;           // New: Fluency level
  teachingStyle: string;     // New: Teaching style
}

export const agents: Agent[] = [
  {
    id: 0,
    name: "Emma Thompson",
    gender: "Female",
    voice: "Alloy",
    voiceProperty: "Soft & Warm",
    expertise: "English Language",
    description: "A patient and encouraging English tutor who makes learning fun and effective for all levels",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Emma, an expert English language tutor...",
    rating: 4.9,
    students: 1240,
    languages: ["English", "Spanish"],
    fluency: "Native",
    teachingStyle: "Interactive & Patient",
  },
  {
    id: 1,
    name: "Aarav Sharma",
    gender: "Male",
    voice: "Shimmer",
    voiceProperty: "Cheerful & Energetic",
    expertise: "Hindi & Urdu",
    description: "Friendly and engaging tutor specializing in Hindi and Urdu conversation practice",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Aarav, an expert Hindi & Urdu tutor...",
    rating: 4.8,
    students: 980,
    languages: ["Hindi", "Urdu", "English"],
    fluency: "Native",
    teachingStyle: "Conversational & Fun",
  },
  {
    id: 2,
    name: "Layla Al-Sayed",
    gender: "Female",
    voice: "Nova",
    voiceProperty: "Gentle & Elegant",
    expertise: "Arabic Language",
    description: "Passionate teacher of Modern Standard Arabic with focus on real-life communication",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Layla, an expert Arabic language tutor...",
    rating: 4.7,
    students: 760,
    languages: ["Arabic", "English"],
    fluency: "Native",
    teachingStyle: "Structured & Culturally Rich",
  },
  {
    id: 3,
    name: "Hans Müller",
    gender: "Male",
    voice: "Echo",
    voiceProperty: "Clear & Professional",
    expertise: "German Language",
    description: "Structured and friendly German tutor who helps students achieve fluency",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Hans, an expert German language tutor...",
    rating: 4.9,
    students: 1120,
    languages: ["German", "English"],
    fluency: "Native",
    teachingStyle: "Practical & Methodical",
  },
  {
    id: 4,
    name: "Sofia Rodriguez",
    gender: "Female",
    voice: "Alloy",
    voiceProperty: "Warm & Expressive",
    expertise: "Spanish Language",
    description: "Energetic Spanish tutor who makes learning Spanish exciting and natural",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Sofia, an expert Spanish language tutor...",
    rating: 4.8,
    students: 890,
    languages: ["Spanish", "English"],
    fluency: "Native",
    teachingStyle: "Lively & Interactive",
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    gender: "Female",
    voice: "Shimmer",
    voiceProperty: "Calm & Precise",
    expertise: "Japanese Language",
    description: "Patient Japanese tutor focusing on natural conversation and cultural understanding",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Yuki, an expert Japanese language tutor...",
    rating: 4.6,
    students: 670,
    languages: ["Japanese", "English"],
    fluency: "Native",
    teachingStyle: "Patient & Cultural",
  },
  {
    id: 6,
    name: "Liam Dubois",
    gender: "Male",
    voice: "Echo",
    voiceProperty: "Friendly & Clear",
    expertise: "French Language",
    description: "Passionate French tutor who makes learning French enjoyable for all levels",
    image: "/agents/english-agent.jpg",
    toolsEnabled: false,
    instructions: "You are Liam, an expert French language tutor...",
    rating: 4.7,
    students: 1050,
    languages: ["French", "English"],
    fluency: "Native",
    teachingStyle: "Engaging & Practical",
  },
];