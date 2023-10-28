"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";

export default function Carousel({ data }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const emptyCardsCount =
    3 - (data.length % 3) === 3 ? 0 : 3 - (data.length % 3);
  const totalSlides = data.length + emptyCardsCount;

  const nextSlide = () => {
    const newIndex = activeSlide + 3 >= totalSlides ? 0 : activeSlide + 3;
    setActiveSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = activeSlide - 3 < 0 ? 0 : activeSlide - 3;
    setActiveSlide(newIndex);
  };

  const completeData = [...data];
  for (let i = 0; i < emptyCardsCount; i++) {
    completeData.push(data[i % data.length]);
  }

  return (
    <div className="relative w-full h-min overflow-x-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 33.33}%)` }}
      >
        {completeData.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-[33.33%] h-72 p-2 md:p-4"
            key={index}
          >
            <div className="relative bg-white w-full h-full overflow-hidden rounded-md shadow-lg cursor-pointer border border-gray-300 hover:border-[#7E8EFF]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  className="absolute top-0 left-0 w-full object-cover"
                  width={500}
                  height={400}
                />
              ) : (
                <div className="h-1/2"></div>
              )}
              <div className="absolute top-0 left-0 p-2 md:p-6 h-full w-full flex flex-col justify-end bg-gradient-to-t from-black/60 hover:bg-black/20 text-white">
                {item.title ? (
                  <h2 className="text-sm md:text-xl mt-2 md:mt-4 font-semibold">
                    {item.title}
                  </h2>
                ) : null}
                {item.description ? (
                  <p className="mt-1 md:mt-2 text-xs md:text-base">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        className="hidden md:flex absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#7E8EFF] text-white h-[40px] w-[40px] rounded-md shadow-md p-0 text-xl"
        onClick={prevSlide}
      >
        <IoIosArrowBack />
      </Button>
      <Button
        className="hidden md:flex absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#7E8EFF] text-white h-[40px] w-[40px] rounded-md shadow-md p-0 text-xl"
        onClick={nextSlide}
      >
        <IoIosArrowForward />
      </Button>
    </div>
  );
}
