import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const Browse = () => {
  const dispatch = useDispatch();
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job)
  useEffect(() => {
    dispatch(setSearchedQuery("")); 
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Search Results
                <span className="ml-2 text-gray-600 text-2xl font-medium">
                  ({allJobs.length})
                </span> 
              </h1>
              <p className="text-gray-500">Discover your next opportunity</p>
            </div>
            
            {/* Search Stats */}
            <div className="flex items-center space-x-2 text-gray-500">
              <Search className="h-5 w-5" />
              <span className="text-sm">Updated 2 minutes ago</span>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <Job key={job._id} job={job}/>
            ))}
          </div>

          {/* Pagination Hint */}
          <div className="flex justify-center items-center pt-8 text-sm text-gray-500">
            Showing 1-{allJobs.length} of {allJobs.length} results
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;