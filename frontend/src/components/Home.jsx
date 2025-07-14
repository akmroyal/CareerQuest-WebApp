  import Category from "./Category";
  import Footer from "./shared/Footer";
  import HeroSection from "./HeroSection";
  import LatestJobs from "./LatestJobs";
  import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

  const Home = () => {
    useGetAllJobs();
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (user?.role == "recruiter"){
        navigate("/admin/companies");
      }
    }, [])
    
    return (
      <>
        <Navbar />
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        <Footer/>
      </>
    );
  };

  export default Home;
