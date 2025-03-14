
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoDisplay } from "./VideoDisplay";
import { CodeEditor } from "./CodeEditor";
import { ChatInterface } from "./ChatInterface";
import { useMediaStream } from "@/hooks/useMediaStream";

export const NewInterview = () => {
  const { stream, hasPermissions, isLoading, requestPermissions } = useMediaStream();

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
      <VideoDisplay videoStream={stream} hasPermissions={hasPermissions} />
      <div className="space-y-6">
        <CodeEditor initialCode={`function example() {\n  // Write your code here\n  \n}`} />
        <ChatInterface />
      </div>
    </div>
  );
};
