import type { CSSProperties } from 'react';
import { Layers, Minus, Music, Plus, RefreshCw, Sliders, Volume2, Wifi } from 'lucide-react';
import type { HarmoniumSettings } from '../types';

interface ControlPanelProps {
  settings: HarmoniumSettings;
  rootKey: string;
  onChange: <K extends keyof HarmoniumSettings>(key: K, value: HarmoniumSettings[K]) => void;
  midiSupported: boolean;
  midiConnected: boolean;
  midiDevices: { id: string; name: string }[];
  midiError: string | null;
  onMidiRefresh: () => void;
  compact?: boolean;
}

function Stepper({
  label,
  value,
  min,
  max,
  onDecrease,
  onIncrease,
  compact,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onDecrease: () => void;
  onIncrease: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-xl bg-white/[0.03] ring-1 ring-white/6 ${compact ? 'p-3' : 'rounded-2xl p-4'}`}>
      <p className={`font-medium text-stone-400 ${compact ? 'mb-2 text-[10px]' : 'mb-3 text-xs'}`}>
        {label}
      </p>
      <div className="flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= min}
          className={`flex items-center justify-center rounded-lg bg-stone-800 text-stone-300 active:scale-95 disabled:opacity-25 ${
            compact ? 'h-9 w-9' : 'h-12 w-12 rounded-xl sm:h-11 sm:w-11'
          }`}
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className={`text-center font-semibold tabular-nums text-white ${compact ? 'text-xl' : 'min-w-[3rem] text-3xl'}`}>
          {value}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={value >= max}
          className={`flex items-center justify-center rounded-lg bg-harmony-600 text-white active:scale-95 disabled:opacity-25 ${
            compact ? 'h-9 w-9' : 'h-12 w-12 rounded-xl sm:h-11 sm:w-11'
          }`}
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ControlPanel({
  settings,
  rootKey,
  onChange,
  midiSupported,
  midiConnected,
  midiDevices,
  midiError,
  onMidiRefresh,
  compact,
}: ControlPanelProps) {
  const volumePercent = Math.round(settings.volume * 100);

  return (
    <section aria-label="Harmonium controls" className={compact ? 'space-y-4' : 'space-y-6'}>
      {!compact && (
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-harmony-500" />
          <h2 className="text-base font-semibold text-white">Sound Controls</h2>
        </div>
      )}

      <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'gap-4 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {/* Volume */}
        <div className={`bg-white/[0.03] ring-1 ring-white/6 ${compact ? 'col-span-2 rounded-xl p-3' : 'rounded-2xl p-5 sm:col-span-2 lg:col-span-1'}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-harmony-500" />
              <span className="text-sm font-medium text-stone-300">Volume</span>
            </div>
            <span className="rounded-lg bg-harmony-500/15 px-2.5 py-1 text-sm font-semibold text-harmony-400 tabular-nums">
              {volumePercent}%
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={100}
            value={volumePercent}
            onChange={(e) => onChange('volume', Number(e.target.value) / 100)}
            className="harmony-slider w-full"
            style={{ '--progress': `${volumePercent}%` } as CSSProperties}
            aria-label="Volume"
          />
        </div>

        {/* Reverb */}
        <div className={`flex items-center justify-between bg-white/[0.03] ring-1 ring-white/6 ${compact ? 'rounded-xl p-3' : 'rounded-2xl p-5'}`}>
          <div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-harmony-500" />
              <p className={`font-medium text-stone-200 ${compact ? 'text-xs' : 'text-sm'}`}>Reverb</p>
            </div>
            {!compact && <p className="mt-1 text-xs text-stone-500">Spacious harmonium resonance</p>}
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.reverb}
            onClick={() => onChange('reverb', !settings.reverb)}
            className={`relative h-8 w-14 rounded-full transition-colors ${
              settings.reverb ? 'bg-harmony-500' : 'bg-stone-700'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                settings.reverb ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* MIDI — hidden on compact mobile */}
        {!compact && (
        <div className="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-harmony-500" />
              <span className="text-sm font-medium text-stone-300">MIDI Keyboard</span>
            </div>
            <button
              type="button"
              onClick={onMidiRefresh}
              className="rounded-lg p-1.5 text-stone-500 transition hover:bg-stone-800 hover:text-white"
              aria-label="Refresh MIDI devices"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          {!midiSupported ? (
            <p className="text-xs text-stone-500">Use Chrome or Edge for MIDI</p>
          ) : midiError ? (
            <p className="text-xs text-amber-400">{midiError}</p>
          ) : midiConnected ? (
            <div className="space-y-1.5">
              {midiDevices.map((d) => (
                <p key={d.id} className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {d.name}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-500">Plug in a USB MIDI keyboard</p>
          )}
        </div>
        )}
      </div>

      {!compact && (
        <div className="flex items-center gap-2 pt-2">
          <Music className="h-4 w-4 text-harmony-500" />
          <h2 className="text-base font-semibold text-white">Pitch & Reeds</h2>
        </div>
      )}

      <div className={`grid gap-3 ${compact ? 'grid-cols-3' : 'gap-4 sm:grid-cols-3'}`}>
        <Stepper
          compact={compact}
          label={compact ? rootKey : `Transpose — ${rootKey}`}
          value={settings.transpose}
          min={-11}
          max={11}
          onDecrease={() => onChange('transpose', Math.max(-11, settings.transpose - 1))}
          onIncrease={() => onChange('transpose', Math.min(11, settings.transpose + 1))}
        />
        <Stepper
          compact={compact}
          label={compact ? 'Octave' : 'Current Octave'}
          value={settings.octave}
          min={0}
          max={6}
          onDecrease={() => onChange('octave', Math.max(0, settings.octave - 1))}
          onIncrease={() => onChange('octave', Math.min(6, settings.octave + 1))}
        />
        <Stepper
          compact={compact}
          label={compact ? 'Reeds' : 'Additional Reeds'}
          value={settings.additionalReeds}
          min={0}
          max={6 - settings.octave}
          onDecrease={() => onChange('additionalReeds', Math.max(0, settings.additionalReeds - 1))}
          onIncrease={() =>
            onChange('additionalReeds', Math.min(6 - settings.octave, settings.additionalReeds + 1))
          }
        />
      </div>
    </section>
  );
}
