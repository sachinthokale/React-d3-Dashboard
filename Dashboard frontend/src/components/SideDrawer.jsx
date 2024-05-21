import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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
      const response = await axios.get("http://localhost:5000/api/getdata");
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
          border: "1px solid black",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={"Filter by End Year"} />
            <Select
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
          <ListItemButton>
            <ListItemText primary={"Filter by Topic"} />
            <Select
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
          <ListItemButton>
            <ListItemText primary={"Filter by Sectors"} />
            <Select
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
          <ListItemButton>
            <ListItemText primary={"Filter by Regions"} />
            <Select
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
          <ListItemButton>
            <ListItemText primary={"Filter by Pestles"} />
            <Select
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
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
