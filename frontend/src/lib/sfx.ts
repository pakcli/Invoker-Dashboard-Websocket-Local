class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private volume = 0.5; // Master volume
  private buffers: Record<string, AudioBuffer | undefined> = {};
  private loading: Record<string, Promise<AudioBuffer> | undefined> = {};

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser.");
    }
  }

  toggle(enabled?: boolean) {
    if (enabled !== undefined) {
      this.enabled = enabled;
    } else {
      this.enabled = !this.enabled;
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  getVolume() {
    return this.volume;
  }

  private async loadSound(name: string, url: string): Promise<AudioBuffer | null> {
    this.init();
    if (!this.ctx) return null;
    if (this.buffers[name]) return this.buffers[name];

    if (this.loading[name]) {
      return this.loading[name];
    }

    const loadPromise = (async () => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.ctx!.decodeAudioData(arrayBuffer);
      this.buffers[name] = audioBuffer;
      return audioBuffer;
    })();

    this.loading[name] = loadPromise;
    return loadPromise;
  }

  private async playBuffer(name: string, url: string, volumeScale = 0.5, isInvoke = false) {
    this.init();
    if (!this.ctx || !this.enabled) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const buffer = await this.loadSound(name, url);
      if (!buffer) return;

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      // Subtle random pitch variation (Invoke is 0.001 lower baseline)
      const pitchRange = isInvoke ? 0.08 : 0.04;
      const pitchShift = (isInvoke ? 0.999 : 1.0) + (Math.random() - 0.5) * pitchRange;
      source.playbackRate.setValueAtTime(pitchShift, this.ctx.currentTime);

      const gainNode = this.ctx.createGain();
      const now = this.ctx.currentTime;
      const targetVolume = volumeScale * this.volume;

      if (isInvoke) {
        const actualDuration = buffer.duration / pitchShift;
        
        // fade start selesai (fade in over 0.1s)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(targetVolume, now + 0.1);
        
        // 80% chance of ending sooner (0.6s fadeout), 20% chance of ending later (0.25s fadeout)
        const xs = Math.random() < 0.8 ? 0.6 : 0.25;
        const fadeStart = now + Math.max(0.1, actualDuration - xs);
        
        // start end mulai end -0.0s (complete fade to 0)
        const fadeEnd = now + actualDuration;
        
        gainNode.gain.setValueAtTime(targetVolume, fadeStart);
        gainNode.gain.linearRampToValueAtTime(0.0001, fadeEnd);
      } else {
        gainNode.gain.setValueAtTime(targetVolume, now);
      }

      source.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      source.start(0);
    } catch (e) {
      console.error(`Error playing audio buffer ${name}:`, e);
    }
  }

  playTick() {
    this.playBuffer('orb_click', '/assets/Ui_buttonclickrelease.mp3.mpeg', 0.4);
  }

  playQuas() {
    this.playBuffer('orb_click', '/assets/Ui_buttonclickrelease.mp3.mpeg', 0.8);
  }

  playWex() {
    this.playBuffer('orb_click', '/assets/Ui_buttonclickrelease.mp3.mpeg', 0.8);
  }

  playExort() {
    this.playBuffer('orb_click', '/assets/Ui_buttonclickrelease.mp3.mpeg', 0.8);
  }

  playInvoke() {
    this.playBuffer('invoke', '/assets/Invoke.mp3.mpeg', 0.8, true);
  }
}

export const sfx = new SoundManager();
export default sfx;
