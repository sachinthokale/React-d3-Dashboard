import { Typography } from "@mui/material";
import React from "react";

const RecentEvent = ({ event, colorClass }) => {
  return (
    <div
      style={{ boxShadow: "black 0px 2px 8px" }}
      className={`${colorClass} p-1 rounded-md h-full mx-2 flex text-slate-200`}
    >
      <div>
        <div className="flex  w-full ">
          <p className="w-20 text-sm">Insight</p>
          <p className="text-md font-bold w-11/12 ">{event.insight}</p>
        </div>
        <div className="flex w-full ">
          <p className="w-20 text-sm">Topic</p>
          <p className="text-md font-bold w-11/12">{event.topic}</p>
        </div>
        <div className="flex w-full">
          <p className="w-20 text-sm">Source</p>
          <p className="text-md font-bold w-11/12">{event.source}</p>
        </div>
        <div className="flex w-full">
          <p className="w-20 text-sm">published</p>
          {/* <p className="text-md font-bold w-11/12">
            {event.published.split(" ")[0] +
              event.published.split(" ")[1] +
              " " +
              event.published.split(" ")[2]}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default RecentEvent;
