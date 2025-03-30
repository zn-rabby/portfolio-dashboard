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

export interface IProject {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string[];
  technologies: string[];
  features?: string[];
  projectGoals?: string;
  status: "ongoing" | "completed" | "maintenance";
  liveDemoLink: string;
  repoLinkClient?: string;
  repoLinkServer?: string;
  isPublished?: boolean;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IBlog {
  _id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  introduction: string;
  content: string;
  tags?: string[];
  isDeleted?: boolean;
}

export interface ISkill {
  _id: string;
  icon: string;
  name: string;
  description: string;
  category:
    | "frontend"
    | "backend"
    | "devops"
    | "tools"
    | "softSkills"
    | "others";
  isDeleted?: boolean;
}
