import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./updateProfileDialog";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Pen } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-violet-100 py-8 px-4">
        {/* Profile Card */}
        <div className="max-w-5xl mx-auto bg-white border rounded-3xl shadow-md p-5 sm:p-8">

          {/* Top */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            {/* Left */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-violet-100">
                <AvatarImage
                src={user?.profile?.profilePhoto || ""}
                />

                <AvatarFallback className="text-xl">
                  {user?.fullname?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left">

                <h1 className="text-2xl sm:text-3xl font-bold">
                  {user?.fullname}
                </h1>

                <p className="text-gray-500 mt-2 max-w-xl text-sm sm:text-base">
                  {user?.profile?.bio || "No bio added"}
                </p>

              </div>
            </div>

            {/* Edit */}
            <button
              onClick={() => setOpen(true)}
              className="border p-3 rounded-full hover:bg-gray-100 self-center md:self-start transition"
            >
              <Pen size={18} />
            </button>

          </div>

          {/* Contact */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3 text-sm sm:text-base">
              <Mail size={18} className="text-violet-600" />

              <span className="break-all">
                {user?.email}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm sm:text-base">
              <Phone size={18} className="text-violet-600" />

              <span>
                {user?.phoneNumber}
              </span>
            </div>

          </div>

          {/* Skills */}
          <div className="mt-8">

            <h1 className="font-semibold text-lg mb-3">
              Skills
            </h1>

<div className="flex flex-wrap gap-2">
  {user?.profile?.skills?.length > 0 ? (
    user.profile.skills.map((skill, index) => (
      <Badge
        key={index}
        className="bg-black text-white rounded-full px-3 py-1 hover:bg-gray-800"
      >
        {skill.trim()}
      </Badge>
    ))
  ) : (
    <span className="text-gray-500">
      No Skills Added
    </span>
  )}
</div>

          </div>

          {/* Resume */}
          <div className="mt-8">

            <h1 className="font-semibold text-lg mb-2">
              Resume
            </h1>

{user?.profile?.resume ? (
  <a
    href={user.profile.resume}
    target="_blank"
    rel="noopener noreferrer"
    className="text-violet-600 hover:underline break-all"
  >
    {user?.profile?.resumeOriginalName}
  </a>
) : (
  <span className="text-gray-500">
    No Resume Uploaded
  </span>
)}

          </div>

        </div>

        {/* Applied Jobs */}
        <div className="max-w-5xl mx-auto mt-8 overflow-x-auto">
          <AppliedJobTable />
        </div>

        {/* Update Dialog */}
        <UpdateProfileDialog
          open={open}
          setOpen={setOpen}
        />

      </div>
    </>
  );
};

export default Profile;