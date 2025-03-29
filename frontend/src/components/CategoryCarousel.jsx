import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist",
  "Mobile Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Product Manager",
  "QA Engineer",
  "Cybersecurity Analyst",
  "Blockchain Developer",
  "AI Engineer",
  "Robotics Engineer",
  "Data Engineer",
  "Game Developer",
  "Content Writer",
  "Social Media Manager",
  "Video Editor",
  "Graphic Designer",
];

const CategoryCarousel = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
    const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate('/browse');
      
    }
  return (
    <div className="w-full flex justify-center">
      <Carousel className="w-full max-w-4xl mx-auto my-10">
        <CarouselContent className="flex gap-x-4">
          {category.map((item, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Button onClick={() => searchJobHandler(item)} variant="outline" className="rounded-full bg-red-100 w-full min-w-[150px] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
