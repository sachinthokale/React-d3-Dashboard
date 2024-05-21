import { useContext, useEffect, useRef, useState } from "react";
import { geoMercator, geoPath, select, json, min, max, scaleLinear } from "d3";
import { MyContext } from "./Context";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};

// eslint-disable-next-line react/prop-types
const GeoChart = ({ data, selectedOption }) => {
  const { filterContextData } = useContext(MyContext);
  const svgRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const svgWidth = 400;
  const svgHeight = 400;
  const [worldData, setWorldData] = useState();

  useEffect(() => {
    // Load world map data
    json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    ).then((worldData) => {
      // Add intensity information to each feature in worldData
      worldData.features.forEach((feature) => {
        const { name } = feature.properties;
        // eslint-disable-next-line react/prop-types
        const customData = filterContextData.find(
          (item) => item.country === name
        );

        if (customData) {
          feature.properties.intensity = customData.intensity;
          feature.properties.likelihood = customData.likelihood;
          feature.properties.relevance = customData.relevance;
        } else {
          // If no custom data, set default values
          feature.properties.intensity = 0;
          feature.properties.likelihood = 0;
          feature.properties.relevance = 0;
        }
      });
      setWorldData(worldData);
    });
  }, [filterContextData]);

  useEffect(() => {
    if (!worldData) return;

    const svg = select(svgRef.current).style("background-color", "#022B3A");

    const minValue = min(
      worldData.features,
      (feature) => feature.properties[selectedOption]
    );

    const maxValue = max(
      worldData.features,
      (feature) => feature.properties[selectedOption]
    );
    const colorRanges = {
      intensity: ["white", "#ff0054"],
      likelihood: ["white", "#fca311"],
      relevance: ["white", "#00f5d4"],
    };

    const colorScale = scaleLinear()
      .domain([minValue, maxValue])
      .range(colorRanges[selectedOption]);

    const projection = geoMercator().fitSize(
      [dimensions.width, dimensions.height],
      worldData
    );
    const pathGenerator = geoPath().projection(projection);

    // Draw the base world map
    svg
      .selectAll(".country")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", pathGenerator)
      .attr("fill", (d) => colorScale(d.properties[selectedOption]))
      .attr("stroke", "#022B3A");
  }, [worldData, selectedOption, dimensions]);

  return (
    <>
      <div
        ref={wrapperRef}
        className=" w-full h-full flex justify-center items-center bg-[#022B3A] "
      >
        <svg className="w-full h-full" ref={svgRef}></svg>
      </div>
    </>
  );
};

export default GeoChart;
