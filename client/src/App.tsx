import { useCallback } from 'react';
import { AD_SLOTS } from './ads/config';
import { AdSenseScript } from './ads/AdSenseScript';
import { AdUnit } from './ads/AdUnit';
import { PageAdLayout } from './ads/PageAdLayout';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LoadModule } from './components/LoadModule';
import { MobilePhoneKeyboard } from './components/MobilePhoneKeyboard';
import { MobilePlayChooser } from './components/MobilePlayChooser';
import { PianoKeyboard } from './components/PianoKeyboard';
import { PresetsPanel } from './components/PresetsPanel';
import { SeoSection } from './components/SeoSection';
import { useHarmonium } from './hooks/useHarmonium';
import { useIsMobile } from './hooks/useIsMobile';
import { useMidi } from './hooks/useMidi';
import { useMobilePlayMode } from './hooks/useMobilePlayMode';

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

  const { mode: mobileMode, selectMode, clearMode, showChooser } = useMobilePlayMode(
    isMobile,
    loaded
  );

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

  const mobileTouchPiano = isMobile && loaded && mobileMode === 'touch-piano';
  const mobilePhoneKeyboard = isMobile && loaded && mobileMode === 'phone-keyboard';
  const mobileBottomBar = mobileTouchPiano || mobilePhoneKeyboard;
  const mainBottomPadding = mobileBottomBar ? (mobilePhoneKeyboard ? 'pb-52' : 'pb-44') : '';

  const mainContent = (
    <div className={`space-y-5 sm:space-y-10 ${mainBottomPadding}`}>
      {!(isMobile && loaded) && (
        <HeroSection loaded={loaded} isMobile={isMobile} />
      )}

      {isMobile && (
        <div className="ad-mobile-banner">
          <AdUnit slot={AD_SLOTS.mobile} format="banner" label="Mobile banner ad" />
        </div>
      )}

      {!loaded && (
        <LoadModule loading={loading} error={loadError} onLoad={loadHarmonium} />
      )}

      {showChooser && <MobilePlayChooser onSelect={selectMode} />}

      {/* Desktop + mobile before mode chosen: piano in page */}
      {!mobileBottomBar && !showChooser && (
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

      {loaded && !showChooser && (
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

      {!isMobile && (
        <div className="ad-content-banner">
          <AdUnit slot={AD_SLOTS.footer} format="banner" label="Content banner ad" />
        </div>
      )}

      {(!isMobile || !loaded) && <SeoSection compact={isMobile} />}
    </div>
  );

  return (
    <div className="min-h-dvh bg-stone-950">
      <AdSenseScript />

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-48 left-1/4 h-[500px] w-[500px] rounded-full bg-harmony-600/6 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-harmony-500/4 blur-3xl" />
      </div>

      <div className="relative flex min-h-dvh flex-col">
        <Header loaded={loaded} loading={loading} compact={isMobile && loaded} />

        <main className="mx-auto w-full flex-1 px-3 py-3 sm:px-4 sm:py-8">
          {isMobile ? (
            <div className="mx-auto max-w-lg">{mainContent}</div>
          ) : (
            <PageAdLayout>{mainContent}</PageAdLayout>
          )}
        </main>

        {mobileTouchPiano && (
          <PianoKeyboard
            keys={keyboardLayout}
            activeNotes={activeNotes}
            transpose={settings.transpose}
            isMobile
            fixed
            onNoteOn={playNote}
            onNoteOff={stopNote}
          />
        )}

        {mobilePhoneKeyboard && (
          <MobilePhoneKeyboard
            activeNotes={activeNotes}
            onNoteOn={playNote}
            onNoteOff={stopNote}
            onSwitchMode={clearMode}
          />
        )}

        {!mobileBottomBar && (
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
