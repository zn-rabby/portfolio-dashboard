export type MessageData = {
  name: string;
  value: number;
  fullDate: string;
};

export type RecentMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
};

export type Weather = {
  temp: number;
  condition: string;
};

export type Project = {
  _id: string;
  title: string;
  createdAt: string;
  status: string;
};

export type Skill = {
  _id: string;
  name: string;
  proficiency: number;
  category: string;
};

export type Stats = {
  projects: number;
  blogs: number;
  messages: number;
  skills: number;
  completionRate: number;
};
