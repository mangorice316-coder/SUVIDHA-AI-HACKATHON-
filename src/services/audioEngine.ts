import { ComponentType } from '../types/topostem';

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public playComponentSonification(type: ComponentType, normalizedX: number = 0.5) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    // Convert 0..1 to -1..1 for stereo panner
    const panValue = Math.max(-1, Math.min(1, (normalizedX - 0.5) * 2));
    if (panner) {
      panner.pan.setValueAtTime(panValue, now);
    }

    // Frequencies tailored to component physical intuition
    switch (type) {
      case 'battery':
      case 'ac_source':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now); // Warm low buzz
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        break;

      case 'resistor':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5 clean tone
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        break;

      case 'capacitor':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now); // E5 rising tone
        osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.18); // B5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        break;

      case 'inductor':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(196.00, now); // G3 deep resonant hum
        osc.frequency.linearRampToValueAtTime(146.83, now + 0.2); // D3
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        break;

      case 'ground':
        osc.type = 'square';
        osc.frequency.setValueAtTime(110, now); // Deep anchor click
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        break;

      case 'junction_node':
      default:
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now); // A5 double ping
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        break;
    }

    if (panner) {
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.ctx.destination);
    } else {
      osc.connect(gain);
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.35);
  }

  public playBranchChime(direction: 'left' | 'right' | 'up' | 'down') {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

    let pan = 0;
    let freq = 600;
    if (direction === 'left') { pan = -0.8; freq = 500; }
    if (direction === 'right') { pan = 0.8; freq = 700; }
    if (direction === 'up') { pan = 0; freq = 800; }
    if (direction === 'down') { pan = 0; freq = 400; }

    if (panner) panner.pan.setValueAtTime(pan, now);
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    if (panner) {
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.ctx.destination);
    } else {
      osc.connect(gain);
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playChime(frequency: number = 587.33, duration: number = 0.2) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.05, now + duration * 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public speakAnnouncement(text: string, interrupt: boolean = true, langCode?: string) {
    if (!this.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (interrupt) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Map short codes to BCP 47 language tags
    const langMap: Record<string, string> = {
      ta: 'ta-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      kn: 'kn-IN',
      en: 'en-IN'
    };

    if (langCode && langMap[langCode]) {
      utterance.lang = langMap[langCode];
    } else if (langCode) {
      utterance.lang = langCode;
    }

    // Try finding matching voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0 && utterance.lang) {
      const matchedVoice = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(utterance.lang.slice(0, 2)));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const audioEngine = new SpatialAudioEngine();
