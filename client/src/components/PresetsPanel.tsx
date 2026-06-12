import { Bookmark, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deletePreset, loadPresets, savePreset } from '../storage/presets';
import type { HarmoniumSettings, Preset } from '../types';

interface PresetsPanelProps {
  settings: HarmoniumSettings;
  onLoad: (settings: HarmoniumSettings) => void;
  compact?: boolean;
}

export function PresetsPanel({ settings, onLoad, compact }: PresetsPanelProps) {
  const [presets, setPresets] = useState<Preset[]>(() => loadPresets());
  const [presetName, setPresetName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    if (!presetName.trim()) return;
    const created = savePreset(presetName.trim(), settings);
    setPresets((prev) => [created, ...prev]);
    setPresetName('');
    setMessage('Preset saved');
    setTimeout(() => setMessage(null), 2500);
  };

  const handleDelete = (id: string) => {
    deletePreset(id);
    setPresets((prev) => prev.filter((p) => p.id !== id));
  };

  if (compact && presets.length === 0) return null;

  return (
    <section className={`border-t border-white/5 ${compact ? 'pt-4' : 'pt-6'}`}>
      <div className={`flex items-center gap-2 ${compact ? 'mb-3' : 'mb-4'}`}>
        <Bookmark className="h-4 w-4 text-harmony-500" />
        <h2 className={`font-semibold text-white ${compact ? 'text-sm' : 'text-base'}`}>Presets</h2>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder="Name your preset…"
          maxLength={80}
          className="flex-1 rounded-xl border border-white/8 bg-stone-900/60 px-4 py-2.5 text-sm text-white placeholder:text-stone-600 outline-none focus:border-harmony-500/40 focus:ring-2 focus:ring-harmony-500/15"
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!presetName.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-harmony-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-harmony-500 disabled:opacity-40"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>

      {message && <p className="mt-2 text-xs text-harmony-400">{message}</p>}

      {presets.length === 0 ? (
        <p className="mt-4 rounded-xl bg-stone-900/40 py-6 text-center text-sm text-stone-500">
          Save your favourite transpose &amp; reed settings here
        </p>
      ) : (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {presets.map((preset) => (
            <li
              key={preset.id}
              className="flex items-center justify-between rounded-xl bg-stone-900/50 px-4 py-3 ring-1 ring-white/5 transition hover:ring-white/10"
            >
              <button
                type="button"
                onClick={() =>
                  onLoad({
                    volume: preset.volume,
                    reverb: preset.reverb,
                    transpose: preset.transpose,
                    octave: preset.octave,
                    additionalReeds: preset.additionalReeds,
                  })
                }
                className="text-left text-sm font-medium text-stone-200 transition hover:text-harmony-300"
              >
                {preset.name}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(preset.id)}
                className="rounded-lg p-1.5 text-stone-600 transition hover:bg-red-500/10 hover:text-red-400"
                aria-label={`Delete ${preset.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
