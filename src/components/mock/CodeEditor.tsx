
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProps {
  initialCode: string;
}

// List of available programming languages
const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
];

// Default starter code for each language
const STARTER_CODE = {
  javascript: `function example() {\n  // Write your code here\n  \n}`,
  typescript: `function example(): void {\n  // Write your code here\n  \n}`,
  python: `def example():\n  # Write your code here\n  pass`,
  java: `public class Example {\n  public static void main(String[] args) {\n    // Write your code here\n    \n  }\n}`,
  csharp: `using System;\n\nclass Program {\n  static void Main() {\n    // Write your code here\n    \n  }\n}`,
  cpp: `#include <iostream>\n\nint main() {\n  // Write your code here\n  \n  return 0;\n}`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n  // Write your code here\n  \n}`,
  ruby: `def example\n  # Write your code here\n  \nend`,
  rust: `fn main() {\n  // Write your code here\n  \n}`,
  php: `<?php\nfunction example() {\n  // Write your code here\n  \n}\n?>`,
};

export const CodeEditor = ({ initialCode }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState("javascript");
  const [sendingCode, setSendingCode] = useState(false);
  const { toast } = useToast();

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // Update code with starter template for the selected language
    setCode(STARTER_CODE[value as keyof typeof STARTER_CODE] || initialCode);
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
      <div className="absolute top-2 right-4 z-10 flex gap-2">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-40 bg-background">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Editor
        height="100%"
        language={language}
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
