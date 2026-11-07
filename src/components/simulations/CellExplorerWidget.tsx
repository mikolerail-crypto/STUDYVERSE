import React, { useState } from 'react';

interface OrganelleInfo {
  name: string;
  foundIn: 'Both' | 'Plant Only' | 'Animal Only';
  functionText: string;
  chemicalRole: string;
}

const ORGANELLES: Record<string, OrganelleInfo> = {
  wall: {
    name: 'Cell Wall',
    foundIn: 'Plant Only',
    functionText: 'Rigid outer layer composed of tough cellulose fibers. Provides mechanical support, shape, and prevents lysis.',
    chemicalRole: 'High tensile strength cellulose polymers.'
  },
  chloroplast: {
    name: 'Chloroplast',
    foundIn: 'Plant Only',
    functionText: 'Contains green chlorophyll pigment that absorbs sunlight to synthesize glucose from CO2 and water.',
    chemicalRole: '6CO2 + 6H2O + Sunlight → C6H12O6 + 6O2'
  },
  vacuole: {
    name: 'Large Central Vacuole',
    foundIn: 'Plant Only',
    functionText: 'Expansive water reservoir that creates internal hydrostatic turgor pressure against the cell wall.',
    chemicalRole: 'Maintains plant rigidity; prevents wilting.'
  },
  nucleus: {
    name: 'Nucleus',
    foundIn: 'Both',
    functionText: 'The control center directing cellular metabolism and protein synthesis. Houses hereditary DNA.',
    chemicalRole: 'Chromatin and nucleolus for RNA transcription.'
  },
  mitochondria: {
    name: 'Mitochondrion',
    foundIn: 'Both',
    functionText: 'The cell powerhouse. Breaks down glucose in the presence of oxygen to release usable chemical energy (ATP).',
    chemicalRole: 'Cellular respiration generating ATP.'
  },
  membrane: {
    name: 'Cell Membrane',
    foundIn: 'Both',
    functionText: 'Selectively permeable phospholipid bilayer regulating what enters and leaves the cytoplasm.',
    chemicalRole: 'Phospholipid bilayer with transport protein channels.'
  }
};

export const CellExplorerWidget: React.FC = () => {
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('chloroplast');

  const info = ORGANELLES[selectedOrganelle] || ORGANELLES.chloroplast;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
            Cellular Organelle Interactive Stage
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on organelles in the diagram or buttons to compare eukaryotic structures.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => { setCellType('plant'); setSelectedOrganelle('chloroplast'); }}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              cellType === 'plant' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Plant Cell
          </button>
          <button
            onClick={() => { setCellType('animal'); setSelectedOrganelle('mitochondria'); }}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              cellType === 'animal' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Animal Cell
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Cell Vector Diagram */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-[#071318] rounded-lg border border-emerald-900/30">
          <svg viewBox="0 0 320 220" className="w-full max-w-[320px] select-none cursor-pointer">
            {cellType === 'plant' ? (
              // Plant Cell (Hexagonal / Rectangular with rigid wall)
              <g>
                {/* Cell Wall (outer rigid polygon) */}
                <polygon
                  points="50,20 270,20 300,110 270,200 50,200 20,110"
                  fill="#064e3b"
                  stroke={selectedOrganelle === 'wall' ? '#34d399' : '#059669'}
                  strokeWidth={selectedOrganelle === 'wall' ? 5 : 3}
                  onClick={() => setSelectedOrganelle('wall')}
                />
                {/* Cell Membrane (inner contour) */}
                <polygon
                  points="55,27 265,27 292,110 265,193 55,193 28,110"
                  fill="#022c22"
                  stroke={selectedOrganelle === 'membrane' ? '#38bdf8' : '#10b981'}
                  strokeWidth="1.5"
                  onClick={() => setSelectedOrganelle('membrane')}
                />
                {/* Large Central Vacuole */}
                <ellipse
                  cx="120"
                  cy="125"
                  rx="45"
                  ry="35"
                  fill="#0369a1"
                  fillOpacity="0.4"
                  stroke={selectedOrganelle === 'vacuole' ? '#38bdf8' : '#0284c7'}
                  strokeWidth={selectedOrganelle === 'vacuole' ? 3 : 1.5}
                  onClick={() => setSelectedOrganelle('vacuole')}
                />
                <text x="120" y="130" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">Vacuole</text>

                {/* Nucleus */}
                <circle
                  cx="220"
                  cy="110"
                  r="30"
                  fill="#581c87"
                  stroke={selectedOrganelle === 'nucleus' ? '#c084fc' : '#9333ea'}
                  strokeWidth={selectedOrganelle === 'nucleus' ? 3 : 1.5}
                  onClick={() => setSelectedOrganelle('nucleus')}
                />
                <circle cx="220" cy="110" r="10" fill="#a855f7" />
                <text x="220" y="113" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontWeight="bold">Nucleus</text>

                {/* Chloroplasts */}
                <g onClick={() => setSelectedOrganelle('chloroplast')}>
                  <ellipse cx="80" cy="60" rx="16" ry="10" fill="#15803d" stroke="#4ade80" strokeWidth={selectedOrganelle === 'chloroplast' ? 2 : 1} />
                  <ellipse cx="230" cy="50" rx="16" ry="10" fill="#15803d" stroke="#4ade80" strokeWidth={selectedOrganelle === 'chloroplast' ? 2 : 1} />
                  <ellipse cx="190" cy="170" rx="16" ry="10" fill="#15803d" stroke="#4ade80" strokeWidth={selectedOrganelle === 'chloroplast' ? 2 : 1} />
                </g>

                {/* Mitochondria */}
                <g onClick={() => setSelectedOrganelle('mitochondria')}>
                  <ellipse cx="70" cy="170" rx="14" ry="8" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                  <ellipse cx="255" cy="155" rx="14" ry="8" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                </g>
              </g>
            ) : (
              // Animal Cell (Irregular rounded shape, no cell wall, no chloroplast)
              <g>
                {/* Cell Membrane */}
                <ellipse
                  cx="160"
                  cy="110"
                  rx="135"
                  ry="85"
                  fill="#0c4a6e"
                  fillOpacity="0.3"
                  stroke={selectedOrganelle === 'membrane' ? '#38bdf8' : '#0284c7'}
                  strokeWidth={selectedOrganelle === 'membrane' ? 4 : 2}
                  onClick={() => setSelectedOrganelle('membrane')}
                />
                {/* Central Nucleus */}
                <circle
                  cx="150"
                  cy="110"
                  r="35"
                  fill="#581c87"
                  stroke={selectedOrganelle === 'nucleus' ? '#c084fc' : '#9333ea'}
                  strokeWidth={selectedOrganelle === 'nucleus' ? 3 : 1.5}
                  onClick={() => setSelectedOrganelle('nucleus')}
                />
                <circle cx="150" cy="110" r="12" fill="#a855f7" />
                <text x="150" y="113" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Nucleus</text>

                {/* Mitochondria */}
                <g onClick={() => setSelectedOrganelle('mitochondria')}>
                  <ellipse cx="75" cy="80" rx="18" ry="10" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                  <ellipse cx="235" cy="85" rx="18" ry="10" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                  <ellipse cx="210" cy="150" rx="18" ry="10" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                  <ellipse cx="90" cy="145" rx="18" ry="10" fill="#b45309" stroke="#f59e0b" strokeWidth={selectedOrganelle === 'mitochondria' ? 2 : 1} />
                </g>
              </g>
            )}
          </svg>
          <div className="text-[11px] text-slate-400 mt-2">
            Click any organelle above to inspect its function
          </div>
        </div>

        {/* Organelle Inspector Deck */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-300">{info.name}</span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                info.foundIn === 'Plant Only' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                info.foundIn === 'Animal Only' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                'bg-slate-800 text-slate-300'
              }`}>
                {info.foundIn}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {info.functionText}
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Role: {info.chemicalRole}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(ORGANELLES).map((key) => {
              const item = ORGANELLES[key];
              const isAvailable = cellType === 'plant' || item.foundIn !== 'Plant Only';
              return (
                <button
                  key={key}
                  disabled={!isAvailable}
                  onClick={() => setSelectedOrganelle(key)}
                  className={`text-xs py-1.5 px-2.5 rounded text-left transition-colors truncate ${
                    selectedOrganelle === key
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                      : isAvailable
                      ? 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 border border-transparent'
                      : 'bg-slate-900/30 text-slate-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
