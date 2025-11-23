import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";

type PlotType = (SVGSVGElement | HTMLElement) & Plot.Plot;

type BarCompareProps = {
  leftLabel?: string;
  rightLabel?: string;
  leftValue: number;
  rightValue: number;
  title?: string;
  width?: number;
  height?: number;
  colors?: [string, string];
  unit?: string;
  domain: number;
};

const BarCompare = ({
  leftLabel = "Initial",
  rightLabel = "Current",
  leftValue,
  rightValue,
  title,
  width = 400,
  height = 240,
  colors = ["#1976d2", "#f57c00"],
  unit = "",
  domain,
}: BarCompareProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const plotRef = useRef<PlotType>(null);

  useEffect(() => {
    if (!ref.current) return;

    // remove previous plot if exists
    if (plotRef.current) {
      plotRef.current.remove();
      plotRef.current = null;
    }

    const data = [
      { label: leftLabel, value: leftValue },
      { label: rightLabel, value: rightValue },
    ];

    const plot = Plot.plot({
      width,
      height,
      marginLeft: 60,
      marginBottom: 50,
      title,
      y: {
        label: unit ?? "",
        domain: [0, domain],
        grid: true,
      },
      x: {
        ticks: data.map((d) => d.label),
        label: "",
      },
      marks: [
        Plot.barY(data, {
          x: "label",
          y: "value",
          fill: (d) => (d.label === leftLabel ? colors[0] : colors[1]),
        }),
        Plot.text(data, {
          x: "label",
          y: "value",
          text: (d) => String(d.value),
          dy: -6,
          fill: "black",
          textAnchor: "middle",
          tip: true,
        }),
      ],
    });

    ref.current.appendChild(plot);
    plotRef.current = plot;

    return () => {
      if (plotRef.current) {
        plotRef.current.remove();
        plotRef.current = null;
      }
    };
  }, [
    leftLabel,
    rightLabel,
    leftValue,
    rightValue,
    title,
    width,
    height,
    colors,
    unit,
    domain,
  ]);

  return <div ref={ref} />;
};

export default BarCompare;
