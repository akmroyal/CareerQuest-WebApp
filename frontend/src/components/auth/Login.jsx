import { Link, useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup} from "../ui/radio-group";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); 
  
  const {loading, user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    }
    catch(err){
      console.error(err);
      toast.error(err.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  
  useEffect(() => {
    if(user){
      navigate("/");
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mt-10 flex items-center justify-center max-w-7xl mx-auto px-6">
        <form onSubmit={submitHandler} className="w-full md:w-[600px] bg-white border border-gray-200 rounded-xl shadow-lg p-10 ">
          <div className="text-center mb-8">
            <h1 className="font-bold text-3xl text-gray-900">Sign in</h1>
            <p className="text-gray-500 mt-2">Stay updated on your professional world.</p>
          </div>
          
          <div className="space-y-2">
            <div className="space-y-2">
              <Label className="text-gray-700">Email Address</Label>
              <Input 
                type="email" value={input.email}
                name="email" onChange={changeEventHandler}
                placeholder="john.doe@example.com" 
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Password</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}  // Toggle password visibility
                  value={input.password}
                  name="password" onChange={changeEventHandler}
                  placeholder="Enter your password" 
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}  
                  className="absolute top-3 right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff/> : <Eye/>}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="mt-2 space-y-2 w-full md:w-auto">
                <Label className="text-gray-700 block mb-2">I am a</Label>
                <RadioGroup className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="radio" 
                      name="role" 
                      value="student" 
                      checked={input.role=='student'}
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
                      checked={input.role=='recruiter'}
                      onChange={changeEventHandler} 
                      className="cursor-pointer w-4 h-4 text-blue-600"
                    />
                    <Label className="text-gray-600">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          {
            loading ? (
              <Button className="w-full mt-8 h-11 bg-[#6A38C2] hover:bg-[#5b30a6] ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait..
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full mt-8 h-11 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium rounded-lg transition-colors duration-200"
              >
                Sign in
              </Button>
            )
          }

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
