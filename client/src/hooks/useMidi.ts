import { useCallback, useEffect, useState } from 'react';
import type { MidiDevice } from '../types';

interface UseMidiOptions {
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
  onVolumeChange?: (velocity: number) => void;
  enabled: boolean;
}

export function useMidi({ onNoteOn, onNoteOff, onVolumeChange, enabled }: UseMidiOptions) {
  const [devices, setDevices] = useState<MidiDevice[]>([]);
  const [supported, setSupported] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshDevices = useCallback(async () => {
    if (!navigator.requestMIDIAccess) {
      setSupported(false);
      setError('Web MIDI is not supported in this browser');
      return;
    }

    try {
      setSupported(true);
      setError(null);
      const access = await navigator.requestMIDIAccess({ sysex: false });

      const inputs: MidiDevice[] = [];
      access.inputs.forEach((input) => {
        inputs.push({ id: input.id, name: input.name || 'MIDI Device' });
      });

      setDevices(inputs);
      setConnected(inputs.length > 0);

      const handleMessage = (event: MIDIMessageEvent) => {
        const [status, note, velocity] = event.data ?? [];
        const command = status & 0xf0;

        if (command === 0x90 && velocity > 0) {
          onNoteOn(note);
        } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
          onNoteOff(note);
        } else if (command === 0xb0 && note === 7 && onVolumeChange) {
          onVolumeChange(velocity);
        }
      };

      access.inputs.forEach((input) => {
        input.onmidimessage = handleMessage;
      });

      access.onstatechange = () => {
        const updated: MidiDevice[] = [];
        access.inputs.forEach((input) => {
          updated.push({ id: input.id, name: input.name || 'MIDI Device' });
        });
        setDevices(updated);
        setConnected(updated.length > 0);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access MIDI devices');
      setConnected(false);
    }
  }, [onNoteOn, onNoteOff, onVolumeChange]);

  useEffect(() => {
    if (enabled) {
      void refreshDevices();
    }
  }, [enabled, refreshDevices]);

  return { devices, supported, connected, error, refreshDevices };
}
