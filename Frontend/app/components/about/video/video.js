"use client";

// import video from "../../../../public/video.mp4";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

const Videoplayer = () => {
  return (
    <ReactPlayer
      url="https://youtu.be/VJHEKcKqvOI"
      width="100%"
      playing
      muted
    />
  );
};
export default Videoplayer;
