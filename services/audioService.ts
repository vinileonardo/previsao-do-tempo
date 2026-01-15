/**
 * Generates synthesized sounds using Web Audio API to avoid external dependencies/broken links.
 */
class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGainNode: GainNode | null = null; // Master volume control
  private rainGainNode: GainNode | null = null;
  private isRainPlaying: boolean = false;

  private initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create Master Gain Node if it doesn't exist
    if (!this.masterGainNode && this.audioContext) {
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.gain.value = 1; // Default unmuted
      this.masterGainNode.connect(this.audioContext.destination);
    }

    // We attempt to resume, but it might fail without user interaction.
    // The public resume() method handles the interaction part.
  }

  public async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        console.warn("Audio resume failed", e);
      }
    }
  }

  public setMute(muted: boolean) {
    this.initContext();
    if (this.masterGainNode && this.audioContext) {
      const currentTime = this.audioContext.currentTime;
      // Smooth transition to avoid clicking artifacts
      this.masterGainNode.gain.setTargetAtTime(muted ? 0 : 1, currentTime, 0.1);
    }
  }

  // Generate White Noise Buffer
  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.audioContext) return null;
    const bufferSize = 2 * this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public async startRain() {
    this.initContext();
    if (!this.audioContext || this.isRainPlaying || !this.masterGainNode) return;

    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;

    const noiseSource = this.audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Pink noise approximation filter for rain
    const rainFilter = this.audioContext.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.value = 800; // Muffled rain sound
    rainFilter.Q.value = 0;

    this.rainGainNode = this.audioContext.createGain();
    this.rainGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.rainGainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 2); // Fade in

    noiseSource.connect(rainFilter);
    rainFilter.connect(this.rainGainNode);
    // Connect to Master instead of Destination
    this.rainGainNode.connect(this.masterGainNode);

    noiseSource.start();
    this.isRainPlaying = true;
  }

  public stopRain() {
    if (this.rainGainNode && this.audioContext) {
      this.rainGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1);
      setTimeout(() => {
        if (this.audioContext) {
          // We don't suspend context anymore to allow toggling mute/unmute without full restart logic issues
          // But we mark rain as stopped
          this.isRainPlaying = false;
        }
      }, 1000);
    }
  }

  public playThunder() {
    this.initContext();
    if (!this.audioContext || !this.masterGainNode) return;

    const t = this.audioContext.currentTime;
    
    // 1. Rumble (Low frequency noise)
    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;
    
    const noiseSource = this.audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const thunderFilter = this.audioContext.createBiquadFilter();
    thunderFilter.type = 'lowpass';
    thunderFilter.frequency.setValueAtTime(200, t);
    thunderFilter.frequency.linearRampToValueAtTime(100, t + 1);

    const thunderGain = this.audioContext.createGain();
    // Attack
    thunderGain.gain.setValueAtTime(0, t);
    thunderGain.gain.linearRampToValueAtTime(2.5, t + 0.1); 
    // Decay
    thunderGain.gain.exponentialRampToValueAtTime(0.01, t + 2.5);

    noiseSource.connect(thunderFilter);
    thunderFilter.connect(thunderGain);
    // Connect to Master instead of Destination
    thunderGain.connect(this.masterGainNode);
    
    noiseSource.start(t);
    noiseSource.stop(t + 3);
  }
}

export const audioService = new AudioService();