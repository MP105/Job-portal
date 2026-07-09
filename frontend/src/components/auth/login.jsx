import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../shared/Navbar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!form.password.trim()) {
      return "Password is required";
    }

    if (!form.role) {
      return "Role is required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      dispatch(setLoading(true));

      setError("");
      setSuccess("");

      const res = await axios.post(
        "https://job-portal-pied-kappa.vercel.app/api/v1/user/login",
        {
          email: form.email,
          password: form.password,
          role: form.role,
        },
        {
          withCredentials: true,
        }
      );

if (res.data.success) {
  dispatch(setUser(res.data.user));

  setSuccess(res.data.message);

  setTimeout(() => {
    navigate("/");
  }, 1000);
}
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#111a2e]">
      <Navbar />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#111a2e]">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">
              Login to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <Label>Role</Label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-md p-2 outline-none"
              >
                <option value="student">
                  Student
                </option>

                <option value="recruiter">
                  Recruiter
                </option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 p-2 rounded-md text-sm text-center">
                {success}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold transition-all duration-300 ${
                loading
                  ? "bg-red-600 hover:bg-red-600 cursor-not-allowed"
                  : "bg-[#111a2e] hover:bg-[#1b2744]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  <span>
                    Logging In...
                  </span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;