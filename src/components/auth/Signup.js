import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "http://192.168.100.24:4000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      dispatch(hideLoading())
      if (response.data.success) {
        console.log("Working Properly");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log({ message: error });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex h-screen items-center justify-center"
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Max"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
export default Signup;
