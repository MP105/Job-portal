import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import axios from "axios";
import { useSelector } from "react-redux";

const Browse = () => {
  const { searchQuery } = useSelector((store) => store.job);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
console.log("Search Query:", searchQuery);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://job-portal-pied-kappa.vercel.app/api/v1/job/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
console.log(res.data);
        if (res.data.success) {
          setJobs(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4">

        <h1 className="text-2xl font-bold mb-6">
          Search Results ({jobs.length})
        </h1>

        {loading ? (
          <h2 className="text-center text-lg font-semibold">
            Loading...
          </h2>
        ) : jobs.length === 0 ? (
          <h2 className="text-center text-gray-500 text-lg">
            No Jobs Found
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Browse;