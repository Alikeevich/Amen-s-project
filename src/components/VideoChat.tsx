import React, { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Volume2, VolumeX, Mic, MicOff, UserPlus } from "lucide-react";

interface VideoChatProps {
  onNextPerson?: () => void;
}

const VideoChat = ({ onNextPerson = () => {} }: VideoChatProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getAudioTracks().forEach((track) => {
          track.enabled = isMicOn;
        });
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();

    return () => {
      if (localVideoRef.current?.srcObject) {
        const tracks = (
          localVideoRef.current.srcObject as MediaStream
        ).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isMicOn;
      });
    }
  }, [isMicOn]);

  const partnerVideoUrl = "/videoplayback.mp4";

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="aspect-video bg-black relative overflow-hidden">
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          >
            <source src={partnerVideoUrl} type="video/mp4" />
          </video>
        </Card>

        <Card className="aspect-video bg-black relative overflow-hidden">
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover mirror"
            autoPlay
            playsInline
            muted
          />
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant={isMicOn ? "default" : "destructive"}
              size="icon"
              onClick={() => setIsMicOn(!isMicOn)}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                className="w-[100px]"
                value={[isMuted ? 0 : currentVolume * 100]}
                onValueChange={(value) => setCurrentVolume(value[0] / 100)}
                max={100}
                step={1}
              />
            </div>
          </div>

          <Button
            size="lg"
            onClick={onNextPerson}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Следующий собеседник
          </Button>
        </div>
      </Card>

      <style jsx>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
};

export default VideoChat;
