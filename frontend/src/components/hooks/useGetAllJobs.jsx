import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setAllJobs } from "@/redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/job/get",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;