import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Users, Download, Calendar, Mail, Phone, CheckCircle2, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const shortListingStatus = [
  { label: "Accepted", icon: CheckCircle2, color: "text-green-600 hover:text-green-700" },
  { label: "Rejected", icon: XCircle, color: "text-red-600 hover:text-red-700" }
];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/update/${id}`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-[#6A38C2]">
          <Users className="w-5 h-5" />
          <h2 className="font-semibold">Job Applicants</h2>
        </div>
      </div>

      <Table>
        <TableCaption className="py-4 text-gray-600">
          A complete list of all applicants for this position
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6A38C2]" />
                Full Name
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6A38C2]" />
                Email
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6A38C2]" />
                Contact
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[#6A38C2]" />
                Resume
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6A38C2]" />
                Date
              </div>
            </TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications.map((item) => (
              <TableRow 
                key={item._id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium group-hover:text-[#6A38C2] transition-colors">
                  {item?.applicant?.fullname || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {item?.applicant?.email || "N/A"}
                </TableCell>
                <TableCell className="text-gray-600">
                  {item?.applicant?.phoneNumber || "N/A"}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="inline-flex items-center gap-1.5 text-[#6A38C2] hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      {item?.applicant?.profile?.resumeOrignalName || "Download"}
                    </a>
                  ) : (
                    <Badge variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-100">
                      Not Available
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-gray-600">
                  {item?.applicant?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <div className="h-8 w-8 rounded-full hover:bg-gray-100 inline-flex items-center justify-center transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-600"/>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      {shortListingStatus.map(({ label, icon: Icon, color }, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(label, item._id)}
                          className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${color} transition-colors`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;