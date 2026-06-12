import {
  LOOP_START,
  MIDDLE_C,
  OCTAVE_MAP,
  REVERB_URL,
  ROOT_KEY,
  SAMPLE_URL,
  SLOT_COUNT,
} from './constants';

class HarmoniumEngine {
  private context: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private gainNode: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private sourceNodes: (AudioBufferSourceNode | null)[] = new Array(SLOT_COUNT).fill(null);
  private sourceNodeState: number[] = new Array(SLOT_COUNT).fill(0);
  private keyMap: number[] = [];

  private volume = 0.3;
  private reverbEnabled = false;
  private transpose = 0;
  private currentOctave = 3;
  private stackCount = 0;

  private loaded = false;
  private loading: Promise<void> | null = null;

  private buildKeyMap(): void {
    const startKey = (MIDDLE_C - 124) + (ROOT_KEY - MIDDLE_C);
    this.keyMap = Array.from({ length: SLOT_COUNT }, (_, i) => startKey + i + this.transpose);
    this.rebuildAllSourceNodes();
  }

  private rebuildAllSourceNodes(): void {
    if (!this.context || !this.audioBuffer || !this.gainNode) return;
    for (let i = 0; i < SLOT_COUNT; i++) {
      this.resetSourceNode(i);
    }
  }

  private resetSourceNode(i: number): void {
    if (!this.context || !this.audioBuffer || !this.gainNode) return;

    if (this.sourceNodes[i] && this.sourceNodeState[i] === 1) {
      try {
        this.sourceNodes[i]!.stop(0);
      } catch {
        /* already stopped */
      }
    }

    this.sourceNodeState[i] = 0;
    const source = this.context.createBufferSource();
    source.connect(this.gainNode);
    source.buffer = this.audioBuffer;
    source.loop = true;
    source.loopStart = LOOP_START;
    if (this.keyMap[i] !== 0) {
      source.detune.value = this.keyMap[i] * 100;
    }
    this.sourceNodes[i] = source;
  }

  private updateReverbRouting(): void {
    if (!this.gainNode || !this.reverbNode) return;

    try {
      this.gainNode.disconnect(this.reverbNode);
    } catch {
      /* not connected */
    }

    if (this.reverbEnabled) {
      this.gainNode.connect(this.reverbNode);
    }
  }

  async load(): Promise<void> {
    if (this.loaded) return;
    if (this.loading) return this.loading;

    this.loading = (async () => {
      this.context = new AudioContext();
      await this.context.resume();

      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = this.volume;
      this.gainNode.connect(this.context.destination);

      const [sampleResponse, reverbResponse] = await Promise.all([
        fetch(SAMPLE_URL),
        fetch(REVERB_URL),
      ]);

      const [sampleData, reverbData] = await Promise.all([
        sampleResponse.arrayBuffer(),
        reverbResponse.arrayBuffer(),
      ]);

      const [sampleBuffer, reverbBuffer] = await Promise.all([
        this.context.decodeAudioData(sampleData),
        this.context.decodeAudioData(reverbData),
      ]);

      this.audioBuffer = sampleBuffer;

      this.reverbNode = this.context.createConvolver();
      this.reverbNode.buffer = reverbBuffer;
      this.reverbNode.connect(this.context.destination);
      this.updateReverbRouting();

      this.buildKeyMap();
      this.loaded = true;
    })();

    return this.loading;
  }

  noteOn(note: number): void {
    if (!this.loaded) return;

    const slots = this.getSlotsForNote(note);
    for (const i of slots) {
      if (i < SLOT_COUNT && this.sourceNodeState[i] === 0 && this.sourceNodes[i]) {
        this.sourceNodes[i]!.start(0);
        this.sourceNodeState[i] = 1;
      }
    }
  }

  noteOff(note: number): void {
    if (!this.loaded) return;

    const slots = this.getSlotsForNote(note);
    for (const i of slots) {
      if (i < SLOT_COUNT) {
        this.resetSourceNode(i);
      }
    }
  }

  private getSlotsForNote(note: number): number[] {
    const slots: number[] = [];
    const base = note + OCTAVE_MAP[this.currentOctave];
    slots.push(base);

    for (let c = 1; c <= this.stackCount; c++) {
      slots.push(note + OCTAVE_MAP[this.currentOctave + c]);
    }

    return slots;
  }

  setVolume(value: number): void {
    this.volume = value;
    if (this.gainNode) {
      this.gainNode.gain.value = value;
    }
  }

  setReverb(enabled: boolean): void {
    this.reverbEnabled = enabled;
    this.updateReverbRouting();
  }

  setTranspose(semitones: number): void {
    this.transpose = semitones;
    this.buildKeyMap();
  }

  setOctave(octaveIndex: number): void {
    this.currentOctave = Math.max(0, Math.min(6, octaveIndex));
  }

  setStackCount(count: number): void {
    let next = Math.max(0, count);
    if (this.currentOctave + next > 6) {
      next = 6 - this.currentOctave;
    }
    this.stackCount = next;
  }

  get isLoaded(): boolean {
    return this.loaded;
  }

  get isLoading(): boolean {
    return this.loading !== null && !this.loaded;
  }
}

export const harmoniumEngine = new HarmoniumEngine();
