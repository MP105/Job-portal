import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";


import { toast } from "sonner";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
console.log("Navbar File Loaded");
console.log(user);
console.log(user?.role);
console.log(user?.role === "recruiter");
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-pied-kappa.vercel.app/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Logout Failed"
      );
    }
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold">
            Job<span className="text-purple-600">Portal</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
  <div className="hidden md:flex items-center gap-8 text-lg font-medium">
  {user?.role?.trim().toLowerCase() === "recruiter" ? (
    <>
      <Link
        to="/admin/companies"
        className="hover:text-purple-600 transition"
      >
        Companies
      </Link>

      <Link
        to="/admin/AdminJobs"
        className="hover:text-purple-600 transition"
      >
        Jobs
      </Link>
    </>
  ) : (
    <>
      <Link
        to="/"
        className="hover:text-purple-600 transition"
      >
        Home
      </Link>

      <Link
        to="/jobs"
        className="hover:text-purple-600 transition"
      >
        Jobs
      </Link>

      <Link
        to="/browse"
        className="hover:text-purple-600 transition"
      >
        Browse
      </Link>
    </>
  )}
</div>

        {/* Right Side */}
        {!user ? (
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/login"
              className="px-3 py-2 md:px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-600 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 py-2 md:px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Signup
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-12 w-12 cursor-pointer border-2 border-purple-500">
                <AvatarImage src={user?.profile?.profilePhoto} />

                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {user?.fullname?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

         <PopoverContent
  align="end"
  sideOffset={10}
  className="w-80 rounded-2xl border bg-white shadow-2xl z-[9999] p-5"
>
              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profile?.profilePhoto} />

                    <AvatarFallback>
                      {user?.fullname?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold text-lg">
                      {user?.fullname}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user?.role}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="flex flex-col gap-3">
                 {
                  user && user.role === "student" && (
                  <Link
                    to="/profile"
                    className="hover:text-purple-600 font-medium"
                  >
                    👤 Profile
                  </Link>)

                 }
                  <button
                    onClick={logoutHandler}
                    className="text-left text-red-500 font-medium hover:text-red-700"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

{/* Mobile Nav */}
<div className="md:hidden border-t bg-white">
  <div className="flex justify-center gap-6 py-3 text-sm font-medium">

    {user?.role?.trim().toLowerCase() === "recruiter" ? (
      <>
        <Link
          to="/admin/companies"
          className="hover:text-purple-600 transition"
        >
          Companies
        </Link>

        <Link
          to="/admin/AdminJobs"
          className="hover:text-purple-600 transition"
        >
          Jobs
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/"
          className="hover:text-purple-600 transition"
        >
          Home
        </Link>

        <Link
          to="/jobs"
          className="hover:text-purple-600 transition"
        >
          Jobs
        </Link>

        <Link
          to="/browse"
          className="hover:text-purple-600 transition"
        >
          Browse
        </Link>
      </>
    )}

  </div>
</div>
    </nav>
  );
}

export default Navbar;