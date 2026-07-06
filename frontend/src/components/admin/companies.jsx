import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./companiesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetAllCompanies from "../hooks/useGetAllCompanies";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies(); 
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { companies } = useSelector((store) => store.company);

  useEffect(() => {
   dispatch(setSearchCompanyByText(searchTerm));
  }, [searchTerm, companies]);
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">

          <Input
            className="w-full sm:w-72 md:w-80"
            placeholder="Filter by company name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            onClick={() => navigate("/admin/CompanyCreate")}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <CompaniesTable />
        </div>

      </div>
    </div>
  );
};

export default Companies;