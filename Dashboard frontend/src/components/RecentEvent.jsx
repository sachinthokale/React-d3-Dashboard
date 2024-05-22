/* eslint-disable react/prop-types */
import LinkIcon from "@mui/icons-material/Link";

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
          <p className="w-20 text-sm">Sector</p>
          <p className="text-md font-bold w-11/12">{event.sector}</p>
        </div>
        <div className="flex w-full ">
          <div className="flex borderw-1/2 items-center">
            <p className="w-20 text-sm">Start Year</p>
            <p className="text-md font-bold ">{event.start_year}</p>
          </div>
          <div className="flex w-1/2 items-center ml-20">
            <p className="w-20 text-sm">End Year</p>
            <p className="text-md font-bold ">{event.end_year}</p>
          </div>
        </div>
        <div className="flex w-full ">
          <p className="w-20 text-sm">Source</p>
          <a target="blank" href={`${event.url}`} className="flex  w-11/12">
            <p className="text-md font-bold mr-1">{event.source}</p>
            <LinkIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecentEvent;
