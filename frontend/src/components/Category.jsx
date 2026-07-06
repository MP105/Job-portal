import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "React Developer",
  "Node.js Developer",
  "UI/UX Designer",
  "Java Developer",
  "Python Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="w-full py-4 px-3 sm:px-6 lg:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-2">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="
                pl-2
                basis-full
                sm:basis-1/2
                md:basis-1/3
                lg:basis-1/4
                xl:basis-1/5
              "
            >
              <Button
                onClick={() => handleSearch(cat)}
                variant="outline"
                className="
                  w-full
                  h-12
                  rounded-full
                  text-xs
                  sm:text-sm
                  md:text-base
                  font-medium
                  border-violet-300
                  hover:bg-violet-600
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-5" />
        <CarouselNext className="hidden md:flex -right-5" />
      </Carousel>
    </section>
  );
};

export default CategoryCarousel;