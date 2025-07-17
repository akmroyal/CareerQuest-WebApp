import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Accountant",
];

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) =>{
    dispatch(setSearchedQuery(query));
    navigate('/browse')
   }
  return (
    <div className="py-10 px-4">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
        <p className="text-gray-600">Explore opportunities across various domains</p>
      </div>

      <Carousel 
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((item, index) => (
            <CarouselItem 
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={()=>searchJobHandler(item)} 
                variant="outline" 
                className="w-full rounded-full h-12 border-2 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-300 group"
              >
                <Briefcase className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 border-2 hover:bg-[#6A38C2] hover:text-white transition-all duration-300" />
        <CarouselNext className="hidden md:flex -right-12 border-2 hover:bg-[#6A38C2] hover:text-white transition-all duration-300" />
      </Carousel>

      <div className="mt-8 text-center">
        <span className="text-sm text-gray-500">
          Swipe or use arrows to explore more categories
        </span>
      </div>
    </div>
  );
};

export default Category;