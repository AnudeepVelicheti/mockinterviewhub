
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ChatInterface = () => {
  const [transcript, setTranscript] = useState("");

  return (
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
  );
};
