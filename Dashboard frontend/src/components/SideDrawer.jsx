import { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { MyContext } from "./Context";

const drawerWidth = 200;

const SideDrawer = () => {
  const { setFilterContextData } = useContext(MyContext);
  const [wholeData, setWholeData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [pestles, setPestles] = useState([]);
  const [sources, setSources] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    swot: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://react-d3-dashboard-backend.onrender.com/api/getdata"
      );
      setWholeData(response.data.data);
      setFilterContextData(response.data.data);
      console.log("in side");

      // Extract unique topics from data
      const uniqueTopics = [
        ...new Set(response.data.data.map((item) => item.topic)),
      ];
      setTopics(uniqueTopics);

      const uniqueSectors = [
        ...new Set(response.data.data.map((item) => item.sector)),
      ];
      setSectors(uniqueSectors);

      const uniqueRegions = [
        ...new Set(response.data.data.map((item) => item.region)),
      ];
      setRegions(uniqueRegions);

      const uniquePestles = [
        ...new Set(response.data.data.map((item) => item.pestle)),
      ];
      setPestles(uniquePestles);

      const uniqueSources = [
        ...new Set(response.data.data.map((item) => item.source)),
      ];
      setSources(uniqueSources);
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = (updatedFilters) => {
    let filtered = wholeData;

    if (updatedFilters.endYear) {
      filtered = filtered.filter(
        (item) => item.end_year === updatedFilters.endYear.toString()
      );
    }

    if (updatedFilters.topic) {
      filtered = filtered.filter((item) => item.topic === updatedFilters.topic);
    }

    if (updatedFilters.sector) {
      filtered = filtered.filter(
        (item) => item.sector === updatedFilters.sector
      );
    }

    if (updatedFilters.region) {
      filtered = filtered.filter(
        (item) => item.region === updatedFilters.region
      );
    }
    if (updatedFilters.pestle) {
      filtered = filtered.filter(
        (item) => item.pestle === updatedFilters.pestle
      );
    }
    if (updatedFilters.source) {
      filtered = filtered.filter(
        (item) => item.source === updatedFilters.source
      );
    }

    // Add more filter conditions here as needed

    setFilterContextData(filtered);
    console.log(filtered);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "5px solid gray",
          backgroundColor: "#022B3A",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div className=" h-14 flex ml-3 items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className=" h-14 flex  items-center">
        <h1 className="text-md font-bold ml-3">Dashboard filters</h1>
      </div>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" End Year"} style={{ width: "100%" }} />
            <Select
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
              value={filters.endYear}
              name="endYear"
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {[
                2016, 2017, 2018, 2019, 2020, 2021, 2022, 2024, 2025, 2027,
                2028, 2030, 2034, 2035, 2036, 2040, 2041, 2046, 2050, 2051,
                2055, 2060, 2126, 2200,
              ].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" Topic"} style={{ width: "100%" }} />
            <Select
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
              value={filters.topic}
              name="topic"
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" Sectors"} style={{ width: "100%" }} />
            <Select
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
              value={filters.sector}
              name="sector"
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {sectors.map((sector) => (
                <MenuItem key={sector} value={sector}>
                  {sector}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" Regions"} style={{ width: "100%" }} />
            <Select
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
              value={filters.region}
              name="region"
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" Pestles"} style={{ width: "100%" }} />
            <Select
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
              value={filters.pestle}
              name="pestle"
              onChange={handleFilterChange}
              displayEmpty
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {pestles.map((pestle) => (
                <MenuItem key={pestle} value={pestle}>
                  {pestle}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText primary={" Sources"} style={{ width: "100%" }} />
            <Select
              value={filters.source}
              name="source"
              onChange={handleFilterChange}
              displayEmpty
              style={{
                width: "100%",
                height: "40px",
                color: "white",
                border: "1px solid gray",
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {sources.map((source) => (
                <MenuItem key={source} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
