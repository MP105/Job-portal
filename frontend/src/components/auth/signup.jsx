import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });

  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    if (!form.fullname.trim()) {
      return "Full name is required";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!form.phoneNumber.trim()) {
      return "Phone number is required";
    }

    if (!form.password.trim()) {
      return "Password is required";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("fullname", form.fullname);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("password", form.password);
      formData.append("role", form.role);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccess("Signup Successful 🎉");

        setForm({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "student",
        });

        setFile(null);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-purple-600">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Join our platform 🚀
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Full Name */}
            <div>
              <Label>Full Name</Label>

              <Input
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Enter Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>

              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            {/* Phone */}
            <div>
              <Label>Phone Number</Label>

              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
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
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
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
                className="w-full border rounded-md p-2"
              >
                <option value="student">
                  Student
                </option>

                <option value="recruiter">
                  Recruiter
                </option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <Label>Profile Photo</Label>

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border rounded-md p-2"
              />

              {file && (
                <p className="text-green-600 text-xs mt-1">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center rounded-md p-2">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 text-sm text-center rounded-md p-2">
                {success}
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold ${
                loading
                  ? "bg-red-600 hover:bg-red-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                  <span>
                    Creating Account...
                  </span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-5 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-medium"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;