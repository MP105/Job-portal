import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/Home";
import Jobs from "./components/jobs";
import Browse from "./components/browse";
import Profile from "./components/profile";
import JobDescription from "./components/JobDescription";
import CompanyCreate from "./components/admin/CompanyCreate";
import { Toaster } from "sonner";
import Companies from "./components/admin/companies";
import CompanySetup from "./components/admin/companySetup";
import AdminJobs from "./components/admin/AdminJobs";
import JobCreate from "./components/admin/JobCreate";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
    {
      path: "/description/:jobId",
      element: <JobDescription />,
    },
  //admin routes//
{
  path: "/admin/companies",
  element: (
    <ProtectedRoute>
      <Companies />
    </ProtectedRoute>
  ),
},
{
  path: "/admin/CompanyCreate",
  element: (
    <ProtectedRoute>
      <CompanyCreate />
    </ProtectedRoute>
  ),
},
{
  path: "/admin/Companies/:companyId",
  element: (
    <ProtectedRoute>
      <CompanySetup />
    </ProtectedRoute>
  ),
},
{
  path: "/admin/AdminJobs",
  element: (
    <ProtectedRoute>
      <AdminJobs />
    </ProtectedRoute>
  ),
},
{
  path: "/admin/Jobs/Create",
  element: (
    <ProtectedRoute>
      <JobCreate />
    </ProtectedRoute>
  ),
},
{
  path: "/admin/Jobs/:id/applicants",
  element: (
    <ProtectedRoute>
      <Applicants />
    </ProtectedRoute>
  ),
},
    
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* Toast Notification */}
      <Toaster
        position="top-right"
        richColors
      />
    </>
  );
}

export default App;