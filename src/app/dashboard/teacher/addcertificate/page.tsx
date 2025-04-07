"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const handleGenerate = () => {
    if (name.trim() && rollNo.trim()) {
      setShowCertificate(true);
    } else {
      toast.error("Please fill out both fields.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Certificate Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <Button className="w-full" onClick={handleGenerate}>
            Generate Certificate
          </Button>
        </CardContent>
      </Card>

      {showCertificate && (
        <div className="border border-gray-300 shadow-lg rounded-xl p-10 text-center bg-white">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Certificate of Achievement</h2>
          <p className="text-lg">This is to certify that</p>
          <h3 className="text-2xl font-semibold mt-2">{name}</h3>
          <p className="mt-2">Roll No: {rollNo}</p>
          <p className="mt-4 text-gray-600">has successfully completed the requirements.</p>
        </div>
      )}
    </div>
  );
}
