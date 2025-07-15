import { useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { COMPANY_API_END_POINT } from "@/utils/constant"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"
import { toast } from "sonner"
import { Building2, ArrowRight, X } from "lucide-react"

const CompanyCreate = () => {
    const dispatch = useDispatch();
    const [companyName, setCompany] = useState();
    const navigate = useNavigate();

    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if(res?.data?.success) {
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } 
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
            <div className="max-w-2xl mx-auto px-4 py-16">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3 text-[#6A38C2] mb-2">
                            <Building2 className="h-5 w-5" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Company Registration</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Create Your Company Profile</h1>
                        <p className="text-gray-500 mt-2">Choose a memorable name for your company. Don't worry, you can always update it later.</p>
                    </div>

                    <div className="p-6">
                        <div className="space-y-4">
                            <Label className="text-gray-700 text-sm">Company Name</Label>
                            <Input 
                                onChange={(e) => setCompany(e.target.value)} 
                                type="text" 
                                className="h-12 border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]" 
                                placeholder="e.g., JobQuest, Microsoft"
                            />
                            
                            {/* Tips Section */}
                            <div className="bg-purple-50 rounded-lg p-4 mt-4">
                                <h3 className="font-medium text-[#6A38C2] mb-2">Tips for a great company name:</h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Keep it simple and memorable</li>
                                    <li>• Avoid numbers and special characters</li>
                                    <li>• Make it unique and brandable</li>
                                </ul>
                            </div>

                            <div className="flex items-center gap-3 mt-8">
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate("/admin/companies")}
                                    className="flex-1 h-11 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={registerCompany} 
                                    className="flex-1 h-11 bg-[#6A38C2] hover:bg-[#5b30a6] transition-all duration-300 hover:scale-[1.02]"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have a company? {" "}
                    <button 
                        onClick={() => navigate("/admin/companies")}
                        className="text-[#6A38C2] hover:underline font-medium"
                    >
                        Go back to companies
                    </button>
                </p>
            </div>
        </div>
    )
}

export default CompanyCreate