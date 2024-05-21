import { useContext, useEffect, useRef, useState } from "react";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand, max } from "d3";
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
const Histogram_Intensity_Sector = ({ data }) => {
  const { filterContextData } = useContext(MyContext);
  const svgRef = useRef(null);
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const margin = { top: 20, right: 30, bottom: 20, left: 110 };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    svg.style("background-color", "#022B3A").style("overflow", "visible");
    if (!dimensions) return;

    // Define the xScale and yScale
    const xScale = scaleLinear()
      .domain([0, max(filterContextData, (d) => d.intensity)])
      .nice()
      .range([margin.left, dimensions.width - margin.right]);

    const yScale = scaleBand()
      // eslint-disable-next-line react/prop-types
      .domain(filterContextData.map((d) => d.sector))
      .range([margin.top, dimensions.height - margin.bottom])
      .padding(0.4);

    // Define the axes
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    // Append x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${dimensions.height - margin.bottom})`)
      .style("color", "white")
      .call(xAxis);

    // Append y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .style("color", "white")
      .call(yAxis);

    // Append bars with color based on intensity
    svg
      .selectAll(".bar")
      .data(filterContextData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", xScale(0))
      .attr("y", (d) => yScale(d.sector))
      .attr("width", (d) => xScale(d.intensity) - xScale(0))
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("fill", (d) => {
        if (d.intensity < 20) {
          return "#fca311";
        } else if (d.intensity > 20 && d.intensity < 60) {
          return "#00f5d4";
        } else {
          return "#ff0054";
        }
      });
  }, [data, dimensions, filterContextData]);

  return (
    <div ref={wrapperRef} className="flex w-full h-full">
      <svg className="w-full h-full" ref={svgRef}></svg>
    </div>
  );
};

export default Histogram_Intensity_Sector;
