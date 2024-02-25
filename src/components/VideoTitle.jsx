import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[30%] md:pt-[23%] pl-[4%] absolute text-white md:bg-gradient-to-r from-black">
      <h1 className="text-xl pb-3 md:pb-0 md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-4 text-lg w-1/3">{overview}</p>
      <div className="flex gap-5">
        <button className="py-1 px-2 md:px-8 border border-solid  rounded-lg text-center flex items-center gap-1 md:gap-2 bg-white hover:bg-opacity-80">
          <span className="text-lg md:text-3xl text-black">▶️ </span>
          <span className="text-sm md:text-lg text-black">Play</span>
        </button>
        <button className="py-1 px-2 md:px-6 rounded-lg text-lg flex items-center gap-1 md:gap-3 bg-[#6d6d6eb3] hover:bg-[#6d6d6ee6]">
          <span className="text-lg md:text-xl rounded-full">ℹ️</span>
          <span className="text-sm md:text-lg text-white">More info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
