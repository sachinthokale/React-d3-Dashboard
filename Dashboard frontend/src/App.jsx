import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Histogram_Intensity_Sector from "./components/Histogram_Intensity_Sector";
// import LineChart from "./components/LineChart";
import GeoChart from "./components/GeoChart";
import PieChart from "./components/PieChart";
import SideDrawer from "./components/SideDrawer";
import RecentEvent from "./components/RecentEvent";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MyContext, MyProvider } from "./components/Context";

const App = () => {
  const { filterContextData } = useContext(MyContext);
  const colors = ["bg-[#ff0054]", "bg-[#fca311]", "bg-[#3A86FF]"];
  const [selectedOption, setSelectedOption] = useState("intensity");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [wholeData, setWholeData] = useState([
    {
      end_year: String,
      intensity: Number,
      sector: String,
      topic: String,
      insight: String,
      url: String,
      region: String,
      start_year: String,
      impact: String,
      added: String,
      published: String,
      country: String,
      relevance: Number,
      pestle: String,
      source: String,
      title: String,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/getdata");
      // console.log(response.data.data);
      setWholeData(response.data.data);
    };
    fetchData();
  }, []);

  const recentEvents = filterContextData
    .sort((a, b) => b.start_year - a.start_year)
    .slice(0, 30);

  return (
    <div className=" w-screen h-screen flex">
      <SideDrawer />

      <div className="flex flex-col md:flex-col w-5/6 h-screen bg-[#022B3A]">
        <Carousel
          style={{ boxShadow: "black 0px 2px 8px" }}
          responsive={responsive}
          className=" w-full h-2/5 "
        >
          {recentEvents.map((event, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <RecentEvent key={index} event={event} colorClass={colorClass} />
            );
          })}
        </Carousel>
        <div className="w-full h-full flex  ">
          <div className="w-full h-full md:h-3/5 flex flex-col md:flex-row border border-white ">
            <div
              style={{ boxShadow: "black 0px 2px 8px" }}
              className=" w-full md:w-1/3 m-2 p-2"
            >
              <Histogram_Intensity_Sector data={wholeData} />
            </div>
            <div
              style={{ boxShadow: "black 0px 2px 8px" }}
              className=" w-full  md:w-1/3 m-2 flex flex-col"
            >
              <div className=" w-full h-1/6 flex justify-center items-center p-2 ">
                <label className=" text-[#ff0054] text-md font-bold flex  items-center w-full">
                  <div
                    className={`w-3 h-3 border border-[#ff0054] rounded-sm mr-2 ${
                      selectedOption == "intensity" ? "bg-[#ff0054]" : null
                    }`}
                  ></div>
                  <input
                    className=" appearance-none"
                    type="radio"
                    name="dataOption"
                    value="intensity"
                    checked={selectedOption === "intensity"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Intensity
                </label>

                <label className=" text-[#fca311] text-md font-bold flex  items-center w-full">
                  <div
                    className={`w-3 h-3 border border-[#fca311] rounded-sm mr-2 ${
                      selectedOption == "likelihood" ? "bg-[#fca311]" : null
                    }`}
                  ></div>
                  <input
                    className=" appearance-none"
                    type="radio"
                    name="dataOption"
                    value="likelihood"
                    checked={selectedOption === "likelihood"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Likelihood
                </label>
                <label className="  text-[#00f5d4] text-md font-bold flex items-center w-full">
                  <div
                    className={`w-3 h-3 border border-[#00f5d4] rounded-sm mr-2 ${
                      selectedOption == "relevance" ? "bg-[#00f5d4]" : null
                    }`}
                  ></div>
                  <input
                    className=" appearance-none"
                    type="radio"
                    name="dataOption"
                    value="relevance"
                    checked={selectedOption === "relevance"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Relevance
                </label>
              </div>
              <div className=" w-full h-5/6">
                <GeoChart data={wholeData} selectedOption={selectedOption} />
              </div>
            </div>
            <div
              style={{ boxShadow: "black 0px 2px 8px" }}
              className=" w-full  md:w-1/3 m-2"
            >
              <div className="w-full h-5 border border-white"></div>
              <div className=" w-full h-5/6">
                <PieChart data={wholeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
