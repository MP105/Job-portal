import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();

  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);

  // Page open hote hi filter reset
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, []);

  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(allJobs);
      return;
    }

    const filtered = allJobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    });

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-5">
        <div className="flex flex-col lg:flex-row gap-5">

          <div className="w-full lg:w-[25%]">
            <FilterCard />
          </div>

          <div className="w-full lg:flex-1">

            {filterJobs.length === 0 ? (
              <h2 className="text-center text-lg">
                No Jobs Found
              </h2>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filterJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;