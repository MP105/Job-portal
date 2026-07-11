import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminJobsUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // Get Companies
  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/company/get",
          { withCredentials: true }
        );

        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCompanies();
  }, []);

  // Get Single Job
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/job/get/${id}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const job = res.data.job;

          setInput({
            title: job.title,
            description: job.description,
            requirements: job.requirements.join(","),
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            experience: job.experienceLevel,
            position: job.position,
            companyId: job.company?._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSingleJob();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        `http://localhost:8080/api/v1/job/update/${id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/AdminJobs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Update Job
      </h1>

      <form
        onSubmit={submitHandler}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          placeholder="Job Title"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="salary"
          value={input.salary}
          onChange={changeEventHandler}
          placeholder="Salary"
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          value={input.location}
          onChange={changeEventHandler}
          placeholder="Location"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="experience"
          value={input.experience}
          onChange={changeEventHandler}
          placeholder="Experience"
          className="border p-3 rounded"
        />

        <input
          type="number"
          name="position"
          value={input.position}
          onChange={changeEventHandler}
          placeholder="Position"
          className="border p-3 rounded"
        />

        <select
          name="jobType"
          value={input.jobType}
          onChange={changeEventHandler}
          className="border p-3 rounded"
        >
          <option value="">Select Job Type</option>
          <option value="Full Time">
            Full Time
          </option>
          <option value="Part Time">
            Part Time
          </option>
          <option value="Internship">
            Internship
          </option>
        </select>

        <select
          name="companyId"
          value={input.companyId}
          onChange={changeEventHandler}
          className="border p-3 rounded"
        >
          <option value="">
            Select Company
          </option>

          {companies.map((company) => (
            <option
              key={company._id}
              value={company._id}
            >
              {company.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="requirements"
          value={input.requirements}
          onChange={changeEventHandler}
          placeholder="Requirements (comma separated)"
          className="border p-3 rounded"
        />

        <textarea
          name="description"
          value={input.description}
          onChange={changeEventHandler}
          placeholder="Description"
          className="border p-3 rounded md:col-span-2"
          rows={5}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white py-3 rounded md:col-span-2"
        >
          {loading
            ? "Updating..."
            : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default AdminJobsUpdate;