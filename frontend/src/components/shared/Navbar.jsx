import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOutIcon, Menu, User2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import store from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-[4.5rem] px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer tracking-tight">
              Job
              <span className="bg-gradient-to-r from-[#f83002] to-[#ff6b4d] bg-clip-text text-transparent">
                Quest
              </span>
            </h1>
          </Link>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#f83002] to-[#ff6b4d] transition-all duration-300 group-hover:w-full"></div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-8">
            {user && user.role == "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li className="relative group">
                    <span className="cursor-pointer transition-colors">
                      Companies
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f83002] transition-all duration-300 group-hover:w-full"></div>
                  </li>
                </Link>
                <Link to="/admin/jobs">
                  <li className="relative group">
                    <span className="cursor-pointer transition-colors">
                      Jobs
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f83002] transition-all duration-300 group-hover:w-full"></div>
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li className="relative group">
                    <span className="cursor-pointer transition-colors">
                      Home
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f83002] transition-all duration-300 group-hover:w-full"></div>
                  </li>
                </Link>
                <Link to="/jobs">
                  <li className="relative group">
                    <span className="cursor-pointer transition-colors">
                      Jobs
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f83002] transition-all duration-300 group-hover:w-full"></div>
                  </li>
                </Link>
                <Link to="/browse">
                  <li className="relative group">
                    <span className="cursor-pointer transition-colors">
                      Browse
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#f83002] transition-all duration-300 group-hover:w-full"></div>
                  </li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button
                  className="border-2 hover:bg-gray-50 font-medium transition-all duration-300"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#7c52cc] hover:opacity-90 font-medium transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-offset-2 ring-[#6A38C2] transition-all duration-300 hover:ring-[#f83002]">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="https://github.com/shadcn.png"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-[#6A38C2]">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="https://github.com/shadcn.png"
                    />
                  </Avatar>
                  <div className="overflow-hidden break-words">
                    <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {
                    user && user.role=="student" ? (
                      <>
                      <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-gray-50 hover:text-[#f83002] transition-all duration-300"
                  >
                    <User2 className="h-4 w-4" />
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button
                    onClick={logOutHandler}
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
                  </>
                    ): (
                      <Button
                      onClick={logOutHandler}
                      variant="ghost"
                      className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      Logout
                    </Button>
                    )
                  }
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-gray-50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-[#f83002] to-[#ff6b4d] bg-clip-text text-transparent">
                      Menu
                    </h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {user ? (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                      <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-[#6A38C2]">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="https://github.com/shadcn.png"
                        />
                      </Avatar>
                      <div className="overflow-hidden break-words">
                        <h4 className="font-semibold text-lg">
                          {user?.fullname}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Link to="/login" className="flex-1">
                        <Button
                          className="w-full border-2 hover:bg-gray-50 font-medium"
                          variant="outline"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup" className="flex-1">
                        <Button
                          className="w-full bg-gradient-to-r from-[#6A38C2] to-[#7c52cc] hover:opacity-90 font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>

                <nav className="flex flex-col p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-4">
                    Navigation
                  </div>
                  <div className="space-y-2">
                    {user && user.role === "recruiter" ? (
                      <>
                        <Link to="/admin/companies">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-white hover:text-[#f83002] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Companies
                          </Button>
                        </Link>
                        <Link to="/admin/jobs">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-white hover:text-[#f83002] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Jobs
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-white hover:text-[#f83002] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Home
                          </Button>
                        </Link>
                        <Link to="/jobs">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-white hover:text-[#f83002] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Jobs
                          </Button>
                        </Link>
                        <Link to="/browse">
                          <Button
                            variant="ghost"
                            className="w-full justify-start hover:bg-white hover:text-[#f83002] transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            Browse
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>

                {user && (
                  <div className="mt-auto p-6 border-t bg-white">
                    <div className="text-sm font-medium text-muted-foreground mb-4">
                      Account
                    </div>
                    <div className="space-y-2">
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2 hover:bg-gray-50 hover:text-[#f83002] transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <User2 className="h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                        onClick={logOutHandler}
                      >
                        <LogOutIcon className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
