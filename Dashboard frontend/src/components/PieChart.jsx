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
const PieChart = () => {
  const { filterContextData } = useContext(MyContext);
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [datas, setDatas] = useState([]);
  const [pieColor] = useState("#ff0054");

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
        const [x, y] = arc.centroid(d);

        // Append rectangle for the text background
        const rect = svg
          .append("rect")
          .attr("class", "tooltip-rect")
          .attr("x", 210)
          .attr("y", 40)
          .attr("width", 140)
          .attr("height", 100)
          .attr("fill", "none");

        // Append text
        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", 240)
          .attr("y", 60)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")

          .text(`Pestle`)
          .attr("fill", "white");

        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", 270)
          .attr("y", 86)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text(d.data.label)
          .attr("fill", "#fca311")
          .style("font-size", "25px");

        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", 260)
          .attr("y", 106)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")

          .text(`Occurances`)
          .attr("fill", "white");

        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", 240)
          .attr("y", 130)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text(d.data.value)
          .attr("fill", "#00f5d4")
          .style("font-size", "30px");
      })
      .on("mouseout", () => {
        // Remove the text and rect when mouse moves away from the arc
        svg.selectAll(".tooltip").remove();
        svg.selectAll(".tooltip-rect").remove();
      });
  }, [pieColor, dimensions, datas, filterContextData]);

  return (
    <div
      ref={wrapperRef}
      className="pl-1 w-full h-full flex justify-center bg-[#022B3A]"
    >
      <svg className="w-full h-full" ref={svgRef}></svg>
    </div>
  );
};

export default PieChart;
