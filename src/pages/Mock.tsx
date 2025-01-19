import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { NewInterview } from "@/components/mock/NewInterview";
import { PreviousInterviews } from "@/components/mock/PreviousInterviews";
import { Recordings } from "@/components/mock/Recordings";

const Mock = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 ml-16">
        {!selectedOption ? (
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:border-primary"
              onClick={() => setSelectedOption("new")}
            >
              <span className="text-xl">New Interview</span>
              <span className="text-sm text-muted-foreground">
                Start a new mock interview session
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:border-primary"
              onClick={() => setSelectedOption("previous")}
            >
              <span className="text-xl">Previous Interviews</span>
              <span className="text-sm text-muted-foreground">
                View your past interview sessions
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 hover:border-primary"
              onClick={() => setSelectedOption("recordings")}
            >
              <span className="text-xl">Recordings</span>
              <span className="text-sm text-muted-foreground">
                Access your interview recordings
              </span>
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => setSelectedOption(null)}
            >
              ← Back
            </Button>
            {selectedOption === "new" && <NewInterview />}
            {selectedOption === "previous" && <PreviousInterviews />}
            {selectedOption === "recordings" && <Recordings />}
          </div>
        )}
      </main>
    </div>
  );
};

export default Mock;