
import { useRef, useEffect } from "react";

interface VideoDisplayProps {
  videoStream: MediaStream | null;
  hasPermissions: boolean;
}

export const VideoDisplay = ({ videoStream, hasPermissions }: VideoDisplayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.muted = true; // Mute to prevent feedback
      
      // Ensure video is playing
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [videoStream]);

  if (!hasPermissions) return null;

  return (
    <div className="space-y-6">
      <div className="relative w-3/4 mx-auto aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover mirror-mode"
        />
      </div>
      <div className="relative w-3/4 mx-auto aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <span className="text-white">Interviewer Video Feed</span>
      </div>
    </div>
  );
};
