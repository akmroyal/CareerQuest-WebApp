import { Link, useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { Eye, EyeOff, Loader2, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import store from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [showPassword, setShowPassword] = useState(false); 
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHnadler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-[600px] bg-white border border-gray-200 rounded-xl shadow-lg p-8 "
        >
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl text-gray-900">
              Create Your Account
            </h1>
            <p className="text-gray-500 mt-2">
              Join our community and explore opportunities
            </p>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label className="text-gray-700">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="john.doe@example.com"
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-gray-700">Phone Number</Label>
              <Input
                type="phoneNumber"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="Enter your phone number"
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <EyeOff/> : <Eye/>}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 w-full md:w-auto">
                <Label className="text-gray-700 block mb-2">I am a</Label>
                <RadioGroup className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role == "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer w-4 h-4 text-blue-600"
                    />
                    <Label className="text-gray-600">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role == "recruiter"}
                      onChange={changeEventHandler}
                      className="cursor-pointer w-4 h-4 text-blue-600"
                    />
                    <Label className="text-gray-600">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 w-full md:w-auto">
                <Label className="text-gray-700 block">Profile Picture</Label>
                <div className="flex items-center gap-2">
                  <UserCircle className="w-8 h-8 text-gray-400" />
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={changeFileHnadler}
                    className="cursor-pointer text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-8 h-11 bg-[#6A38C2] hover:bg-[#5b30a6] ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait..
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 h-11 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium rounded-lg transition-colors duration-200"
            >
              Create Account
            </Button>
          )}

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
