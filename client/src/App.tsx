import { useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LoadModule } from './components/LoadModule';
import { PianoKeyboard } from './components/PianoKeyboard';
import { PresetsPanel } from './components/PresetsPanel';
import { SeoSection } from './components/SeoSection';
import { useHarmonium } from './hooks/useHarmonium';
import { useIsMobile } from './hooks/useIsMobile';
import { useMidi } from './hooks/useMidi';

export default function App() {
  const isMobile = useIsMobile();

  const {
    settings,
    updateSetting,
    loadSettings,
    keyboardLayout,
    activeNotes,
    loaded,
    loading,
    loadError,
    rootKey,
    playNote,
    stopNote,
    loadHarmonium,
  } = useHarmonium();

  const handleMidiNoteOn = useCallback(
    (midiNote: number) => playNote(midiNote),
    [playNote]
  );

  const handleMidiNoteOff = useCallback(
    (midiNote: number) => stopNote(midiNote),
    [stopNote]
  );

  const handleMidiVolume = useCallback(
    (velocity: number) => updateSetting('volume', velocity / 127),
    [updateSetting]
  );

  const { devices, supported, connected, error, refreshDevices } = useMidi({
    onNoteOn: handleMidiNoteOn,
    onNoteOff: handleMidiNoteOff,
    onVolumeChange: handleMidiVolume,
    enabled: loaded,
  });

  const keyboardFixed = isMobile && loaded;

  return (
    <div className="min-h-dvh bg-stone-950">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 left-1/4 h-[500px] w-[500px] rounded-full bg-harmony-600/6 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-harmony-500/4 blur-3xl" />
      </div>

      <div className="relative flex min-h-dvh flex-col">
        <Header loaded={loaded} loading={loading} compact={isMobile && loaded} />

        <main
          className={`mx-auto w-full max-w-6xl flex-1 px-3 py-3 sm:px-6 sm:py-8 ${
            keyboardFixed ? 'pb-44' : ''
          }`}
        >
          <div className="space-y-5 sm:space-y-10">
            {/* Hero — hidden on mobile after load to save space */}
            {!(isMobile && loaded) && (
              <HeroSection loaded={loaded} isMobile={isMobile} />
            )}

            {!loaded && (
              <LoadModule loading={loading} error={loadError} onLoad={loadHarmonium} />
            )}

            {/* Desktop / tablet: keyboard in page flow */}
            {!keyboardFixed && (
              <PianoKeyboard
                keys={keyboardLayout}
                activeNotes={activeNotes}
                transpose={settings.transpose}
                disabled={!loaded}
                isMobile={isMobile}
                onNoteOn={playNote}
                onNoteOff={stopNote}
              />
            )}

            {loaded && (
              <div className="space-y-5 rounded-2xl bg-white/[0.02] p-3 ring-1 ring-white/5 sm:space-y-8 sm:p-8">
                <ControlPanel
                  settings={settings}
                  rootKey={rootKey}
                  onChange={updateSetting}
                  midiSupported={supported}
                  midiConnected={connected}
                  midiDevices={devices}
                  midiError={error}
                  onMidiRefresh={refreshDevices}
                  compact={isMobile}
                />
                <PresetsPanel settings={settings} onLoad={loadSettings} compact={isMobile} />
              </div>
            )}

            {/* SEO content — desktop always, mobile only before load */}
            {(!isMobile || !loaded) && <SeoSection compact={isMobile} />}
          </div>
        </main>

        {/* Mobile: full-width fixed keyboard at bottom */}
        {keyboardFixed && (
          <PianoKeyboard
            keys={keyboardLayout}
            activeNotes={activeNotes}
            transpose={settings.transpose}
            disabled={!loaded}
            isMobile
            fixed
            onNoteOn={playNote}
            onNoteOff={stopNote}
          />
        )}

        {!keyboardFixed && (
          <footer className="border-t border-white/5 py-6 pb-safe sm:py-8">
            <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
              <p className="text-sm text-stone-400">Web Harmonium — Play Harmonium Online Free</p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
