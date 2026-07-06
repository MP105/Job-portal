import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Salary in LPA
  const salaryInLPA = (job?.salary / 100000).toFixed(1);

  // Days Ago
  const daysAgo = Math.floor(
    (new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">

      {/* Top */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </p>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 my-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={
              job?.company?.logo ||
              "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
            }
          />
        </Avatar>

        <div>
          <h1 className="font-semibold text-base">
            {job?.company?.name}
          </h1>

          <p className="text-sm text-gray-500">
            {job?.location}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <div>
        <h1 className="font-bold text-xl mb-2">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge
          variant="ghost"
          className="text-blue-700 font-semibold bg-blue-50"
        >
          {job?.position} Positions
        </Badge>

        <Badge
          variant="ghost"
          className="text-[#F83002] font-semibold bg-red-50"
        >
          {job?.jobType}
        </Badge>

        <Badge
          variant="ghost"
          className="text-[#7209B7] font-semibold bg-purple-50"
        >
          {salaryInLPA} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="flex-1"
        >
          Details
        </Button>

        <Button
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          Save For Later
        </Button>
      </div>

    </div>
  );
};

export default Job;