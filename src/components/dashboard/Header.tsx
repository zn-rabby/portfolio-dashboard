import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Cloud, Thermometer } from "lucide-react";

export default function Header({
  currentTime,
  weather,
}: {
  currentTime: Date;
  weather: { temp: number; condition: string };
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-[#39CCB5]">
            Rabby{"'"}s Dashboard
          </h1>
          <p className="text-gray-600">Full Stack Developer | MERN Stack</p>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          {/* Weather */}
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-[#39CCB5]" />
            <span className="font-medium">{weather.temp}°C</span>
            <Cloud className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">{weather.condition}</span>
          </div>

          {/* Date */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-[#39CCB5]" />
            <span className="font-medium">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-[#39CCB5]" />
            <span className="font-medium">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* User Profile */}
          <Button
            variant="outline"
            className="border-[#39CCB5] text-[#39CCB5] hover:bg-[#39CCB5]/10 flex items-center gap-2 pl-2 pr-4"
          >
            <Avatar className="h-8 w-8 border border-[#39CCB5]/30">
              <AvatarImage
                src="/path-to-your-image.jpg"
                alt="Zulkar Naeem Rabby"
              />
              <AvatarFallback className="bg-[#39CCB5] text-white">
                ZNR
              </AvatarFallback>
            </Avatar>
            <span>Zulkar Naeem Rabby</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
