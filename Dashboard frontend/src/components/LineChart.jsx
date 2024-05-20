import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Clear existing SVG elements
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseDate = d3.timeParse("%Y");

    // Filter and parse data
    const filteredData = data
      .filter((d) => d.start_year && d.relevance !== null)
      .map((d) => ({
        ...d,
        start_year: parseDate(d.start_year.toString()),
      }))
      .filter((d) => !isNaN(d.start_year)); // Filter out invalid dates

    if (filteredData.length === 0) return; // If no valid data, exit

    // Sort data by start_year
    filteredData.sort((a, b) => a.start_year - b.start_year);

    // Set up X axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.start_year))
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Set up Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.relevance)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Line generator function
    const line = d3
      .line()
      .x((d) => x(d.start_year))
      .y((d) => y(d.relevance))
      .defined((d) => d.relevance !== null) // Handle gaps
      .curve(d3.curveMonotoneX);

    // Add the line to the chart
    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#4daf4a")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
