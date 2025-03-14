
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MediaStreamHook {
  stream: MediaStream | null;
  hasPermissions: boolean;
  isLoading: boolean;
  requestPermissions: () => Promise<void>;
}

export const useMediaStream = (): MediaStreamHook => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const requestPermissions = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "user", // This ensures we use the front-facing camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setHasPermissions(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Permission error:", error);
      toast({
        variant: "destructive",
        title: "Permission Error",
        description:
          "Please allow camera and microphone access to start the interview",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestPermissions();
    
    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return { stream, hasPermissions, isLoading, requestPermissions };
};
