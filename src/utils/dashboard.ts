/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageData, Project, Skill } from "@/types/dashboard";

export function processMessagesByDate(messages: any[]): MessageData[] {
  const dateMap: Record<string, number> = {};

  messages.forEach((msg) => {
    const date = new Date(msg.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  return Object.entries(dateMap)
    .map(([name, value]) => ({
      name,
      value,
      fullDate: new Date(name).toISOString(),
    }))
    .sort(
      (a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
    );
}

export function processProjectsData(projects: Project[]): any[] {
  const monthMap: Record<string, number> = {};

  projects.forEach((project) => {
    const month = new Date(project.createdAt).toLocaleDateString("en-US", {
      month: "short",
    });
    monthMap[month] = (monthMap[month] || 0) + 1;
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    name: month,
    value: monthMap[month] || 0,
  }));
}

export function processSkillsData(skills: Skill[]): any[] {
  const categoryMap: Record<string, number> = {};

  skills.forEach((skill) => {
    categoryMap[skill.category] = (categoryMap[skill.category] || 0) + 1;
  });

  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1
        ? `${interval} ${unit} ago`
        : `${interval} ${unit}s ago`;
    }
  }
  return "Just now";
}
