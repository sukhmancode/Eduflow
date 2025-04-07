"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/index.scss";
import "../styles/sidebar.scss";

export default function PostNotice() {
  const router = useRouter();
  const [collegeId, setcollegeId] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const id = sessionStorage.getItem("collegeId");
      if (!id) {
        router.push("/");
      } else {
        setcollegeId(id);
      }
    }
  }, [router]);

  useEffect(() => {
    if (!collegeId) return;

    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(
          `https://ai-teacher-api-xnd1.onrender.com/teacher/${collegeId}/detail`
        );

        if (!response.ok) throw new Error("Failed to fetch teacher details");

        const data = await response.json();
        setTeacherName(data.Tname);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    fetchTeacherDetails();
  }, [collegeId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    } else {
      toast.error("Please select an image!");
    }
  };

  const handlePostNotice = async () => {
    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }

    if (!collegeId) {
      toast.error("Teacher ID not found!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("teacher_id", collegeId);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        "https://ai-teacher-api-xnd1.onrender.com/teacher/post_notice",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error posting notice.");

      await response.json();
      toast.success("Notice posted successfully!");
      router.push("/dashboard/colleges/notice");
    } catch (error) {
      toast.error("Error posting notice.");
      console.error("Post error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="add-teacher-container  flex">
    <div className="sidebar-container-page ">
      <Sidebar />
    </div>
    <div className="content-container w-full">
      <div className="navbar">
        <Navbar />
      </div>
    <div className="flex justify-center items-center self-center">
      <Card className="w-full md:w-[500px] shadow-2xl  border border-gray-200 p-6 mt-5">
        <CardHeader />
        <h1 className="text-center font-semibold text-3xl mb-4">Upload Notice!</h1>

        <CardContent className="space-y-4">

          <div className="flex flex-col gap-1">
            <Label>Notice Title</Label>
            <Input
              type="text"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter notice description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="mb-1">Upload Image</Label>
            <Input type="file" required
             onChange={handleFileChange} />
            <Button
              onClick={handlePostNotice}
              className="w-full mt-3"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Notice"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
    </div>
  );
}
