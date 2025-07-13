import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, Building2, Globe2, MapPin, FileImage, FileText } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
 

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if(input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      if(res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies")
      }
    } 
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || "",
    })
  }, [singleCompany])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="hover:bg-purple-50 hover:text-[#6A38C2] hover:border-[#6A38C2] transition-colors"
                size="icon"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Company Setup</h1>
                <p className="text-sm text-gray-500 mt-1">Update your company information</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="p-6">
            <div className="grid gap-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#6A38C2]" />
                  Company Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Enter company name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#6A38C2]" />
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Brief description about the company"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#6A38C2]" />
                  Website
                </Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Company website URL"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#6A38C2]" />
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  placeholder="Company location"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label className="text-gray-700 flex items-center gap-2">
                  <FileImage className="w-4 h-4 text-[#6A38C2]" />
                  Company Logo
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={fileHandler}
                  className="border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            {loading ? (
              <Button 
                disabled 
                className="w-full mt-8 h-12 bg-[#6A38C2] hover:bg-[#5b30a6] transition-all duration-300"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Updating Company Details...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full mt-8 h-12 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Update Company
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;