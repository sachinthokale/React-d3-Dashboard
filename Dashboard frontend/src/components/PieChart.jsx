import { useContext, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
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
const PieChart = ({ data }) => {
  const { filterContextData } = useContext(MyContext);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [datas, setDatas] = useState([]);
  const [pieColor, setPieColor] = useState("#ff0054");

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
    const counts = countTopics(filterContextData);
    setDatas(counts);
  }, [filterContextData]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("background-color", "#022B3A").style("overflow", "visible");
    if (!dimensions) return;
    console.log("inside pie", filterContextData);

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
  }, [pieColor, dimensions, datas, filterContextData]);

  return (
    <>
      <div
        ref={wrapperRef}
        className=" pl-1 w-full h-full  flex  justify-center  bg-[#022B3A] "
      >
        <svg className="w-full h-full" ref={svgRef}></svg>
      </div>
    </>
  );
};

export default PieChart;
