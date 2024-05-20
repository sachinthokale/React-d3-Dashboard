import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

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
const PieChart = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [datas, setDatas] = useState([]);
  const [pieColor, setPieColor] = useState("#ff0054");

  const filterData = (startYear) => {
    // eslint-disable-next-line react/prop-types
    const filteredData = data.filter((item) => {
      const year = parseInt(item.start_year);
      if (startYear === "<2020" && year < 2020) {
        setPieColor("#ff0054");
        return true;
      } else if (startYear === "2020-2025" && year >= 2020 && year <= 2025) {
        setPieColor("#fca311");
        return true;
      } else if (startYear === ">2025" && year > 2025) {
        setPieColor("#00f5d4");
        return true;
      }
      return false;
    });
    const counts = countTopics(filteredData);
    setDatas(counts);
  };

  const countTopics = (data) => {
    const topicCounts = {};
    // eslint-disable-next-line react/prop-types
    data.forEach((item) => {
      const topic = item.pestle;
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });

    // Convert the object into an array of objects
    const countsArray = Object.keys(topicCounts).map((topic) => ({
      label: topic,
      value: topicCounts[topic],
    }));

    return countsArray;
  };

  useEffect(() => {
    // Initial data load
    filterData("<2020");
  }, [data]);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .style("background-color", "#022B3A")
      .style("overflow", "visible");
    if (!dimensions) return;

    const radius = Math.min(dimensions.width, dimensions.height) / 2;
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const values = datas.map((d) => d.value);
    const minValue = d3.min(values);
    const maxValue = d3.max(values);

    const colorScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range(["#ccc", pieColor]);

    const arcs = pie(datas);

    svg
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.value))
      .attr("stroke", "#022B3A")
      .attr("stroke-width", 5)
      .attr("transform", `translate(${radius}, ${radius})`)
      .on("mouseover", (event, d) => {
        // Show text when hovering over the arc
        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("text-anchor", "middle")
          .style("color", "white")
          .attr(
            "transform",
            `translate(${arc.centroid(d)}) translate(${radius}, ${radius}) `
          )
          .text(d.data.label);
      })
      .on("mouseout", () => {
        // Remove the text when mouse moves away from the arc
        svg.selectAll(".tooltip").remove();
      });
  }, [datas, pieColor, dimensions]);

  return (
    <>
      <div
        ref={wrapperRef}
        className=" border-l border-gray-600 pl-1 w-full h-full  flex  justify-center  bg-[#022B3A] "
      >
        <svg className="w-full h-full" ref={svgRef}></svg>
      </div>
      <div>
        <button
          className={`px-1 text-white text-sm m-2 rounded ${
            pieColor == "#ff0054" ? "bg-[#ff0054]" : null
          } font-bold `}
          onClick={() => filterData("<2020")}
        >
          &lt;2020
        </button>
        <button
          className={` px-1 text-white text-sm m-2 rounded ${
            pieColor == "#fca311" ? "bg-[#fca311]" : null
          } font-bold`}
          onClick={() => filterData("2020-2025")}
        >
          2020-2025
        </button>
        <button
          className={` px-1 text-white text-sm m-2 rounded ${
            pieColor == "#00f5d4" ? "bg-[#00f5d4]" : null
          } font-bold`}
          onClick={() => filterData(">2025")}
        >
          &gt;2025
        </button>
      </div>
    </>
  );
};

export default PieChart;
