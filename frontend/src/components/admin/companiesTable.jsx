import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Edit2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    if (!searchCompanyByText) {
      setFilteredCompanies(companies);
      return;
    }

    const filtered = companies.filter((company) =>
      company.name
        .toLowerCase()
        .includes(searchCompanyByText.toLowerCase())
    );

    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  const deleteCompanyHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/company/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption>List of your registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="h-11 w-11">
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>
                      {company.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell className="font-medium">
                  {company.name}
                </TableCell>

                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString("en-GB")}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="rounded-full p-2 hover:bg-gray-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-2">
                      <div className="space-y-1">
                        <button
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-100"
                        >
                          <Edit2 size={16} />
                          Edit Company
                        </button>

                        <button
                          onClick={() =>
                            deleteCompanyHandler(company._id)
                          }
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete Company
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No Companies Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;