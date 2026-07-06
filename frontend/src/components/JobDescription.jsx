import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
const JobDescription = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

const isApplied = singleJob?.applicants?.some(
  (application) => application.applicant?._id === user?._id
);

  const applyJobHandler = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/application/apply/${jobId}`,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
  console.log(error);
  console.log(error.response);

  toast.error(
    error.response?.data?.message || error.message
  );
}
};
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/job/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto my-10 px-4">
        <div className="bg-white shadow-lg rounded-2xl border p-8">

          {/* Top */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold">
                {singleJob?.title}
              </h1>

              <div className="flex flex-wrap gap-3 mt-4">
                <Badge
                  variant="secondary"
                  className="text-blue-700 bg-blue-100"
                >
                  {singleJob?.position} Positions
                </Badge>

                <Badge
                  variant="secondary"
                  className="text-red-700 bg-red-100"
                >
                  {singleJob?.jobType}
                </Badge>

                <Badge
                  variant="secondary"
                  className="text-purple-700 bg-purple-100"
                >
                  {(singleJob?.salary / 100000).toFixed(1)} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={applyJobHandler}
              disabled={isApplied}
              className={
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f0f99]"
              }
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>

          </div>

          <div className="border-b my-7"></div>

          <h1 className="font-bold text-2xl mb-6">
            Job Description
          </h1>

          <div className="space-y-5">

            <div>
              <span className="font-bold">Company : </span>
              <span className="text-gray-600">
                {singleJob?.company?.name}
              </span>
            </div>

            <div>
              <span className="font-bold">Role : </span>
              <span className="text-gray-600">
                {singleJob?.title}
              </span>
            </div>

            <div>
              <span className="font-bold">Location : </span>
              <span className="text-gray-600">
                {singleJob?.location}
              </span>
            </div>

            <div>
              <span className="font-bold">Description : </span>
              <span className="text-gray-600">
                {singleJob?.description}
              </span>
            </div>

            <div>
              <span className="font-bold">Experience : </span>
              <span className="text-gray-600">
                {singleJob?.experienceLevel} Years
              </span>
            </div>

            <div>
              <span className="font-bold">Salary : </span>
              <span className="text-gray-600">
                {(singleJob?.salary / 100000).toFixed(1)} LPA
              </span>
            </div>

            <div>
              <span className="font-bold">Requirements : </span>
              <span className="text-gray-600">
                {singleJob?.requirements?.join(", ")}
              </span>
            </div>

            <div>
              <span className="font-bold">Total Applicants : </span>
              <span className="text-gray-600">
                {singleJob?.applicants?.length || 0}
              </span>
            </div>

            <div>
              <span className="font-bold">Posted Date : </span>
              <span className="text-gray-600">
                {singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default JobDescription;