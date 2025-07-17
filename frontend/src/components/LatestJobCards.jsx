import { Briefcase, Building2, Clock, IndianRupee, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  return (
    <Link to={`/description/${job?._id}`}>
      <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow duration-300 group">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#6A38C2]" />
              <h1 className="font-medium text-lg group-hover:text-[#6A38C2] transition-colors">
                {job?.company?.name}
              </h1>
            </div>
            <div className="flex items-center gap-1 mt-1 text-gray-500">
              <MapPin className="w-3 h-3" />
              <p className="text-sm">{job?.location}</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-50 transition-colors">
            <Briefcase className="w-6 h-6 text-[#6A38C2]" />
          </div>
        </div>

        <div className="mt-4">
          <h1 className="font-bold text-xl mb-2 group-hover:text-[#6A38C2] transition-colors">
            {job?.title}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {job?.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge className="text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 transition-colors">
            <Briefcase className="w-3 h-3 mr-1" />
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-medium bg-orange-50 hover:bg-orange-100 transition-colors">
            <Clock className="w-3 h-3 mr-1" />
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-medium bg-purple-50 hover:bg-purple-100 transition-colors">
            <IndianRupee className="w-3 h-3 mr-1" />
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default LatestJobCards;
