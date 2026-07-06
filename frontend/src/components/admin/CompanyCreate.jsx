import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerCompany = async () => {
    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    try {
      setLoading(true);

      const res = await axios.post(
         "http://localhost:8080/api/v1/company/register",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
       dispatch(setSingleCompany(res.data.company)); // Update the Redux store with the new company
        const companyId = res.data.company._id;

        navigate(`/admin/companies/${companyId}`);
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

      <div className="min-h-[calc(100vh-70px)] bg-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8">

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-violet-100 p-3 rounded-xl">
                <Building2 className="text-violet-600" size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Create Company
                </h1>

                <p className="text-gray-500 mt-1">
                  Give your company a name. You can change it later.
                </p>
              </div>
            </div>

            <div className="space-y-6">

              <div>
                <Label>Company Name</Label>

                <Input
                  type="text"
                  placeholder="Google, Microsoft, Amazon..."
                  className="mt-2 h-12"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancel
                </Button>

                <Button
                  onClick={registerCompany}
                  disabled={loading}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;