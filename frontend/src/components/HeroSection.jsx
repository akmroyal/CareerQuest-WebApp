import { useState } from 'react';
import { Button } from './ui/button';
import { Search, Briefcase, Star, TrendingUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () =>{
  dispatch(setSearchedQuery(query));
  navigate('/browse')

 }

  return (
    <div className="relative text-center py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col gap-6 items-center max-w-6xl mx-auto px-4">
        {/* Badge */}
        <span className="inline-flex animate-fade-in-down items-center px-6 py-2.5 rounded-full bg-orange-50 text-[#F83002] text-lg font-semibold shadow-sm border border-orange-100">
          <Star className="w-5 h-5 mr-2" />
          Step into Success with the No.1 Job Platform
        </span>

        {/* Heading */}
        <h1 className="mt-4 text-6xl font-bold tracking-tight animate-fade-in-up">
          Search, Apply & <br />
          Get Your{' '}
          <span className="text-[#6A38C2] relative">
            Dream Job
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5.8c54-4 98.5-4.3 137.3-3.5 39 .8 78.6 2.7 118.4 3.7 39.7 1 79.6 1.2 98.3 1.2" stroke="#6A38C2" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-600 max-w-2xl animate-fade-in-up animation-delay-150">
          Find the right job, at the right place, at the right time.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mt-4 animate-fade-in-up animation-delay-300">
          <div className="flex shadow-lg border border-gray-200 bg-white rounded-full items-center gap-4 pl-6 transition-all duration-300 hover:shadow-xl">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              onChange={(e)=> setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none px-4 py-4 w-full border-none text-lg placeholder:text-gray-400"
            />
            <Button onClick={searchJobHandler} className="bg-[#6A38C2] hover:bg-[#5b30a6] rounded-r-full h-14 px-8 transition-all duration-300">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-8 animate-fade-in-up animation-delay-450">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#6A38C2]" />
            <span className="text-lg">
              <strong className="font-bold">10k+</strong> Jobs Posted
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-[#F83002]" />
            <span className="text-lg">
              <strong className="font-bold">8k+</strong> Companies
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#6A38C2]" />
            <span className="text-lg">
              <strong className="font-bold">15k+</strong> Candidates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;