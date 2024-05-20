import { useEffect, useState } from "react";

import axios from "axios";
import Histogram_Intensity_Sector from "./components/Histogram_Intensity_Sector";
// import LineChart from "./components/LineChart";
import GeoChart from "./components/GeoChart";
import PieChart from "./components/PieChart";

const App = () => {
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
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* <Histogram_Intensity_Sector data={wholeData} /> */}
      {/* <LineChart data={wholeData} /> */}
      {/* <GeoChart data={wholeData} /> */}
      <PieChart data={wholeData} />
    </div>
  );
};

export default App;
