import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, Building2, ArrowLeft } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-5">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/jobs")}
                className="hover:bg-purple-50 hover:text-[#6A38C2] hover:border-[#6A38C2] transition-colors"
                size="icon"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2 text-[#6A38C2] mb-1">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">New Opportunity</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-gray-700">Job Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              {/* Company Selection */}
              <div className="space-y-2">
                <Label className="text-gray-700">Company</Label>
                {companies.length > 0 ? (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem 
                            key={company._id}
                            value={company?.name?.toLowerCase()}
                            className="focus:bg-purple-50 focus:text-[#6A38C2]"
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {company.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-red-500 text-sm mt-1">
                    Please register a company first before posting jobs
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-700">Job Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Brief description of the role"
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label className="text-gray-700">Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Key skills and qualifications"
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label className="text-gray-700">Salary Range</Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-gray-700">Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="e.g., New York, NY"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label className="text-gray-700">Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="e.g., Full-time, Part-time"
                />
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label className="text-gray-700">Experience Level</Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="e.g., 3+ years"
                />
              </div>

              {/* Number of Positions */}
              <div className="space-y-2">
                <Label className="text-gray-700">Number of Positions</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="h-11 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Enter number of openings"
                />
              </div>
            </div>

            {/* Submit Button */}
            {loading ? (
              <Button 
                disabled 
                className="w-full mt-8 h-12 bg-[#6A38C2] hover:bg-[#5b30a6]"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Posting Job...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full mt-8 h-12 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02]"
                disabled={companies.length === 0}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            )}

            {companies.length === 0 && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-600 text-sm text-center font-medium">
                  ⚠️ You need to register a company before posting jobs
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;