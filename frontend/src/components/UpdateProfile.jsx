import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, User, Mail, Phone, FileText, Code, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: user?.profile?.resumeOrignalName || ""
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] overflow-hidden border-0 shadow-xl"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">Update Profile</DialogTitle>
          <p className="text-sm text-gray-500 font-normal">
            Fill in your information to update your profile
          </p>
        </DialogHeader>

        <form className="mt-4" onSubmit={submitHandler}>
          <div className="grid gap-6">
            {/* Name Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-600">
                Name
              </Label>
              <div className="col-span-3 relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-gray-600">
                Email
              </Label>
              <div className="col-span-3 relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Number Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="number" className="text-right text-gray-600">
                Number
              </Label>
              <div className="col-span-3 relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="number"
                  className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Your phone number"
                />
              </div>
            </div>

            {/* Bio Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right text-gray-600">
                Bio
              </Label>
              <div className="col-span-3 relative">
                <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="bio"
                  className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  placeholder="A brief about yourself"
                />
              </div>
            </div>

            {/* Skills Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right text-gray-600">
                Skills
              </Label>
              <div className="col-span-3 relative">
                <Code className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="skills"
                  className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  placeholder="e.g., React, Node.js, TypeScript"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-gray-600">
                Resume
              </Label>
              <div className="col-span-3 relative">
                <div className="relative">
                  <Upload className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="file"
                    className="pl-10 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#6A38C2] hover:file:bg-purple-100"
                    name="file"
                    onChange={fileChangeHandler}
                    type="file"
                    accept="application/pdf"
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-11 bg-[#6A38C2] ${
                loading ? "hover:bg-[#6A38C2]" : "hover:bg-[#5b30a6]"
              } text-white font-medium rounded-lg transition-all duration-300`}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
