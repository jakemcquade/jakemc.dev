"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => { setScrollY(window.scrollY); };
    window.addEventListener('scroll', handleScroll);

    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  const getColor = (isFirst: Boolean) => {
    const maxScroll = 200;
    let opacity = Math.min(scrollY / maxScroll, 1);
    const grayValue = 128;
    if (isFirst) {
      return `rgb(${grayValue + (255 - grayValue) * (1 - opacity)}, ${grayValue + (255 - grayValue) * (1 - opacity)}, ${grayValue + (255 - grayValue) * (1 - opacity)})`; // From white to gray
    } else {
      return `rgb(${grayValue + (255 - grayValue) * opacity}, ${grayValue + (255 - grayValue) * opacity}, ${grayValue + (255 - grayValue) * opacity})`; // From gray to white
    }
  };

  return (
    <div className="min-h-[90vh] bg-transparent flex flex-col justify-center items-center pb-12">
      <h2 className="text-5xl font-bold transition-colors duration-500 mb-12" style={{ color: getColor(true) }}>
        JakeMc.dev
      </h2>
      <h2 className="text-5xl font-bold transition-colors duration-500" style={{ color: getColor(false) }}>
        Coming soon...
      </h2>
    </div>
  );
};