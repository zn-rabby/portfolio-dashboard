/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getAllBlogs } from "@/service/Blog";
import { getAllContacts } from "@/service/Contacts";
import { getAllProjects } from "@/service/Project";
import { getAllSkills } from "@/service/skill";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import ProfileCompletion from "@/components/dashboard/ProfileCompletion";
import RecentMessages from "@/components/dashboard/RecentMessages";
import Footer from "@/components/dashboard/Footer";

// Define types (you can move these to a separate types.ts file)
type MessageData = {
  name: string;
  value: number;
  fullDate: string;
};

type RecentMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
};

type Weather = {
  temp: number;
  condition: string;
};

type Project = {
  _id: string;
  title: string;
  createdAt: string;
  status: string;
};

type Skill = {
  _id: string;
  name: string;
  proficiency: number;
  category: string;
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<Weather>({
    temp: 28,
    condition: "Sunny",
  });
  const [messageCount, setMessageCount] = useState<number>(0);
  const [messageData, setMessageData] = useState<MessageData[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [blogsCount, setBlogsCount] = useState<number>(0);
  const [skillsCount, setSkillsCount] = useState<number>(0);
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contactsRes, projectsRes, blogsRes, skillsRes] =
          await Promise.all([
            getAllContacts(),
            getAllProjects(),
            getAllBlogs(),
            getAllSkills(),
          ]);

        // Handle contacts data
        if (contactsRes?.data) {
          setMessageCount(contactsRes.data.length);
          const messagesByDate = processMessagesByDate(contactsRes.data);
          setMessageData(messagesByDate);

          const sortedMessages = [...contactsRes.data]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3);

          setRecentMessages(
            sortedMessages.map((msg) => ({
              id: msg._id,
              name: msg.name,
              email: msg.email,
              message: msg.message,
              date: formatDate(new Date(msg.createdAt)),
              time: formatTimeAgo(new Date(msg.createdAt)),
            }))
          );
        }

        // Handle projects data
        if (projectsRes?.data) {
          setProjectsCount(projectsRes.data.length);
          const processedProjectsData = processProjectsData(projectsRes.data);
          setProjectsData(processedProjectsData);
        }

        // Handle blogs data
        if (blogsRes?.data) {
          setBlogsCount(blogsRes.data.length);
        }

        // Handle skills data
        if (skillsRes?.data) {
          setSkillsCount(skillsRes.data.length);
          const processedSkillsData = processSkillsData(skillsRes.data);
          setSkillsData(processedSkillsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Update time and weather every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setWeather({
        temp: Math.floor(25 + Math.random() * 10),
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Helper functions (you can move these to a separate utils.ts file)
  function processMessagesByDate(messages: any[]): MessageData[] {
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
        (a, b) =>
          new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
      );
  }

  function processProjectsData(projects: Project[]): any[] {
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

  function processSkillsData(skills: Skill[]): any[] {
    const categoryMap: Record<string, number> = {};

    skills.forEach((skill) => {
      categoryMap[skill.category] = (categoryMap[skill.category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatTimeAgo(date: Date): string {
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

  const stats = {
    projects: projectsCount,
    blogs: blogsCount,
    messages: messageCount,
    skills: skillsCount,
    completionRate: Math.min(
      100,
      Math.floor((projectsCount + blogsCount + skillsCount) / 3)
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header currentTime={currentTime} weather={weather} />

      <main className="container mx-auto px-4 py-8">
        <StatsCards
          stats={stats}
          projectsData={projectsData}
          messageData={messageData}
          skillsData={skillsData}
          loading={loading}
        />

        <ChartsSection
          messageData={messageData}
          projectsData={projectsData}
          loading={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProfileCompletion
            stats={stats}
            skillsCount={skillsCount}
            projectsCount={projectsCount}
            blogsCount={blogsCount}
          />
          <RecentMessages recentMessages={recentMessages} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
