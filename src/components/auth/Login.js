import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://192.168.100.24:4000/api/users/login",
        {
          email,
          password,
        }
      );
      dispatch(hideLoading());
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.authToken);
        navigate("/");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setError("Invalid credentials. Please check your email and password.");
      dispatch(hideLoading());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={error ? "border-red-500" : ""}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={error ? "border-red-500" : ""}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
