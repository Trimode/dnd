/**
 * Web Audio API Procedural Sound Engine
 * Generates ambient elemental soundscapes and tactical dice sounds without external assets.
 */

class ProceduralSoundEngine {
  constructor() {
    this.ctx = null;
    this.currentTrack = null;
    this.gainNode = null;
    this.isMuted = true;
    this.activeNodes = [];
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(muted ? 0 : 0.25, this.ctx.currentTime, 0.1);
    }
    if (!muted && !this.currentTrack) {
      this.playAmbience('ambient-fire');
    }
  }

  stopAmbience() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.currentTrack = null;
  }

  playAmbience(type) {
    this.initContext();
    if (!this.ctx) return;
    this.stopAmbience();
    this.currentTrack = type;

    if (this.isMuted) return;

    switch (type) {
      case 'ambient-fire':
      case 'fire':
        this.createFireAmbience();
        break;
      case 'ambient-frost':
      case 'frost':
      case 'water':
        this.createFrostAmbience();
        break;
      case 'ambient-earth':
      case 'earth':
        this.createEarthAmbience();
        break;
      case 'ambient-monastery':
      case 'monastery':
      case 'air':
        this.createMonasteryAmbience();
        break;
      case 'ambient-forest':
      case 'forest':
        this.createForestAmbience();
        break;
      case 'tavern':
        this.createFireAmbience();
        break;
      case 'rain':
        this.createForestAmbience();
        break;
      case 'dungeon':
        this.createEarthAmbience();
        break;
      case 'boss':
        this.createFireAmbience();
        this.createEarthAmbience();
        break;
      case 'none':
        this.stopAmbience();
        break;
      default:
        this.createFireAmbience();
    }
  }

  setVolume(vol = 0.5) {
    this.initContext();
    const clamped = Math.max(0, Math.min(1, Number(vol) || 0));
    if (this.gainNode && this.ctx && !this.isMuted) {
      this.gainNode.gain.setTargetAtTime(clamped * 0.4, this.ctx.currentTime, 0.1);
    }
  }

  playSfx(sfxId) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    if (sfxId === 'sword') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.24);
    } else if (sfxId === 'thunder') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.9);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 1.0);
    } else if (sfxId === 'spell') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.48);
    } else {
      // Fanfare / Chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain); gain.connect(this.gainNode);
      osc.start(now); osc.stop(now + 0.58);
    }
  }

  // Generates brown/pink noise buffer
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    return buffer;
  }

  createFireAmbience() {
    // Low furnace drone + crackling filter
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    noise.start();
    osc.start();
    this.activeNodes.push(noise, filter, osc, oscGain);
  }

  createFrostAmbience() {
    // High howling wind + icy resonance
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    osc.connect(oscGain);
    oscGain.connect(this.gainNode);

    noise.start();
    osc.start();
    this.activeNodes.push(noise, filter, osc, oscGain);
  }

  createEarthAmbience() {
    // Deep sub drone + rhythmic anvil ping simulation
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45, this.ctx.currentTime);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(this.gainNode);
    osc.start();
    this.activeNodes.push(osc, oscGain);
  }

  createMonasteryAmbience() {
    // Singing bowl harmonic drone
    [130.81, 196.00, 261.63, 392.00].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.05 / (i + 1), this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.activeNodes.push(osc, oscGain);
    });
  }

  createForestAmbience() {
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise, filter);
  }

  // Play a tactile dice clatter
  playDiceRoll(isCritical = false) {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();

      click.type = 'triangle';
      click.frequency.setValueAtTime(180 + Math.random() * 240, now + (i * 0.05));
      clickGain.gain.setValueAtTime(0.3, now + (i * 0.05));
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.05) + 0.04);

      click.connect(clickGain);
      clickGain.connect(this.gainNode);

      click.start(now + (i * 0.05));
      click.stop(now + (i * 0.05) + 0.05);
    }

    if (isCritical) {
      setTimeout(() => {
        const chime = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(880, this.ctx.currentTime);
        chimeGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        chime.connect(chimeGain);
        chimeGain.connect(this.gainNode);
        chime.start();
        chime.stop(this.ctx.currentTime + 1.2);
      }, 250);
    }
  }
}

export const soundEngine = new ProceduralSoundEngine();
