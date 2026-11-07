import React, { useState } from 'react';

export const MachineLeverWidget: React.FC = () => {
  // Lever physics:
  // Effort Arm (d1) in meters, Load Arm (d2) in meters
  // Load = 400 N
  const [effortArm, setEffortArm] = useState<number>(3); // 1 to 5 meters
  const [loadArm, setLoadArm] = useState<number>(1); // 0.5 to 3 meters
  const loadWeight = 300; // Newtons

  // Torque equilibrium: Effort × d1 = Load × d2 -> Effort = (Load × d2) / d1
  const effortRequired = Math.round((loadWeight * loadArm) / effortArm);
  const mechanicalAdvantage = Number((effortArm / loadArm).toFixed(2));
  const workDone1MeterLift = loadWeight * 1; // Joules

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
            Simple Machine: Lever & Mechanical Advantage
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust the effort and load distances from the fulcrum to see how force is multiplied.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Lever SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-[#0a0f24] rounded-lg border border-cyan-900/30">
          <svg viewBox="0 0 340 160" className="w-full max-w-[340px] select-none">
            {/* Ground Line */}
            <line x1="20" y1="130" x2="320" y2="130" stroke="#334155" strokeWidth="2" />

            {/* Fulcrum (Central Pivot Triangle) */}
            <polygon points="170,90 150,130 190,130" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="170" cy="90" r="4" fill="#ffffff" />
            <text x="170" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">Fulcrum</text>

            {/* Lever Bar */}
            <line x1="40" y1="90" x2="300" y2="90" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />

            {/* Effort on Left */}
            <line x1="60" y1="50" x2="60" y2="85" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="60" y="42" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
              Effort: {effortRequired} N
            </text>

            {/* Load on Right */}
            <rect x="250" y="65" width="30" height="25" rx="3" fill="#e11d48" stroke="#f43f5e" strokeWidth="1" />
            <text x="265" y="81" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              {loadWeight} N
            </text>
            <text x="265" y="105" textAnchor="middle" fill="#fb7185" fontSize="10">Load</text>

            {/* Distance Dimension Arrows */}
            <text x="110" y="105" textAnchor="middle" fill="#38bdf8" fontSize="9">
              Effort Arm: {effortArm}m
            </text>
            <text x="220" y="105" textAnchor="middle" fill="#fb7185" fontSize="9">
              Load Arm: {loadArm}m
            </text>
          </svg>

          <div className="text-xs font-mono text-cyan-300 mt-3 flex items-center gap-2">
            <span>Mechanical Advantage:</span>
            <strong className="text-sm text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
              {mechanicalAdvantage}x
            </strong>
          </div>
        </div>

        {/* Sliders & Calculation Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Effort Arm Distance (d₁):</span>
                <span className="font-mono text-cyan-400 font-semibold">{effortArm} meters</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                value={effortArm}
                onChange={(e) => setEffortArm(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Load Arm Distance (d₂):</span>
                <span className="font-mono text-rose-400 font-semibold">{loadArm} meters</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={loadArm}
                onChange={(e) => setLoadArm(parseFloat(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Load to Lift:</span>
              <span className="font-mono text-slate-200">{loadWeight} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Effort Required:</span>
              <span className="font-mono text-cyan-300 font-bold">{effortRequired} N</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">Work Conserved:</span>
              <span className="font-mono text-emerald-400">{workDone1MeterLift} Joules</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            <strong>Physics Rule:</strong> As the effort arm increases relative to the load arm, the effort force required decreases proportionally.
          </div>
        </div>
      </div>
    </div>
  );
};
