import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Badge } from "../ui/badge";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const shortlistingStatus = [
  "Accepted",
  "Rejected",
  "Pending",
];

function ApplicantsTable({ applicants, loading }) {

const statusHandler = async (status, applicationId) => {
  try {
    const res = await axios.post(
      `https://job-portal-pied-kappa.vercel.app/api/v1/application/status/${applicationId}`,
      {
        status: status.toLowerCase(),
      },
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);

      // Applicants page refresh
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="bg-white rounded-xl shadow border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Full Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Contact</TableHead>

            <TableHead>Resume</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Date</TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {loading ? (

            <TableRow>

              <TableCell
                colSpan={7}
                className="text-center py-10"
              >
                Loading...
              </TableCell>

            </TableRow>

          ) : applicants?.length > 0 ? (

            applicants.map((item) => (

              <TableRow key={item._id}>

                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>

                <TableCell>
                  {item?.applicant?.email}
                </TableCell>

                <TableCell>
                  {item?.applicant?.phoneNumber}
                </TableCell>

                <TableCell>

                  {item?.applicant?.profile?.resume ? (

                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>

                  ) : (

                    <span className="text-gray-500">
                      No Resume
                    </span>

                  )}

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
    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
  </Badge>
</TableCell>
                <TableCell>
                  {item.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">

                  <Popover>

                    <PopoverTrigger asChild>

                      <MoreHorizontal className="h-5 w-5 cursor-pointer ml-auto" />

                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-2">

                      <div className="space-y-1">

                        {shortlistingStatus.map((status, index) => (

                          <div
                            key={index}
                            onClick={() =>
                              statusHandler(status, item._id)
                            }
                            className="px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition"
                          >
                            {status}
                          </div>

                        ))}

                      </div>

                    </PopoverContent>

                  </Popover>

                </TableCell>

              </TableRow>

            ))

          ) : (

            <TableRow>

              <TableCell
                colSpan={7}
                className="text-center py-10 text-gray-500"
              >
                No Applicants Found
              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

    </div>
  );
}

export default ApplicantsTable;