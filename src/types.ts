export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  visualPrompt: string; // Used for descriptive visuals
  mockupBg: string; // Gradient or styling for the product representation
  role: string;
  timeline: string;
}

export interface Skill {
  name: string;
  description: string;
  icon: string;
  level: number; // 0-100 representation for visual meters
}
