import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  console.log(job);
console.log(job.company);
console.log(job.company.logo);

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Company Info */}
{/* Company Info */}
<div className="flex items-center gap-3">

  <img
    src={
      job?.company?.logo ? job.company.logo : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    }
    alt={job?.company?.name}
    className="w-14 h-14 rounded-lg object-cover border"
  />

  <div>
    <h1 className="font-semibold text-lg text-gray-800">
      {job?.company?.name}
    </h1>

    <p className="text-sm text-gray-500">
      {job?.location}
    </p>
  </div>

</div>

      {/* Job Info */}
      <div className="my-4">
        <h1 className="font-bold text-xl text-gray-900">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 flex-wrap mt-4">

        <Badge
          variant="secondary"
          className="text-blue-700 font-semibold"
        >
          {job?.position} Positions
        </Badge>

        <Badge
          variant="secondary"
          className="text-[#F83002] font-semibold"
        >
          {job?.jobType}
        </Badge>

        <Badge
          variant="secondary"
          className="text-[#7209B7] font-semibold"
        >
          ₹ {job?.salary} LPA
        </Badge>

      </div>
    </div>
  );
}

export default LatestJobCards;