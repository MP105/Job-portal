import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft, Building2, UploadCloud, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanySetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // Fetch Company
  useEffect(() => {
    const getSingleCompany = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-pied-kappa.vercel.app/api/v1/company/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (companyId) {
      getSingleCompany();
    }
  }, [companyId, dispatch]);

  // Fill Form
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);

      if (input.file) {
        formData.append("file", input.file);
      }

      const res = await axios.put(
  `https://job-portal-pied-kappa.vercel.app/api/v1/company/update/${companyId}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  }
);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleCompany(res.data.company));
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-70px)] bg-slate-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-violet-600" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    Company Setup
                  </h1>

                  <p className="text-gray-500">
                    Update your company information.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">

              <div>
                <Label>Company Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="mt-2 h-11"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="mt-2 h-11"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <Label>Website</Label>
                  <Input
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="mt-2 h-11"
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="mt-2 h-11"
                  />
                </div>

              </div>

              <div>
                <Label>Company Logo</Label>

                <div className="border-2 border-dashed rounded-xl p-6 text-center mt-2">

                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />

                  <Input
                    type="file"
                    accept="image/*"
                    className="mt-4"
                    onChange={changeFileHandler}
                  />

                  {input.file && (
                    <p className="text-green-600 mt-3">
                      {input.file.name}
                    </p>
                  )}

                </div>
              </div>

              <div className="flex justify-end gap-4">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                >
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
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;