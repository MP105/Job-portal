import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Edit2,
  MoreHorizontal,
  Trash2,
   Eye,
} from "lucide-react";


import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const navigate = useNavigate();

const { allAdminJobs = [], searchJobByText = "" } = useSelector(
  (store) => store.job
);

const [filteredJobs, setFilteredJobs] = useState([]);

useEffect(() => {
  const jobs = Array.isArray(allAdminJobs) ? allAdminJobs : [];

  if (!searchJobByText) {
    setFilteredJobs(jobs);
    return;
  }

  const filtered = jobs.filter((job) =>
    job.title?.toLowerCase().includes(searchJobByText.toLowerCase())
  );

  setFilteredJobs(filtered);
}, [allAdminJobs, searchJobByText]);



  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption>List of your posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>

                <TableCell>
                  {job.company?.name}
                </TableCell>

                <TableCell>{job.location}</TableCell>

                <TableCell>
                  ₹ {job.salary}
                </TableCell>

                <TableCell>
                  {new Date(job.createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="rounded-full p-2 hover:bg-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </PopoverTrigger>

<PopoverContent className="w-48 p-2">
  <div className="space-y-1">


    <button
      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
      className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100"
    >
      <Eye className="w-4 h-4" />
      <span>Applicants</span>
    </button>

  </div>
</PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6"
              >
                No Jobs Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;