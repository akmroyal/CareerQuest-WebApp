import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
    useGetAdminJobs();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);  

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-19 mt-4 gap-2">
        <div className="flex items-center justify-between">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter By Name, Role"
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
