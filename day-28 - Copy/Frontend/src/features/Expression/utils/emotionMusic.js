// Emotion-based sound system using Web Audio API
// Generates beeps and tones without needing external files

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
    console.log("🔊 AudioContext created:", audioContext.state);
  }
  
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      console.log("🔊 AudioContext resumed");
    }).catch(err => {
      console.error("🔊 Failed to resume AudioContext:", err);
    });
  }
  
  return audioContext;
};

const emotionSounds = {
  happy: {
    title: "Happy",
    color: "#FFD700",
    play: () => playHappySound()
  },
  sad: {
    title: "Sad",
    color: "#4A90E2",
    play: () => playSadSound()
  },
  surprised: {
    title: "Surprised",
    color: "#E74C3C",
    play: () => playSurpriseSound()
  },
  turkey: {
    title: "Turkey",
    color: "#D2691E",
    play: () => playTurkeySound()
  },
  turkish: {
    title: "Turkish",
    color: "#C60C30",
    play: () => playTurkishSound()
  },
  neutral: {
    title: "Neutral",
    color: "#95A5A6",
    play: () => {} // No sound for neutral
  }
};

// Happy sound - upbeat full melody (cheerful song)
const playHappySound = () => {
  console.log("😊 Playing HAPPY full song");
  const ctx = initAudioContext();
  const now = ctx.currentTime;
  
  try {
    // Happy melody - Major scale progression (Twinkle Twinkle style)
    const notes = [
      { freq: 262, duration: 0.3 }, // C
      { freq: 262, duration: 0.3 }, // C
      { freq: 392, duration: 0.3 }, // G
      { freq: 392, duration: 0.3 }, // G
      { freq: 440, duration: 0.3 }, // A
      { freq: 440, duration: 0.3 }, // A
      { freq: 392, duration: 0.4 }, // G
      { freq: 349, duration: 0.3 }, // F
      { freq: 349, duration: 0.3 }, // F
      { freq: 330, duration: 0.3 }, // E
      { freq: 330, duration: 0.3 }, // E
      { freq: 294, duration: 0.3 }, // D
      { freq: 294, duration: 0.3 }, // D
      { freq: 262, duration: 0.5 }, // C (longer)
      // Second verse - higher
      { freq: 330, duration: 0.3 }, // E
      { freq: 392, duration: 0.3 }, // G
      { freq: 523, duration: 0.3 }, // C high
      { freq: 587, duration: 0.3 }, // D
      { freq: 659, duration: 0.4 }, // E (longer)
      { freq: 523, duration: 0.3 }, // C
      { freq: 392, duration: 0.3 }, // G
      { freq: 330, duration: 0.3 }, // E
      { freq: 262, duration: 0.5 }, // C (final)
    ];

    let startTime = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, startTime);
      gain.gain.setValueAtTime(0.6, startTime);
      gain.gain.exponentialRampToValueAtTime(0.02, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      startTime += note.duration;
    });

    console.log("✓ Happy song playing - duration: ~7 seconds");
  } catch (error) {
    console.error("✗ Happy sound error:", error);
  }
};

// Sad sound - melancholic full melody (sorrowful song)
const playSadSound = () => {
  console.log("😢 Playing SAD full song");
  const ctx = initAudioContext();
  const now = ctx.currentTime;

  try {
    // Sad melody - Minor key with emotional progression
    const notes = [
      { freq: 220, duration: 0.5 },  // A
      { freq: 196, duration: 0.4 },  // G
      { freq: 175, duration: 0.4 },  // F
      { freq: 165, duration: 0.5 },  // E
      { freq: 147, duration: 0.5 },  // D (lowest point)
      // Middle section
      { freq: 165, duration: 0.3 },  // E
      { freq: 175, duration: 0.3 },  // F
      { freq: 196, duration: 0.4 },  // G
      { freq: 220, duration: 0.5 },  // A (back up)
      // Descending again
      { freq: 196, duration: 0.3 },  // G
      { freq: 175, duration: 0.3 },  // F
      { freq: 165, duration: 0.4 },  // E
      { freq: 147, duration: 0.4 },  // D
      { freq: 131, duration: 0.5 },  // C (very low)
      // Final resolution
      { freq: 147, duration: 0.4 },  // D
      { freq: 165, duration: 0.4 },  // E
      { freq: 175, duration: 0.5 },  // F
      { freq: 165, duration: 0.4 },  // E
      { freq: 147, duration: 0.6 },  // D (final note, held longer)
    ];

    let startTime = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, startTime);
      gain.gain.setValueAtTime(0.6, startTime);
      gain.gain.exponentialRampToValueAtTime(0.02, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      startTime += note.duration;
    });

    console.log("✓ Sad song playing - duration: ~8 seconds");
  } catch (error) {
    console.error("✗ Sad sound error:", error);
  }
};

// Surprise sound - dramatic full melody (startled song)
const playSurpriseSound = () => {
  console.log("😲 Playing SURPRISE full song");
  const ctx = initAudioContext();
  const now = ctx.currentTime;

  try {
    // Surprise melody - Dynamic and dramatic
    const notes = [
      { freq: 523, duration: 0.15 }, // C (quick start)
      { freq: 659, duration: 0.15 }, // E
      { freq: 784, duration: 0.15 }, // G
      { freq: 1047, duration: 0.4 }, // C high (SURPRISE!)
      { freq: 880, duration: 0.2 },  // A (high)
      { freq: 784, duration: 0.2 },  // G
      { freq: 659, duration: 0.2 },  // E
      { freq: 523, duration: 0.3 },  // C
      // Middle section - repetition with variation
      { freq: 784, duration: 0.15 }, // G
      { freq: 880, duration: 0.15 }, // A
      { freq: 1047, duration: 0.15 }, // C high
      { freq: 1176, duration: 0.3 }, // D high (peak!)
      { freq: 880, duration: 0.2 },  // A
      { freq: 784, duration: 0.2 },  // G
      { freq: 659, duration: 0.2 },  // E
      { freq: 523, duration: 0.2 },  // C
      // Final descent
      { freq: 392, duration: 0.2 },  // G lower
      { freq: 330, duration: 0.2 },  // E lower
      { freq: 262, duration: 0.3 },  // C lower
      { freq: 440, duration: 0.4 },  // A (resolution)
    ];

    let startTime = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, startTime);
      gain.gain.setValueAtTime(0.6, startTime);
      gain.gain.exponentialRampToValueAtTime(0.02, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      startTime += note.duration;
    });

    console.log("✓ Surprise song playing - duration: ~4.5 seconds");
  } catch (error) {
    console.error("✗ Surprise sound error:", error);
  }
};

// Turkey sound - silly gobble song (fun easter egg!)
const playTurkeySound = () => {
  console.log("🦃 Playing TURKEY silly song");
  const ctx = initAudioContext();
  const now = ctx.currentTime;

  try {
    // Turkey gobble song - funny and quirky!
    const notes = [
      { freq: 180, duration: 0.15 }, // Low start (gobble)
      { freq: 220, duration: 0.1 },
      { freq: 200, duration: 0.15 }, // Wobble
      { freq: 180, duration: 0.1 },
      { freq: 240, duration: 0.2 },  // Higher gobble
      // Gobble gobble section
      { freq: 180, duration: 0.12 }, // Gobble
      { freq: 220, duration: 0.12 }, // Gobble
      { freq: 200, duration: 0.12 }, // Gobble
      { freq: 260, duration: 0.15 },
      // Excited wobble
      { freq: 300, duration: 0.1 },
      { freq: 280, duration: 0.1 },
      { freq: 260, duration: 0.1 },
      { freq: 240, duration: 0.1 },
      { freq: 220, duration: 0.1 },
      // Final gobble gobble gobble
      { freq: 200, duration: 0.15 },
      { freq: 180, duration: 0.12 },
      { freq: 200, duration: 0.12 },
      { freq: 220, duration: 0.15 },
      { freq: 180, duration: 0.3 },  // Final deep gobble
    ];

    let startTime = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth"; // Rough, quirky turkey sound
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, startTime);
      gain.gain.setValueAtTime(0.5, startTime);
      gain.gain.exponentialRampToValueAtTime(0.02, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      startTime += note.duration;
    });

    console.log("✓ Turkey song playing - Gobble gobble! ~2.5 seconds");
  } catch (error) {
    console.error("✗ Turkey sound error:", error);
  }
};

// Turkish music - Beautiful traditional Turkish folk melody
const playTurkishSound = () => {
  console.log("🇹🇷 Playing TURKISH folk music");
  const ctx = initAudioContext();
  const now = ctx.currentTime;

  try {
    // Turkish folk melody - inspired by Tarkan, Barış Manço style
    // Using traditional Turkish musical elements
    // Songs: Şımarık, Gülpembe, Neredesin Sen, etc.
    const notes = [
      // Opening vocals inspired section
      { freq: 294, duration: 0.4 },  // D
      { freq: 330, duration: 0.3 },  // E
      { freq: 349, duration: 0.3 },  // F
      { freq: 392, duration: 0.4 },  // G
      { freq: 440, duration: 0.5 },  // A
      { freq: 494, duration: 0.4 },  // B
      // Middle section - descending
      { freq: 440, duration: 0.3 },  // A
      { freq: 392, duration: 0.3 },  // G
      { freq: 349, duration: 0.35 }, // F
      { freq: 330, duration: 0.35 }, // E
      // Turkish style ornament
      { freq: 349, duration: 0.2 },  // F (ornament up)
      { freq: 330, duration: 0.2 },  // E (ornament)
      { freq: 294, duration: 0.4 },  // D (back down)
      // Bridge section - more expressive
      { freq: 392, duration: 0.3 },  // G
      { freq: 440, duration: 0.3 },  // A
      { freq: 494, duration: 0.3 },  // B
      { freq: 523, duration: 0.5 },  // C (high)
      { freq: 587, duration: 0.4 },  // D (higher)
      // Descending finale inspired by Turkish ballads
      { freq: 523, duration: 0.3 },  // C
      { freq: 494, duration: 0.3 },  // B
      { freq: 440, duration: 0.3 },  // A
      { freq: 392, duration: 0.3 },  // G
      { freq: 349, duration: 0.4 },  // F
      { freq: 330, duration: 0.4 },  // E
      { freq: 294, duration: 0.6 },  // D (final note - held)
    ];

    let startTime = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine"; // Smooth, soulful Turkish voice-like tone
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, startTime);
      gain.gain.setValueAtTime(0.7, startTime);
      gain.gain.exponentialRampToValueAtTime(0.02, startTime + note.duration);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      startTime += note.duration;
    });

    console.log("✓ Turkish music playing - Inspired by Kusura Bakma, Şımarık, Gülpembe, Neredesin Sen, and more! ~9 seconds");
  } catch (error) {
    console.error("✗ Turkish sound error:", error);
  }
};

// Play emotion sound
export const playEmotionMusic = (emotion) => {
  console.log(`🎵 playEmotionMusic called with emotion: "${emotion}"`);
  
  try {
    const sound = emotionSounds[emotion];
    
    if (!sound) {
      console.warn(`⚠️ No sound found for emotion: "${emotion}"`);
      return;
    }
    
    const ctx = initAudioContext();
    console.log(`🔊 AudioContext state: ${ctx.state}`);
    
    if (sound.play) {
      console.log(`▶️ Playing ${sound.title} sound...`);
      sound.play();
    }
  } catch (error) {
    console.error("✗ Error playing audio:", error);
  }
};

// Get emotion info
export const getEmotionInfo = (emotion) => {
  return emotionSounds[emotion] || emotionSounds.neutral;
};

// Get all emotions
export const getAllEmotions = () => {
  return Object.keys(emotionSounds);
};

