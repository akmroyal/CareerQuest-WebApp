import React from "react";
import { Button } from "./ui/button";
import {
  Bookmark,
  Briefcase,
  Clock,
  IndianRupee,
  Building2,
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Function to calculate "Days Ago"
  const calculateDaysAgo = (dateString) => {
    const createdAtDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAtDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };
  const daysAgo = calculateDaysAgo(job?.createdAt);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 mr-1.5 text-[#6A38C2]" />
          {daysAgo} days ago
        </p>
        <Button
          variant="ghost"
          className="rounded-full h-9 w-9 hover:bg-purple-50 hover:text-[#6A38C2] transition-colors"
          size="icon"
        >
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 my-4">
        <div className="relative">
          <Avatar className="ring-2 ring-purple-50 group-hover:ring-purple-100 transition-all">
            <AvatarImage className="object-contain w-full h-full" src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6A38C2]" />
            <h1 className="text-lg font-semibold group-hover:text-[#6A38C2] transition-colors">
              {job?.company?.name}
            </h1>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{job?.location}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-3">
        <h1 className="font-bold text-xl group-hover:text-[#6A38C2] transition-colors">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <Badge
          className="text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1"
          variant="secondary"
        >
          <Briefcase className="w-3 h-3 mr-1.5" />
          {job?.position} Positions
        </Badge>
        <Badge
          className="text-[#F83002] font-medium bg-orange-50 hover:bg-orange-100 transition-colors px-3 py-1"
          variant="secondary"
        >
          <Clock className="w-3 h-3 mr-1.5" />
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-medium bg-purple-50 hover:bg-purple-100 transition-colors px-3 py-1"
          variant="secondary"
        >
          <IndianRupee className="w-3 h-3 mr-1.5" />
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 hover:bg-purple-50 hover:text-[#6A38C2] hover:border-[#6A38C2] transition-colors"
        >
          View Details
        </Button>
        <Button className="flex-1 bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
