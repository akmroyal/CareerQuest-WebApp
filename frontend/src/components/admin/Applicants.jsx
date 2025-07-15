import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationsSlice";
import { Users, Briefcase } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/applicants/${params.id}`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#6A38C2] mb-2">
            <Briefcase className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Applications Overview</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Job Applicants
            </h1>
            <div className="flex items-center gap-2 bg-purple-50 text-[#6A38C2] px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {applicants?.applications?.length || 0} Applications
              </span>
            </div>
          </div>
          <p className="text-gray-600 mt-2">
            Review and manage all applications for this position
          </p>
        </div>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;