"use client";

import { useEffect, useId, useMemo, useState } from "react";

const COLORS = {
  accent: "var(--color-accent)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  info: "var(--color-info)",
  emergency: "var(--color-emergency)",
};

export function TrendChart({
  data,
  unit,
  refMin,
  refMax,
  color = "accent",
  height = 180,
}) {
  const uid = useId().replace(/[:]/g, "");
  const [size, setSize] = useState(0);
  const colored = COLORS[color] || COLORS.accent;

  useEffect(() => {
    const el = document.getElementById(`trend-${uid}`);
    if (!el) return;
    const update = () => setSize(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [uid]);

  const { plotted, min, max } = useMemo(() => {
    const values = data.map((d) => d.value);
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const floor = Math.min(lo, refMin ?? lo);
    const ceil = Math.max(hi, refMax ?? hi);
    const pad = Math.max(1, (ceil - floor) * 0.12 || 1);
    const yMin = Math.floor(floor - pad);
    const yMax = Math.ceil(ceil + pad);
    const n = data.length;
    const step = size > 0 ? size / Math.max(1, n) : 0;
    return {
      plotted: data.map((d, i) => ({
        ...d,
        x: step * i + step / 2,
        y:
          yMax === yMin
            ? height / 2
            : height - ((d.value - yMin) / (yMax - yMin)) * height,
      })),
      min: yMin,
      max: yMax,
    };
  }, [data, refMin, refMax, size, height]);

  const linePath = plotted
    .map((d, i) => `${i === 0 ? "M" : "L"}${d.x.toFixed(1)},${d.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${(plotted.at(-1)?.x ?? 0).toFixed(1)},${height} L${(
    plotted[0]?.x ?? 0
  ).toFixed(1)},${height} Z`;

  const refTop = refMax
    ? height - ((refMax - min) / (max - min)) * height
    : 0;
  const refBottom = refMin
    ? height - ((refMin - min) / (max - min)) * height
    : height;

  return (
    <div
      id={`trend-${uid}`}
      className="w-full overflow-hidden"
      role="img"
      aria-label="Trend chart"
    >
      {size > 0 && (
        <svg
          width={size}
          height={height}
          viewBox={`0 0 ${size} ${height}`}
          className="block select-none"
          preserveAspectRatio="none"
        >
          {/* Reference range band */}
          {typeof refMin === "number" && typeof refMax === "number" && (
            <g>
              <rect
                x={0}
                y={refBottom > refTop ? refTop : refBottom}
                width={size}
                height={Math.abs(refBottom - refTop)}
                fill={colored}
                opacity={0.08}
              />
              <line
                x1={0}
                x2={size}
                y1={refTop}
                y2={refTop}
                stroke={colored}
                strokeWidth={0.75}
                strokeDasharray="3 3"
                opacity={0.5}
              />
              <line
                x1={0}
                x2={size}
                y1={refBottom}
                y2={refBottom}
                stroke={colored}
                strokeWidth={0.75}
                strokeDasharray="3 3"
                opacity={0.5}
              />
            </g>
          )}

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0}
              x2={size}
              y1={height * f}
              y2={height * f}
              stroke="var(--color-line)"
              strokeWidth={0.6}
            />
          ))}

          {/* Area + line */}
          <path d={areaPath} fill={colored} opacity={0.1} />
          <path
            d={linePath}
            fill="none"
            stroke={colored}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data points */}
          {plotted.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={3}
              fill={colored}
              stroke="var(--color-surface)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Edge labels */}
          <text
            x={size - 4}
            y={10}
            textAnchor="end"
            fontSize={10}
            fill="var(--color-mute)"
          >
            {max} {unit}
          </text>
          <text
            x={size - 4}
            y={height - 5}
            textAnchor="end"
            fontSize={10}
            fill="var(--color-mute)"
          >
            {min} {unit}
          </text>
        </svg>
      )}

      {/* Axis labels */}
      {plotted.length > 0 && (
        <div className="mt-1 flex justify-between text-[10px] text-mute">
          <span>{plotted[0].label}</span>
          <span className="font-semibold" style={{ color: colored }}>
            Latest: {plotted.at(-1).value} {unit}
          </span>
          <span>{plotted.at(-1).label}</span>
        </div>
      )}
    </div>
  );
}