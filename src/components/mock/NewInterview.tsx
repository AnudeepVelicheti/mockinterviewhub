import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export const NewInterview = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermissions(true);
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Permission Error",
        description:
          "Please allow camera and microphone access to start the interview",
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!hasPermissions) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Camera Access Required</h2>
        <p className="text-muted-foreground">
          Please allow camera and microphone access to start the interview
        </p>
        <Button onClick={requestPermissions}>Request Permissions</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
      <div className="space-y-6">
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          <span className="text-muted-foreground">Interviewer Video Feed</span>
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-1/2 bg-muted rounded-lg p-4">
          <div className="font-mono text-sm h-full overflow-auto">
            // Code editor placeholder
            function example() {"{"}
              console.log("Code editor will be implemented here");
            {"}"}
          </div>
        </div>
        <div className="h-1/2 flex flex-col">
          <div className="flex-1 bg-muted rounded-lg p-4 mb-4 overflow-auto">
            <div className="space-y-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">Interviewer:</span> Hello! Let's
                  start with a simple coding question. Can you implement a function
                  that reverses a string?
                </p>
              </div>
              {transcript && (
                <div className="bg-secondary p-3 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">You:</span> {transcript}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <Textarea
              placeholder="Type your response..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="flex-1"
            />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};