import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { Users } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

function Applicants() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getApplicants = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8080/api/v1/application/${id}/applicants`,
          {
            withCredentials: true,
          }
        );

        console.log(res.data);

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.applicants));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getApplicants();
    }
  }, [id, dispatch]);

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-70px)] bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4">

          <div className="bg-white rounded-xl shadow border p-6 mb-6 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-xl bg-violet-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-violet-600" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Applicants
                </h1>

                <p className="text-gray-500">
                  Manage all applicants for this job.
                </p>
              </div>

            </div>

            <div className="bg-violet-600 text-white px-5 py-2 rounded-full">
              Total : {applicants.length}
            </div>

          </div>

          <ApplicantsTable
            applicants={applicants}
            loading={loading}
          />

        </div>
      </div>
    </>
  );
}

export default Applicants;