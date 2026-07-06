import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs } from "@/redux/applicationSlice";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

const AppliedJobTable = () => {
  const dispatch = useDispatch();

  const applicationState = useSelector((store) => store.application);

  const appliedJobs = applicationState?.appliedJobs || [];

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/application/get",
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.applications));
        } else {
          dispatch(setAppliedJobs([]));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAppliedJobs([]));
      }
    };

    getAppliedJobs();
  }, [dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-4 sm:p-6">

      <h1 className="text-xl font-bold mb-5">
        Applied Jobs
      </h1>

      <div className="overflow-x-auto">

        <Table>

          <TableCaption>
            List of your applied jobs
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (

              appliedJobs.map((item) => (

                <TableRow key={item._id}>

                  <TableCell>
                    {item.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    {item.job?.title}
                  </TableCell>

                  <TableCell>
                    {item.job?.company?.name}
                  </TableCell>

                  <TableCell>

                    <Badge
                      className={
                        item.status === "accepted"
                          ? "bg-green-600 text-white"
                          : item.status === "rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-white"
                      }
                    >
                      {item.status
                        ? item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)
                        : "Pending"}
                    </Badge>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={4}
                  className="text-center py-8"
                >
                  No Applications Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

    </div>
  );
};

export default AppliedJobTable;