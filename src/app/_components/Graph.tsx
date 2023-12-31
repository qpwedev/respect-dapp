// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { trpc } from "../_trpc/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const GraphWrapper = ({
  address,
  isMock = false,
  graphData,
}: {
  address?: string;
  isMock?: boolean;
  graphData?: any;
}) => {
  let data = {
    data: {
      nodes: [],
      links: [],
    },
  };

  if (isMock) {
    data = {
      data: {
        nodes: [
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a18",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 0 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a19",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 1 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a20",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 1 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a21",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 2 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a22",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 2 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a23",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 2 },
          },
          {
            id: "0x42d6622dece394b54999fbd73d108123806f6a24",
            group: 1,
            status: 1,
            data: { incoming: 0, outgoing: 0, depth: 2 },
          },
        ],
        links: [
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a18",
            target: "0x42d6622dece394b54999fbd73d108123806f6a19",
            value: 1,
            type: "arrow",
          },
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a18",
            target: "0x42d6622dece394b54999fbd73d108123806f6a20",
            value: 1,
            type: "arrow",
          },
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a19",
            target: "0x42d6622dece394b54999fbd73d108123806f6a21",
            value: 1,
            type: "arrow",
          },
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a19",
            target: "0x42d6622dece394b54999fbd73d108123806f6a22",
            value: 1,
            type: "arrow",
          },
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a20",
            target: "0x42d6622dece394b54999fbd73d108123806f6a23",
            value: 1,
            type: "arrow",
          },
          {
            source: "0x42d6622dece394b54999fbd73d108123806f6a20",
            target: "0x42d6622dece394b54999fbd73d108123806f6a24",
            value: 1,
            type: "arrow",
          },
        ],
      },
    };
  } else if (address) {
    data = trpc.getAttestations.useQuery(address, {
      initialData: graphData,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });
  }

  if (data.data === null || data.data === undefined) {
    return Promise.resolve(null);
  }
  if (data.data.nodes?.length === 0) {
    return <GraphPlaceholder />;
  }

  const customColors = ["#FDF5FF"];
  return <Graph data={data.data} customColors={customColors} />;
};

const GraphPlaceholder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-4xl">
      <p>Found no respects</p>
      <br />
      <p>Try searching for another address</p>
    </div>
  );
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
  const containerRef = useRef(null);

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
          .distance(200),
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
        (d) => `url(${new URL(`#arrow-${d.type}`, location)})`,
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
          .on("end", dragended),
      )
      .on("click", (e, d) => {
        clicked(e, [d.x, d.y]);
        setPickedNode(d);
        const modal = d3.select("#myModal");
        const modalElement = document.getElementById("myModal");
        modal.style("display", "flex");

        window.onclick = function (event) {
          if (
            !modalElement?.contains(event.target) &&
            event.target !== modalElement &&
            modalElement !== null
          ) {
            modalElement.style.display = "none";
          }
        };

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            if (
              modalElement?.style.display !== "none" &&
              modalElement !== null
            ) {
              modalElement.style.display = "none";
            }
          }
        });

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
          d3.pointer(event),
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
      ref={containerRef}
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
  const windowDimensions = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);
  const [modalSize, setModalSize] = useState<[number, number]>([0, 0]);
  const modalWidth =
    windowDimensions.width < 640 ? windowDimensions.width : 450;
  const modalHeight =
    windowDimensions.height < 250 ? windowDimensions.height : 250;

  const modalTop =
    windowDimensions.width < 640
      ? windowDimensions.height - modalHeight
      : (modalSize[1] - modalHeight) / 3.5;

  const modalLeft =
    windowDimensions.width < 640
      ? (windowDimensions.width - modalWidth) / 2
      : (modalSize[0] - modalWidth) / 2;

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
    <motion.div
      ref={ref}
      id="myModal"
      className={`absolute hidden flex-col gap-4 rounded-tl-3xl rounded-tr-3xl border-t border-t-[#B388EB] bg-[#121212F0] p-5 text-[#fff] backdrop-blur-sm md:rounded-3xl md:border-[1px] md:border-[#B388EB] md:bg-[#FFF] md:text-[#000]`}
      style={{
        width: `${modalWidth}px`,
        height: `${modalHeight}px`,
        left: `${modalLeft}px`,
        top: `${modalTop}px`,
      }}
    >
      <ENSAndAddress
        screenWidth={windowDimensions.width}
        ens={node?.data.ens}
        address={node?.id}
      />

      <div className="h-[1px] w-full bg-[#B388EB]"></div>

      <div className="flex flex-col gap-3">
        <TextRow emoji="☘️" text="on-chain since:" value="immemorial" />
        <TextRow
          emoji="🫶"
          text="respects received:"
          value={node?.data.incoming}
        />
        <TextRow
          emoji="👁"
          text="respects given:"
          value={node?.data.outgoing}
        />
      </div>
    </motion.div>
  );
};

const ENSAndAddress = ({
  ens,
  address,
  screenWidth,
}: {
  ens: string;
  address: string;
  screenWidth: number;
}) => {
  const router = useRouter();

  const handleAddressClick = (e: any) => {
    router.push(`/profile/${address}`);
  };

  const handleENSCopy = () => {
    navigator.clipboard.writeText(ens);
  };

  // TODO: better...
  function textWidth(text: string, screenWidth: number) {
    if (screenWidth < 768) {
      return 8;
    } else {
      return 10;
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {!ens ? (
        <div
          className="w-full cursor-pointer text-4xl font-bold text-[#fff] md:text-[#000]"
          onClick={handleAddressClick}
        >
          {trimText(address, textWidth(address, screenWidth))}
        </div>
      ) : (
        <>
          <div className="w-full text-4xl font-bold" onClick={handleENSCopy}>
            {ens}
          </div>
          <div
            className="text-l w-full cursor-pointer font-normal text-[#818181]"
            onClick={handleAddressClick}
          >
            {address}
          </div>
        </>
      )}
    </div>
  );
};

const trimText = (text: string, trimTo: number) => {
  if (text?.length > trimTo) {
    return text.slice(0, trimTo) + "..." + text.slice(-trimTo);
  }
};

const TextRow = ({
  emoji,
  text,
  value,
}: {
  emoji: string;
  text: string;
  value: string;
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="text-2xl">{emoji}</div>
      <div className="text-xl">{text}</div>
      <div className="text-xl">{value}</div>
    </div>
  );
};

export { GraphWrapper, Graph };
