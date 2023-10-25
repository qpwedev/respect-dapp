"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { trpc } from "../_trpc/client";

const GraphWrapper = ({ initialGraphData }: { initialGraphData: any }) => {
  const data = trpc.getAttestations.useQuery(undefined, {
    initialData: initialGraphData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const customColors = ["#FDF5FF"];
  return <Graph data={data.data} customColors={customColors} />;
};

const Graph = ({
  data,
  customColors,
}: {
  data: any;
  customColors: Array<string>;
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const [pickedNode, setPickedNode] = useState<any>(null);

  useEffect(() => {
    drawGraph(data, customColors);
    return () => {
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [data, customColors]);

  function drawGraph(data, customColors: Array<string>) {
    const svg = d3.select(ref.current);
    const width = ref.current?.parentElement!.clientWidth || 0;
    const height = ref.current?.parentElement!.clientHeight || 0;

    const color = customColors
      ? d3.scaleOrdinal(customColors)
      : d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map((d) => Object.assign({}, d));
    const nodes = data.nodes.map((d) => Object.assign({}, d));
    const types = Array.from(new Set(links.map((d) => d.type)));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);

    svg.html("");

    let zoom = d3.zoom().on("zoom", handleZoom);

    function handleZoom(event) {
      d3.select(ref.current).selectAll("g").attr("transform", event.transform);
    }

    d3.select(ref.current).call(zoom);

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "6,16")
      .attr("stroke-linecap", "round")
      .attr("stroke", "#B388EB")
      .attr("stroke-opacity", 0.6)
      .attr(
        "marker-end",
        (d) => `url(${new URL(`#arrow-${d.type}`, location)})`
      );

    const defs = svg.append("defs");

    const filter = defs
      .append("filter")
      .attr("id", "inset-shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("filter", "drop-shadow(0px 8px 8px rgba(179, 136, 235, 0.25))")
      .attr("slope", "0.6");

    const feOffset = filter
      .append("feOffset")
      .attr("dx", "16")
      .attr("dy", "16");

    const feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "offset-blur");

    filter
      .append("feComposite")
      .attr("operator", "out")
      .attr("in", "SourceGraphic")
      .attr("in2", "offset-blur")
      .attr("result", "inverse");

    filter
      .append("feFlood")
      .attr("flood-color", "rgba(179, 136, 235, 0.4)")
      .attr("flood-opacity", "1")
      .attr("result", "color");

    filter
      .append("feComposite")
      .attr("operator", "in")
      .attr("in", "color")
      .attr("in2", "inverse")
      .attr("result", "shadow");

    filter
      .append("feComposite")
      .attr("operator", "over")
      .attr("in", "shadow")
      .attr("in2", "SourceGraphic");

    svg
      .append("defs")
      .selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 0)
      .attr("refY", 0)
      .attr("markerWidth", 3)
      .attr("markerHeight", 3)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#B388EB")
      .attr("d", "M0,-5L10,0L0,5");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => {
        switch (d.data.depth) {
          case 0:
            return 60;
          case 1:
            return 50;
          default:
            return 40;
        }
      })
      .attr("fill", (d) => color(d.group))
      .attr("filter", "url(#inset-shadow)")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (e, d) => {
        clicked(e, [d.x, d.y]);
        setPickedNode(d);
        const modal = d3.select("#myModal");
        modal.style("display", "block");

        window.onclick = function (event) {
          if (event.target !== document.getElementById("myModal")) {
            modal.style("display", "none");
          }
        };

        d3.select(".close").on("click", () => {
          modal.style("display", "none");
        });
      });

    node.append("title").text((d) => d.id);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function clicked(event, [x, y]) {
      event.stopPropagation();
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(1.2)
            .translate(-x, -y),
          d3.pointer(event)
        );
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "500px",
        borderRadius: "26px",
        position: "relative",
      }}
    >
      <NodeModal node={pickedNode} />

      <svg
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "500px",
          borderRadius: "26px",
        }}
      />
    </div>
  );
};

const NodeModal = ({ node }: { node: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [modalSize, setModalSize] = useState<[number, number]>([0, 0]);
  const modalTop = (modalSize[1] - 250) / 2;
  const modalLeft = (modalSize[0] - 450) / 2;

  useEffect(() => {
    const width = ref.current?.parentElement!.clientWidth || 0;
    const height = ref.current?.parentElement!.clientHeight || 0;
    setModalSize([width, height]);

    window.addEventListener("resize", () => {
      const width = ref.current?.parentElement!.clientWidth || 0;
      const height = ref.current?.parentElement!.clientHeight || 0;
      setModalSize([width, height]);
    });
  }, []);

  return (
    <div
      ref={ref}
      id="myModal"
      className={`hidden absolute rounded-3xl min-w-[450px] min-h-[250px] bg-[#FFF] border-[1px] border-[#B388EB] p-5`}
      style={{
        left: `${modalLeft}px`,
        top: `${modalTop}px`,
      }}
    >
      <div className="text-[#000] font-bold text-4xl w-full">alicia.linea</div>
      <div className="text-[#818181] font-normal text-l w-full">
        0xBB60ADaFB4...CE60799950a39f3dfb3AD2DC
      </div>
      <div className="bg-[#B388EB] w-full h-[1px]"></div>
      <div>☘️ on-chain since:</div>
      <div>🫶 respects received:</div>
      <div>👁 respects given:</div>
    </div>
  );
};

export { GraphWrapper, Graph };
