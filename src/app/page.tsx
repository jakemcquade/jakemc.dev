"use client";

import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Home() {
  // const [scrollY, setScrollY] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => { setScrollY(window.scrollY); };
  //   window.addEventListener('scroll', handleScroll);

  //   return () => { window.removeEventListener('scroll', handleScroll); };
  // }, []);

  // const getColor = (isFirst: Boolean) => {
  //   const maxScroll = 200;
  //   let opacity = Math.min(scrollY / maxScroll, 1);
  //   const grayValue = 128;
  //   if (isFirst) {
  //     return `rgb(${grayValue + (255 - grayValue) * (1 - opacity)}, ${grayValue + (255 - grayValue) * (1 - opacity)}, ${grayValue + (255 - grayValue) * (1 - opacity)})`; // From white to gray
  //   } else {
  //     return `rgb(${grayValue + (255 - grayValue) * opacity}, ${grayValue + (255 - grayValue) * opacity}, ${grayValue + (255 - grayValue) * opacity})`; // From gray to white
  //   }
  // };

  return (
    <div className="min-h-[100vh] bg-transparent flex flex-col justify-center items-center pb-12 relative">
      <h1 className={"text-5xl md:text-7xl lg:text-7xl font-bold tracking-[0.2em] text-gray-200 absolute top-50 opacity-10 mb-12"}>Jake McQuade</h1>
      <h2 className={"text-4xl md:text-5xl lg:text-5xl font-bold"}>Jake McQuade</h2>
      <p>Software Engineer</p>
      {/* <h2 className={"text-5xl font-bold transition-colors duration-500 mb-12"}>Hi, I'm Jake McQuade</h2> */}
      {/* <h2 className="text-5xl font-bold transition-colors duration-500 mb-12" style={{ color: getColor(true) }}>
        Jake McQuade
      </h2>
      <h2 className="text-5xl font-bold transition-colors duration-500" style={{ color: getColor(false) }}>
        Coming soon...
      </h2> */}
      <div className={"group absolute w-8 h-8 bottom-10 cursor-pointer"}>
        <IoIosArrowDown className={"w-full h-full group-hover:scale-125 transition-transform"} />
      </div>
    </div>
  );
};