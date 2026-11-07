import React, { useState } from 'react';

export const SentenceBuilderWidget: React.FC<{ mode?: 'english' | 'oromo' }> = ({ mode = 'english' }) => {
  const [clause1, setClause1] = useState<string>(
    mode === 'english' ? 'The students conducted the laboratory experiment' : 'Caaltuun'
  );
  const [conjunction, setConjunction] = useState<string>(
    mode === 'english' ? 'and' : 'mana barumsaatti'
  );
  const [clause2, setClause2] = useState<string>(
    mode === 'english' ? 'they recorded accurate observations in their notebooks.' : 'herrega baratte.'
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 my-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
            {mode === 'english' ? 'Sentence Architecture Synthesizer' : 'Ijaarsa Himaa (SOV)'}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'english'
              ? 'Select clauses and conjunctions to observe compound and complex sentence structures.'
              : 'Mat-himaa, Anta-himaa fi Gochima sirriitti qindeessi.'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {mode === 'english' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Independent Clause 1</label>
              <select
                value={clause1}
                onChange={(e) => setClause1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2"
              >
                <option value="The students conducted the laboratory experiment">The students conducted the laboratory experiment</option>
                <option value="Dawit completed his mathematics assignment">Dawit completed his mathematics assignment</option>
                <option value="The Blue Nile River rises in the Ethiopian highlands">The Blue Nile River rises in the Ethiopian highlands</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Conjunction (FANBOYS / Subordinate)</label>
              <select
                value={conjunction}
                onChange={(e) => setConjunction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-semibold rounded-lg p-2"
              >
                <option value=", and">, and (Coordinating - Compound)</option>
                <option value=", but">, but (Coordinating - Contrast)</option>
                <option value=", so">, so (Coordinating - Result)</option>
                <option value="because">because (Subordinating - Complex)</option>
                <option value="although">although (Subordinating - Concession)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Clause 2</label>
              <select
                value={clause2}
                onChange={(e) => setClause2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2"
              >
                <option value="they recorded accurate observations in their notebooks.">they recorded accurate observations in their notebooks.</option>
                <option value="he earned full marks on the assessment.">he earned full marks on the assessment.</option>
                <option value="it provides vital freshwater to millions.">it provides vital freshwater to millions.</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">1. Mat-himaa (Subject)</label>
              <select
                value={clause1}
                onChange={(e) => setClause1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-violet-300 font-semibold rounded-lg p-2"
              >
                <option value="Caaltuun">Caaltuun</option>
                <option value="Tolasaan">Tolasaan</option>
                <option value="Barattoonni">Barattoonni</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">2. Anta-himaa (Object / Complement)</label>
              <select
                value={conjunction}
                onChange={(e) => setConjunction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-semibold rounded-lg p-2"
              >
                <option value="mana barumsaatti">mana barumsaatti</option>
                <option value="kitaaba herregaa">kitaaba herregaa</option>
                <option value="aadaa Oromoo">aadaa Oromoo</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">3. Gochima (Verb - Dhuma Himaa)</label>
              <select
                value={clause2}
                onChange={(e) => setClause2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-semibold rounded-lg p-2"
              >
                <option value="baratte.">baratte.</option>
                <option value="dubbisan.">dubbisan.</option>
                <option value="jaallata.">jaallata.</option>
              </select>
            </div>
          </div>
        )}

        {/* Live Synthesized Sentence Box */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            {mode === 'english' ? 'Constructed Sentence Output' : 'Hima Ijaarame'}
          </span>
          <div className="text-base text-slate-100 font-medium">
            {mode === 'english' ? (
              <span>
                {clause1} <strong className="text-cyan-400">{conjunction}</strong> {clause2}
              </span>
            ) : (
              <span>
                <strong className="text-violet-400">{clause1}</strong>{' '}
                <strong className="text-cyan-400">{conjunction}</strong>{' '}
                <strong className="text-emerald-400">{clause2}</strong>
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {mode === 'english'
              ? conjunction.includes('because') || conjunction.includes('although')
                ? 'Structure: Complex Sentence (Independent + Dependent Subordinate Clause)'
                : 'Structure: Compound Sentence (Two Independent Clauses joined by Coordinating Conjunction)'
              : 'Caasaa: Mat-himaa (Subject) + Anta-himaa (Object) + Gochima (Verb)'}
          </div>
        </div>
      </div>
    </div>
  );
};
