import React, { useState } from 'react';

export const CoordinatePlaneWidget: React.FC = () => {
  const [point, setPoint] = useState<{ x: number; y: number }>({ x: -3, y: 4 });

  // Grid ranges from -8 to +8
  const gridSize = 8;
  const viewBoxSize = 320;
  const origin = viewBoxSize / 2;
  const step = origin / gridSize;

  const toSvgX = (x: number) => origin + x * step;
  const toSvgY = (y: number) => origin - y * step;

  const getQuadrant = (x: number, y: number) => {
    if (x === 0 && y === 0) return 'Origin (0, 0)';
    if (x === 0) return 'On the vertical Y-Axis';
    if (y === 0) return 'On the horizontal X-Axis';
    if (x > 0 && y > 0) return 'Quadrant I (+, +)';
    if (x < 0 && y > 0) return 'Quadrant II (-, +)';
    if (x < 0 && y < 0) return 'Quadrant III (-, -)';
    return 'Quadrant IV (+, -)';
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const rawX = (clickX - origin) / step;
    const rawY = (origin - clickY) / step;

    const clampedX = Math.max(-gridSize, Math.min(gridSize, Math.round(rawX)));
    const clampedY = Math.max(-gridSize, Math.min(gridSize, Math.round(rawY)));

    setPoint({ x: clampedX, y: clampedY });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
            Interactive Cartesian Stage
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Click anywhere on the grid or use the sliders to plot rational coordinates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPoint({ x: -3, y: 4 })}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            (-3, 4)
          </button>
          <button
            onClick={() => setPoint({ x: 5, y: -2 })}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            (5, -2)
          </button>
          <button
            onClick={() => setPoint({ x: -4, y: -5 })}
            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            (-4, -5)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-7 flex justify-center">
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="w-full max-w-[320px] aspect-square bg-[#0b1329] border border-cyan-900/40 rounded-lg cursor-crosshair select-none shadow-inner"
            onClick={handleSvgClick}
          >
            {/* Grid Lines */}
            {Array.from({ length: gridSize * 2 + 1 }, (_, i) => i - gridSize).map((val) => (
              <g key={`grid-${val}`}>
                <line
                  x1={toSvgX(val)}
                  y1={0}
                  x2={toSvgX(val)}
                  y2={viewBoxSize}
                  stroke={val === 0 ? '#38bdf8' : '#1e293b'}
                  strokeWidth={val === 0 ? 1.5 : 0.8}
                />
                <line
                  x1={0}
                  y1={toSvgY(val)}
                  x2={viewBoxSize}
                  y2={toSvgY(val)}
                  stroke={val === 0 ? '#38bdf8' : '#1e293b'}
                  strokeWidth={val === 0 ? 1.5 : 0.8}
                />
              </g>
            ))}

            {/* Quadrant Labels */}
            <text x={viewBoxSize - 35} y={30} fill="#64748b" fontSize="10" fontWeight="bold">QI</text>
            <text x={20} y={30} fill="#64748b" fontSize="10" fontWeight="bold">QII</text>
            <text x={20} y={viewBoxSize - 20} fill="#64748b" fontSize="10" fontWeight="bold">QIII</text>
            <text x={viewBoxSize - 35} y={viewBoxSize - 20} fill="#64748b" fontSize="10" fontWeight="bold">QIV</text>

            {/* Point Marker */}
            <circle
              cx={toSvgX(point.x)}
              cy={toSvgY(point.y)}
              r="7"
              fill="#00F2FE"
              className="transition-all duration-150 drop-shadow-[0_0_8px_#00F2FE]"
            />
            <circle
              cx={toSvgX(point.x)}
              cy={toSvgY(point.y)}
              r="12"
              fill="none"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray="2,2"
              className="animate-spin"
            />
          </svg>
        </div>

        {/* Data & Slider Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
            <span className="text-xs text-slate-400 block">Current Ordered Pair</span>
            <div className="text-xl font-mono font-bold text-cyan-300 mt-0.5">
              P({point.x}, {point.y})
            </div>
            <div className="text-xs text-slate-300 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Location: <strong>{getQuadrant(point.x, point.y)}</strong></span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>X-Coordinate (Horizontal):</span>
                <span className="font-mono text-cyan-400 font-semibold">{point.x}</span>
              </div>
              <input
                type="range"
                min={-gridSize}
                max={gridSize}
                value={point.x}
                onChange={(e) => setPoint({ ...point, x: parseInt(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Y-Coordinate (Vertical):</span>
                <span className="font-mono text-cyan-400 font-semibold">{point.y}</span>
              </div>
              <input
                type="range"
                min={-gridSize}
                max={gridSize}
                value={point.y}
                onChange={(e) => setPoint({ ...point, y: parseInt(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded border border-slate-800">
            <strong>Key Insight:</strong> The point is rational because both {point.x} and {point.y} can be expressed as fractions over 1 ({point.x}/1, {point.y}/1).
          </div>
        </div>
      </div>
    </div>
  );
};
