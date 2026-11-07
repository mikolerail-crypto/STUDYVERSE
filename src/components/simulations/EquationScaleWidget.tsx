import React, { useState } from 'react';

export const EquationScaleWidget: React.FC = () => {
  // Equation: 3x + 4 = 19
  // Step 0: 3x + 4 = 19
  // Step 1: Subtract 4 from both sides -> 3x = 15
  // Step 2: Divide both sides by 3 -> x = 5
  const [currentStep, setCurrentStep] = useState<number>(0);

  const reset = () => setCurrentStep(0);
  const nextStep = () => setCurrentStep((prev) => Math.min(2, prev + 1));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
            Algebraic Principle of Balance Scale
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Whatever operation you perform on the left pan, you must apply to the right pan.
          </p>
        </div>
        <button
          onClick={reset}
          className="text-xs px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          Reset Equation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Balance Scale SVG */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-[#0a0f24] rounded-lg border border-violet-900/30">
          <svg viewBox="0 0 340 180" className="w-full max-w-[340px] select-none">
            {/* Fulcrum Stand */}
            <polygon points="170,120 155,160 185,160" fill="#475569" stroke="#64748b" strokeWidth="1" />
            <rect x="130" y="160" width="80" height="8" rx="2" fill="#334155" />

            {/* Horizontal Beam */}
            <line x1="40" y1="90" x2="300" y2="90" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
            <circle cx="170" cy="90" r="6" fill="#8b5cf6" />

            {/* Left Pan String & Pan */}
            <line x1="70" y1="90" x2="50" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="70" y1="90" x2="90" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 40 130 Q 70 145 100 130 Z" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />

            {/* Right Pan String & Pan */}
            <line x1="270" y1="90" x2="250" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="270" y1="90" x2="290" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 240 130 Q 270 145 300 130 Z" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />

            {/* Left Pan Contents */}
            {currentStep === 0 && (
              <text x="70" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">
                [ 3x ] + 4
              </text>
            )}
            {currentStep === 1 && (
              <text x="70" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">
                [ 3x ]
              </text>
            )}
            {currentStep === 2 && (
              <text x="70" y="125" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                x
              </text>
            )}

            {/* Equal Sign in Center */}
            <text x="170" y="75" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">
              =
            </text>

            {/* Right Pan Contents */}
            {currentStep === 0 && (
              <text x="270" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">
                19
              </text>
            )}
            {currentStep === 1 && (
              <text x="270" y="125" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="bold">
                15
              </text>
            )}
            {currentStep === 2 && (
              <text x="270" y="125" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
                5
              </text>
            )}
          </svg>

          <div className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>State: Both sides balanced</span>
          </div>
        </div>

        {/* Step-by-Step Action Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
            <span className="text-xs text-slate-400 block">Current Equation State</span>
            <div className="text-lg font-mono font-bold text-violet-300 mt-1">
              {currentStep === 0 && '3x + 4 = 19'}
              {currentStep === 1 && '3x = 15'}
              {currentStep === 2 && 'x = 5 (Final Solution)'}
            </div>
          </div>

          <div className="space-y-2">
            {currentStep === 0 && (
              <button
                onClick={nextStep}
                className="w-full py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-colors text-left flex items-center justify-between"
              >
                <span>Step 1: Subtract 4 from both sides</span>
                <span>→</span>
              </button>
            )}

            {currentStep === 1 && (
              <button
                onClick={nextStep}
                className="w-full py-2 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-colors text-left flex items-center justify-between"
              >
                <span>Step 2: Divide both sides by 3</span>
                <span>→</span>
              </button>
            )}

            {currentStep === 2 && (
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-lg text-emerald-300 text-xs">
                <strong>Verification:</strong> 3(5) + 4 = 15 + 4 = 19. Both sides are identical!
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            <strong>Golden Rule of Equations:</strong> Addition and subtraction are inverse operations. Multiplication and division are inverse operations.
          </div>
        </div>
      </div>
    </div>
  );
};
