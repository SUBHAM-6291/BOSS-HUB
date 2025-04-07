import React, { useState, useEffect, ChangeEvent } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Upload, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CompanyData } from "@/Backend/types/next-auth";

const CompanyOverview = () => {
  const [data, setData] = useState({
    bannerImage: "/images/banner.jpeg",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezBFvp_GJw0pcN5J6ms0NG0NaDXiycHnuKQ&s",
    name: "Jane Smith",
    role: "Founder",
    bio: "Welcome to xAI...",
    details: { founded: "2020", location: "San Francisco, CA", industry: "Technology" },
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("companyData");
    if (storedData) setData(JSON.parse(storedData));
  }, []);

  const handleImageChange = (type: "banner" | "profile", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userselectfile = new FileReader();
      userselectfile.onload = () =>
        setData((company) => ({
          ...company,
          [type === "banner" ? "bannerImage" : "profileImage"]: userselectfile.result,
        }));
      userselectfile.readAsDataURL(file);
    }
  };

  const handleTextChange = (field:keyof CompanyData |keyof CompanyData ['details'], value:string) => {
    if (field in data.details) {
      setData((prev) => ({
        ...prev,
        details: { ...prev.details, [field]: value },
      }));
    } else {
      setData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const saveChanges = () => {
    localStorage.setItem("companyData", JSON.stringify(data));
    setIsEditing(false);
    toast.success("Changes saved locally!", { position: "top-right" });
  };

  return (
    <div className="bg-black min-h-screen p-6">
      <ToastContainer />
      <div className="relative mb-6 h-48 rounded-lg border border-white/10">
        <img src={data.bannerImage} alt="Banner" className="h-full w-full rounded-lg object-cover" />
        {isEditing && (
          <label className="absolute right-2 top-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Change
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange("banner", e)} />
              </span>
            </Button>
          </label>
        )}
      </div>

      <Card className="border-white/10 bg-black">
        <CardHeader>
          <h1 className="text-3xl font-bold text-white">Company Profile</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img src={data.profileImage} alt="Profile" className="h-32 w-32 rounded-full border-2 border-white/20 object-cover" />
              {isEditing && (
                <label className="absolute bottom-0 right-0">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
                    <span>
                      <Upload className="h-4 w-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange("profile", e)} />
                    </span>
                  </Button>
                </label>
              )}
            </div>
            {isEditing ? (
              <input
                value={data.name}
                onChange={(e) => handleTextChange("name", e.target.value)}
                className="text-white bg-black border border-white/20 rounded p-2"
              />
            ) : (
              <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
                <User className="h-5 w-5" /> {data.name}
              </h2>
            )}
            <p className="text-white/70">{data.role}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Bio</h2>
            {isEditing ? (
              <textarea
                value={data.bio}
                onChange={(e) => handleTextChange("bio", e.target.value)}
                className="w-full text-white bg-black border border-white/20 rounded p-2"
              />
            ) : (
              <p className="text-white/90 leading-relaxed">{data.bio}</p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Details</h2>
            {isEditing ? (
              <div className="space-y-2">
                {Object.entries(data.details).map(([key, value]) => (
                  <input
                    key={key}
                    value={value}
                    onChange={(e) => handleTextChange(key as keyof CompanyData | keyof CompanyData['details'], e.target.value)}
                    className="w-full text-white bg-black border border-white/20 rounded p-2"
                  />
                ))}
              </div>
            ) : (
              <div className="text-white/90 space-y-1">
                {Object.entries(data.details).map(([key, value]) => (
                  <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
                ))}
              </div>
            )}
          </div>

          {isEditing && <Button onClick={saveChanges} className="mt-4">Save Changes</Button>}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyOverview;