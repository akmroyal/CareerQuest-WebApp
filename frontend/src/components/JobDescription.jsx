import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Briefcase, Clock, IndianRupee, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#6A38C2]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {singleJob?.title || "Job Title"}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className="text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 transition-colors px-3 py-1.5"
                  variant="secondary"
                >
                  <Briefcase className="w-3 h-3 mr-1.5" />
                  {singleJob?.position} Positions
                </Badge>
                <Badge
                  className="text-[#F83002] font-medium bg-orange-50 hover:bg-orange-100 transition-colors px-3 py-1.5"
                  variant="secondary"
                >
                  <Clock className="w-3 h-3 mr-1.5" />
                  {singleJob?.jobType}
                </Badge>
                <Badge
                  className="text-[#7209b7] font-medium bg-purple-50 hover:bg-purple-100 transition-colors px-3 py-1.5"
                  variant="secondary"
                >
                  <IndianRupee className="w-3 h-3 mr-1.5" />
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>
            <Button
              onClick={!user || isApplied ? null : applyJobHandler}
              disabled={!user || isApplied}
              className={`h-fit rounded-lg px-8 ${
                !user || isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6A38C2] hover:bg-[#5b30a6]"
              }`}
            >
              {!user
                ? "Login to Apply"
                : isApplied
                ? "Already Applied"
                : "Apply Now"}
            </Button>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <h1 className="border-b border-gray-200 font-medium p-6">
            Job Description
          </h1>
          <div className="p-6 space-y-4">
            <div className="flex items-center">
              <h1 className="font-bold w-32">Role:</h1>
              <span className="text-gray-800">{singleJob?.title}</span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Location:</h1>
              <span className="text-gray-800">{singleJob?.location}</span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Description:</h1>
              <span className="text-gray-800">{singleJob?.description}</span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Experience:</h1>
              <span className="text-gray-800">
                {singleJob?.experienceLevel} Year
              </span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Salary:</h1>
              <span className="text-gray-800">{singleJob?.salary} LPA</span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Applicants:</h1>
              <span className="text-gray-800">
                {singleJob?.applications?.length}
              </span>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold w-32">Posted Date:</h1>
              <span className="text-gray-800">
                {singleJob?.createdAt
                  ? singleJob.createdAt.split("T")[0]
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
