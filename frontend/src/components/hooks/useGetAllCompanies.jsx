import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/company/get",
          {
            withCredentials: true,
          }
        );
console.log(res.data);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;