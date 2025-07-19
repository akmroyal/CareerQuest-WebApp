import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Building2, Calendar, Briefcase, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

const getStatusConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'accepted':
      return {
        icon: CheckCircle2,
        className: 'bg-green-50 text-green-600 hover:bg-green-100'
      };
    case 'rejected':
      return {
        icon: XCircle,
        className: 'bg-red-50 text-red-600 hover:bg-red-100'
      };
    default:
      return {
        icon: Clock,
        className: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
      };
  }
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-[#6A38C2]">
          <Briefcase className="w-5 h-5" />
          <h2 className="font-semibold">Application History</h2>
        </div>
      </div>

      <Table>
        <TableCaption className="py-4 text-gray-600">
          Your complete application history and status
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#6A38C2]" />
                Date
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#6A38C2]" />
                Job Role
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#6A38C2]" />
                Company
              </div>
            </TableHead>
            <TableHead className="text-right font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Briefcase className="w-12 h-12 text-gray-300" />
                  <p className="font-medium">No Applications Yet</p>
                  <p className="text-sm">Start applying to jobs to see your application history here</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              const StatusIcon = getStatusConfig(appliedJob.status).icon;
              return (
                <TableRow
                  key={appliedJob?._id}
                  className="group hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {new Date(appliedJob.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium group-hover:text-[#6A38C2] transition-colors">
                    {appliedJob?.job?.title || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {appliedJob?.job?.company?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant="secondary"
                      className={`inline-flex items-center gap-1.5 ${getStatusConfig(appliedJob.status).className}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {appliedJob.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;