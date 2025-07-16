import { TrendingUp } from "lucide-react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <div className="flex flex-col items-start gap-4 mb-10">
        <div className="flex items-center gap-2 text-[#6A38C2]">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Featured Positions
          </span>
        </div>
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top </span>
          Job Openings
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Discover the most recent opportunities from top companies worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {allJobs.length <= 0 ? (
          <span>No Jobs Are Available</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <div
              key={job._id}
              className="transform hover:scale-[1.02] transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fade-in-up 0.5s ease-out forwards",
                opacity: 0,
              }}
            >
              <LatestJobCards job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
