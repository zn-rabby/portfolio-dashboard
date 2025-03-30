import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/service/AuthService";
import {
  Settings,
  Mail,
  Lock,
  User,
  Calendar,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export default async function ProfilePage() {
  const { user } = await getCurrentUser();

  // Format join date from user._id (ObjectId timestamp)
  const getJoinDate = () => {
    if (!user?._id) return "Joined recently";
    const timestamp = parseInt(user._id.substring(0, 8), 16) * 1000;
    const joinDate = new Date(timestamp);
    return `Joined ${joinDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar || ""} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground capitalize">
                  {user?.role || "user"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{getJoinDate()}</span>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Account Status</h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      user?.isBlocked
                        ? "bg-destructive/10 text-destructive"
                        : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Mail className="h-4 w-4" />
                Email Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Lock className="h-4 w-4" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={user?.name || ""}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Role</Label>
                    <Input
                      id="role"
                      defaultValue={user?.role || "user"}
                      disabled
                      className="capitalize"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Account Status</Label>
                    <Input
                      id="status"
                      defaultValue={user?.isBlocked ? "Blocked" : "Active"}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    defaultValue={user?.avatar || ""}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                {/* Additional Image Section */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Profile Cover Image</span>
                  </Label>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-lg">
                    {user?.coverImage ? (
                      <div className="relative w-full h-48 rounded-md overflow-hidden">
                        <Image
                          src={user.coverImage}
                          alt="Profile cover"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          No cover image uploaded
                        </p>
                      </div>
                    )}
                    <Button variant="outline" type="button">
                      Upload New Image
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Update Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="password"
                    defaultValue="••••••••"
                    disabled
                    className="flex-1"
                  />
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Status: Not enabled</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
