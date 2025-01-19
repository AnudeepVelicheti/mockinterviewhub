import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "user" && password === "test") {
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials. Use username: user, password: test",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <a href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot Password?
        </a>
        <a href="/register" className="text-sm text-primary hover:underline">
          Create account
        </a>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};