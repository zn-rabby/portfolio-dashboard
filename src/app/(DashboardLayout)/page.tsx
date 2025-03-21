"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SimplePortfolioDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-10 bg-white">
        <h1 className="text-4xl font-bold text-[#39CCB5]">Zulkar Naeem Rabby</h1>
        <p className="text-lg text-gray-600 mt-4">Full Stack Developer | MERN Stack Developer</p>
       
      </div>

      {/* Skills Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
          <Card className="bg-white shadow-sm max-w-2xl mx-auto">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 text-lg leading-relaxed">
                I am a passionate web developer committed to continuous learning and the craft of building intuitive,
                beautiful user interfaces. With a strong foundation in various programming frameworks, I am always eager
                to expand my knowledge and explore new technologies. My focus is on writing clean, efficient code that
                delivers high-quality web solutions.
              </p>
              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                💻 Currently Learning: Advanced web technologies to enhance my skills
                <br />
                🚀 Looking for Collaboration & Opportunities: Open to contributing to open-source projects, team-based
                initiatives, and actively seeking full-time job opportunities in web development.
              </p>
              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                Driven by a keen eye for detail and a dedication to excellence, I strive to make a positive impact in the
                tech world. Connect with me on GitHub to explore my projects and contributions!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <Card className="bg-white shadow-sm max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-[#39CCB5]">Zulkar Naeem Rabby</h2>
            <p className="text-gray-600 mt-2">Full Stack Developer | MERN Stack Developer</p>
            <p className="text-gray-600 mt-2">Phone: 01540643211</p>
            <p className="text-gray-600 mt-2">Email: your.email@example.com</p>
            <div className="mt-4">
              <Button className="bg-[#39CCB5] text-white hover:bg-[#2DA897]">Send Email</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white p-6 text-center border-t border-gray-200">
        <p className="text-gray-600">© 2023 Zulkar Naeem Rabby. All rights reserved.</p>
      </footer>
    </div>
  );
}