import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { OrbType, DashboardStats } from '../types';

interface HUDProps {
  mode: 'all' | 'proj' | 'items';
  setMode: (mode: 'all' | 'proj' | 'items') => void;
  subFilters: { cert: boolean; achv: boolean; item: boolean };
  setSubFilters: React.Dispatch<React.SetStateAction<{ cert: boolean; achv: boolean; item: boolean }>>;
  orbs: OrbType[];
  onClear: () => void;
  onInvoke: () => void;
  activeCombo: string;
  stats: DashboardStats;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (vol: number) => void;
  activeStatFilter: string | null;
  setActiveStatFilter: (filter: string | null) => void;
}

export const InvokerHUD: React.FC<HUDProps> = ({
  mode,
  setMode,
  subFilters,
  setSubFilters,
  orbs,
  onClear,
  onInvoke,
  activeCombo,
  stats,
  soundEnabled,
  setSoundEnabled,
  volume,
  setVolume,
  activeStatFilter,
  setActiveStatFilter,
}) => {
  const [keybindsExpanded, setKeybindsExpanded] = useState(false);

  const getOrbShadowAndBorder = (orb: OrbType) => {
    switch (orb) {
      case 'Q':
        return 'shadow-[0_0_15px_#00d0ff] border border-cyan-400/50 text-cyan-50';
      case 'W':
        return 'shadow-[0_0_15px_#d000ff] border border-fuchsia-400/50 text-fuchsia-50';
      case 'E':
        return 'shadow-[0_0_15px_#ff6a00] border border-amber-400/50 text-amber-50';
    }
  };

  const getOrbGradient = (orb: OrbType) => {
    switch (orb) {
      case 'Q':
        return 'from-cyan-300 via-cyan-500 to-blue-600';
      case 'W':
        return 'from-fuchsia-300 via-fuchsia-500 to-purple-600';
      case 'E':
        return 'from-amber-300 via-orange-500 to-red-600';
    }
  };

  const getOrbLabel = (orb: OrbType) => {
    switch (orb) {
      case 'Q': return 'Quas';
      case 'W': return 'Wex';
      case 'E': return 'Exort';
    }
  };

  const handleSubFilterToggle = (key: 'cert' | 'achv' | 'item') => {
    setSubFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStatClick = (type: string) => {
    if (activeStatFilter === type) {
      setActiveStatFilter(null); // Reset filter
    } else {
      setActiveStatFilter(type);
    }
  };

  return (
    <div className="dark:bg-[#111418] bg-white border dark:border-slate-800 border-slate-200 rounded-xl p-5 shadow-lg flex flex-col gap-5 sticky top-24 select-none">
      {/* 1. Title Header (without volume) */}
      <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 border-slate-200">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} size={20} />
          <h2 className="text-md font-bold tracking-widest text-slate-800 dark:text-slate-100 flex items-center gap-1.5 font-dota">
            ⚡ THE ARCH-MAGE HUD ⚡
          </h2>
        </div>
      </div>

      {/* 1b. Mode Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Mode Selector
        </label>
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
          {(['all', 'proj', 'items'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-1.5 text-xs font-bold rounded-md capitalize transition-all ${mode === m
                ? 'bg-white dark:bg-slate-800 text-blue-500 dark:text-quas shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              {m === 'proj' ? 'Proj' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Sub Checkboxes (Items Mode only) */}
      {mode === 'items' && (
        <div className="animate-fadeIn">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Active Item Filters
          </label>
          <div className="flex flex-col gap-2 p-3 dark:bg-slate-900/60 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg">
            {(['cert', 'achv', 'item'] as const).map((key) => {
              const labelMap = { cert: 'Certifications', achv: 'Achievements', item: 'Hardware Items' };
              return (
                <label key={key} className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100">
                  <input
                    type="checkbox"
                    checked={subFilters[key]}
                    onChange={() => handleSubFilterToggle(key)}
                    className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-slate-800"
                  />
                  <span>{labelMap[key]}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Dashboard Statistics (Interactive/Toggleable) */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Dashboard Statistics
          </label>
          {activeStatFilter && (
            <button
              onClick={() => setActiveStatFilter(null)}
              className="text-[9px] text-red-500 hover:underline font-bold"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <div
            onClick={() => handleStatClick('total')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'total'
              ? 'dark:bg-slate-800 bg-slate-150 border-blue-500 shadow-md ring-1 ring-blue-500/10'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-slate-400 font-medium">Total Cards</span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.total}</span>
          </div>

          <div
            onClick={() => handleStatClick('quas')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'quas'
              ? 'dark:bg-slate-800 bg-slate-150 border-cyan-500 shadow-[0_0_10px_rgba(0,208,255,0.25)] ring-1 ring-cyan-500/20'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-cyan-500 dark:text-cyan-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
              Quas (Q)
            </span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.quas}</span>
          </div>

          <div
            onClick={() => handleStatClick('wex')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'wex'
              ? 'dark:bg-slate-800 bg-slate-150 border-fuchsia-500 shadow-[0_0_10px_rgba(208,0,255,0.25)] ring-1 ring-fuchsia-500/20'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-fuchsia-500 dark:text-fuchsia-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 inline-block animate-pulse" />
              Wex (W)
            </span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.wex}</span>
          </div>

          <div
            onClick={() => handleStatClick('exort')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'exort'
              ? 'dark:bg-slate-800 bg-slate-150 border-orange-500 shadow-[0_0_10px_rgba(255,106,0,0.25)] ring-1 ring-orange-500/20'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-orange-500 dark:text-orange-400 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block animate-pulse" />
              Exort (E)
            </span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.exort}</span>
          </div>

          <div
            onClick={() => handleStatClick('gold')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'gold'
              ? 'dark:bg-slate-800 bg-slate-150 border-amber-400 shadow-[0_0_10px_rgba(255,215,0,0.25)] ring-1 ring-amber-400/20'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-amber-600 dark:text-gold font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse" />
              Gold (Achv)
            </span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.gold}</span>
          </div>

          <div
            onClick={() => handleStatClick('grey')}
            className={`p-2.5 rounded-lg flex flex-col border transition-all cursor-pointer ${activeStatFilter === 'grey'
              ? 'dark:bg-slate-800 bg-slate-150 border-slate-500 shadow-md ring-1 ring-slate-500/10'
              : 'dark:bg-slate-900 bg-slate-50 dark:border-slate-800 border-slate-200 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
          >
            <span className="text-[10px] text-slate-400 font-medium">Item</span>
            <span className="text-lg font-black dark:text-white text-slate-800">{stats.grey}</span>
          </div>
        </div>
      </div>

      {/* 3. Keybind Legend (Expandable) */}
      <div className="p-3 dark:bg-slate-900 bg-slate-50 border dark:border-slate-800 border-slate-200 rounded-lg">
        <button
          onClick={() => setKeybindsExpanded(!keybindsExpanded)}
          className="w-full flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 font-bold focus:outline-none"
        >
          <div className="flex items-center gap-1.5">
            <HelpCircle size={14} />
            <span>Keyboard Binds</span>
          </div>
          {keybindsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {keybindsExpanded && (
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2 animate-fadeIn">
            <div className="flex justify-between border-b dark:border-slate-800 border-slate-100 pb-1">
              <span>Q: Quas</span>
              <kbd className="px-1.5 dark:bg-slate-800 bg-slate-200 rounded text-[9px]">Q</kbd>
            </div>
            <div className="flex justify-between border-b dark:border-slate-800 border-slate-100 pb-1">
              <span>W: Wex</span>
              <kbd className="px-1.5 dark:bg-slate-800 bg-slate-200 rounded text-[9px]">W</kbd>
            </div>
            <div className="flex justify-between border-b dark:border-slate-800 border-slate-100 pb-1">
              <span>E: Exort</span>
              <kbd className="px-1.5 dark:bg-slate-800 bg-slate-200 rounded text-[9px]">E</kbd>
            </div>
            <div className="flex justify-between border-b dark:border-slate-800 border-slate-100 pb-1">
              <span>R: Invoke</span>
              <kbd className="px-1.5 dark:bg-slate-800 bg-slate-200 rounded text-[9px]">R</kbd>
            </div>
            <div className="flex justify-between col-span-2 pt-0.5">
              <span>Space: Clear Queue</span>
              <kbd className="px-1.5 dark:bg-slate-800 bg-slate-200 rounded text-[9px]">Space</kbd>
            </div>
          </div>
        )}
      </div>

      {/* 4. Invoker - Active Orbs Queue & Buttons */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Active Orbs Queue
          </label>
          {activeCombo && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">
              Combo: {activeCombo}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-3 p-3 dark:bg-slate-900 bg-slate-100 rounded-lg min-h-[64px] items-center border dark:border-slate-800 border-slate-200">
          {[0, 1, 2].map((idx) => {
            const orb = orbs[idx];
            return (
              <div
                key={idx}
                className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden ${orb
                  ? getOrbShadowAndBorder(orb)
                  : 'border-2 border-dashed dark:border-slate-700 border-slate-300 text-slate-400 dark:text-slate-600'
                  }`}
              >
                {orb ? (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getOrbGradient(orb)} animate-spin`}
                      style={{ animationDuration: '6s' }}
                    />
                    <div className="relative z-10 flex flex-col items-center justify-center text-white select-none">
                      <span className="text-xs font-black leading-none">{orb}</span>
                      <span className="text-[7px] font-medium tracking-tight mt-0.5 opacity-90">
                        {getOrbLabel(orb)}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-[10px]">-</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoke & Clear Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClear}
          className="flex-1 py-2 text-xs font-bold rounded-lg border dark:border-slate-800 border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-slate-400 text-slate-600 transition-colors"
        >
          CLEAR (Space)
        </button>
        <button
          onClick={onInvoke}
          disabled={orbs.length < 3}
          className={`flex-1 py-2 text-xs font-bold rounded-lg text-white transition-all shadow-md ${orbs.length === 3
            ? 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.4)] invoke-btn-glow'
            : 'bg-slate-300 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border dark:border-slate-800 border-slate-200'
            }`}
        >
          INVOKE (R)
        </button>
      </div>

      {/* Volume Slider (at the bottom) */}
      <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <span>Master Volume</span>
          <span className="text-[10px] dark:text-slate-400 text-slate-500 font-bold">{Math.round(volume * 100)}%</span>
        </div>
        <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg border dark:border-slate-800/85 border-slate-200">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 dark:hover:bg-slate-850 hover:bg-slate-200 rounded transition-colors text-slate-500 dark:text-slate-400"
            title="Toggle SFX"
          >
            {soundEnabled && volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={soundEnabled ? volume : 0}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              if (val > 0 && !soundEnabled) {
                setSoundEnabled(true);
              }
            }}
            className="flex-1 h-1 rounded-lg appearance-none cursor-pointer accent-emerald-500 bg-slate-200 dark:bg-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

export default InvokerHUD;
