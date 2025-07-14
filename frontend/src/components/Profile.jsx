import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, Briefcase, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const {user}= useSelector(store=>store.auth);
  const isResume = true;
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-purple-50">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                />
              </Avatar>
              <div className="space-y-1 mt-2 sm:mt-3">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user?.fullname}</h1>
                <p className="text-sm sm:text-base text-gray-600">{user?.profile?.bio}</p>
              </div>
            </div>
            <Button 
              onClick={()=>setOpen(true)} 
              variant="outline" 
              className="w-full sm:w-auto mt-2 hover:bg-purple-50 hover:text-[#6A38C2] hover:border-[#6A38C2] transition-colors"
            >
              <Pen className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          {/* Contact Information */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors group">
              <div className="p-2 rounded-full bg-white text-[#6A38C2] group-hover:bg-[#6A38C2] group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-sm sm:text-base break-all">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors group">
              <div className="p-2 rounded-full bg-white text-[#6A38C2] group-hover:bg-[#6A38C2] group-hover:text-white transition-colors">
                <Contact className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-sm sm:text-base">{user?.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6 sm:mt-7">
            <h2 className="text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-[#6A38C2]">
              <Briefcase className="w-5 h-5" />
              Professional Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge 
                    key={index}
                    className="px-3 py-1 bg-purple-50 text-[#6A38C2] hover:bg-purple-100 text-sm"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">Add Your Skills</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-6 sm:mt-8 p-4 border border-gray-200 rounded-lg hover:border-[#6A38C2] transition-colors">
            <Label className="text-base sm:text-lg font-semibold mb-2 block">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="inline-flex items-center text-[#6A38C2] hover:underline text-sm sm:text-base"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {user?.profile?.resumeOrignalName}
              </a>
            ) : (
              <span className="text-gray-500 text-sm">Add Your Resume</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-[#6A38C2]">
            <Calendar className="w-5 h-5" />
            Application History
          </h2>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;