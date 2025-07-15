import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ComapniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);  

  // Fetching all companies
  useGetAllCompanies();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-19 mt-4 gap-2">
        <div className="flex items-center justify-between">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter By Name"
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors"
          >
            New Company
          </Button>
        </div>
        <ComapniesTable />
      </div>
    </div>
  );
};

export default Companies;
