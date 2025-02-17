import React, { useRef, useEffect } from "react";
import { Card } from "./ui/card";

interface VideoPlayerProps {
  src?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void;
}

const VideoPlayer = ({
  src = "",
  autoPlay = true,
  loop = true,
  muted = false,
  onEnded = () => {},
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  return (
    <Card className="aspect-video bg-black relative overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onEnded={onEnded}
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
    </Card>
  );
};

export default VideoPlayer;
