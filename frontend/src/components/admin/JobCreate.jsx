import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, BriefcaseBusiness, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const JobCreate = () => {
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "",
    position: "",
    companyId: "",
  });

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/v1/job/post",
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
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-70px)] bg-slate-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="bg-violet-100 p-3 rounded-xl">
              <BriefcaseBusiness className="text-violet-600" size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Post New Job
              </h1>
              <p className="text-gray-500">
                Fill all required job details.
              </p>
            </div>
          </div>

          <form onSubmit={submitHandler}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <Label>Job Title</Label>
                <Input
                  name="title"
                  value={input.title}
                  onChange={changeHandler}
                  placeholder="Frontend Developer"
                />
              </div>

              <div>
                <Label>Company</Label>

                <select
                  name="companyId"
                  value={input.companyId}
                  onChange={changeHandler}
                  className="w-full h-10 rounded-md border border-gray-300 px-3"
                >
                  <option value="">Select Company</option>

                  {companies?.map((company) => (
                    <option
                      key={company._id}
                      value={company._id}
                    >
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Salary</Label>

                <Input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <Label>Experience</Label>

                <Input
                  type="number"
                  name="experience"
                  value={input.experience}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <Label>Position</Label>

                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <Label>Location</Label>

                <Input
                  name="location"
                  value={input.location}
                  onChange={changeHandler}
                />
              </div>

              <div>
                <Label>Job Type</Label>

                <select
                  name="jobType"
                  value={input.jobType}
                  onChange={changeHandler}
                  className="w-full h-10 rounded-md border border-gray-300 px-3"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

            </div>

            <div className="mt-6">
              <Label>Description</Label>

              <textarea
                rows={5}
                name="description"
                value={input.description}
                onChange={changeHandler}
                className="mt-2 w-full rounded-md border border-gray-300 p-3"
              />
            </div>

            <div className="mt-6">
              <Label>Requirements</Label>

              <textarea
                rows={4}
                name="requirements"
                value={input.requirements}
                onChange={changeHandler}
                placeholder="React, Node.js, MongoDB"
                className="mt-2 w-full rounded-md border border-gray-300 p-3"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/AdminJobs")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Job"
                )}
              </Button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default JobCreate;