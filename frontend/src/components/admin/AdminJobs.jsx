import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTable from "./AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all jobs
  useGetAllAdminJobs();

  useEffect(() => {
    dispatch(setSearchJobByText(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">

          <Input
            className="w-full sm:w-72 md:w-80"
            placeholder="Filter by job title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/Jobs/create")}
            className="w-full sm:w-auto"
          >
            New Job
          </Button>

        </div>

        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <AdminJobsTable />
        </div>

      </div>
    </div>
  );
};

export default AdminJobs;