export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
}

export interface IContact {
  _id: string;
  email: string;
  name: string;
  message: string;
}

export interface TProject {
  _id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  image: string[];
  technologies: string[];
  keyFeatures: string[];
  status: "ongoing" | "completed" | "maintenance";

  // Links
  liveDemoLink: string;
  repoLinkClient?: string;
  repoLinkServer?: string;

  // Additional Info (Optional)
  projectGoals?: string;
}
