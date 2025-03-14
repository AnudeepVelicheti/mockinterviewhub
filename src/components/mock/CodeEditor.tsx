
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CodeEditorProps {
  initialCode: string;
}

export const CodeEditor = ({ initialCode }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [sendingCode, setSendingCode] = useState(false);
  const { toast } = useToast();

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const handleSendCode = async () => {
    // Set loading state
    setSendingCode(true);
    
    try {
      // Here you would integrate with your backend API
      // For now, we'll simulate a backend call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "Code Submitted",
        description: "Your code has been successfully sent to the interviewer",
      });
    } catch (error) {
      // Show error toast
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Failed to send code. Please try again.",
      });
      console.error("Error sending code:", error);
    } finally {
      setSendingCode(false);
    }
  };

  return (
    <div className="h-1/2 bg-muted rounded-lg overflow-hidden relative">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
      <div className="absolute bottom-4 right-4">
        <Button 
          onClick={handleSendCode} 
          disabled={sendingCode} 
          className="gap-2"
        >
          {sendingCode ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Send Code
        </Button>
      </div>
    </div>
  );
};
