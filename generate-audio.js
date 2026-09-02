import fs from 'fs';
import path from 'path';

// Generate a valid WAV file in pure Node.js
function generateWav(filename, durationSec, sampleRate, noteFreqs) {
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const totalSamples = Math.floor(sampleRate * durationSec);
  const dataSize = totalSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // "fmt " subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // BitsPerSample

  // "data" subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Generate pleasant gentle ambient harp / music box chord progression
  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    // Arpeggiated chord melody
    const noteIndex = Math.floor(t * 3) % noteFreqs.length;
    const freq = noteFreqs[noteIndex];

    // Envelope for each note: attack & exponential decay
    const noteTime = (t * 3) % 1.0;
    const env = Math.exp(-noteTime * 2.8) * Math.min(1.0, noteTime * 20);

    // Fundamental + gentle warm harmonics
    const wave = Math.sin(2 * Math.PI * freq * t) + 
                 0.35 * Math.sin(2 * Math.PI * (freq * 2) * t) +
                 0.15 * Math.sin(2 * Math.PI * (freq * 3) * t);

    // Add gentle background pad
    const pad = 0.25 * (Math.sin(2 * Math.PI * 261.63 * t) + Math.sin(2 * Math.PI * 329.63 * t) + Math.sin(2 * Math.PI * 392.00 * t));

    sample = (wave * env * 0.45 + pad * 0.2);

    // Master envelope (fade in and fade out)
    const masterEnv = Math.min(1, t * 1.5) * Math.min(1, (durationSec - t) * 1.5);
    sample *= masterEnv;

    const intVal = Math.max(-32767, Math.min(32767, Math.floor(sample * 30000)));

    // Stereo channels (Left / Right with subtle phase shift)
    buffer.writeInt16LE(intVal, offset);
    buffer.writeInt16LE(Math.floor(intVal * 0.92), offset + 2);
    offset += 4;
  }

  fs.writeFileSync(filename, buffer);
  console.log(`Generated ${filename} (${durationSec}s)`);
}

// Generate celebration melody: C major / A minor magical pentatonic chords (A4, C5, D5, E5, G5, A5, C6)
const musicPath = path.join(process.cwd(), 'public', 'assets', 'music');
if (!fs.existsSync(musicPath)) fs.mkdirSync(musicPath, { recursive: true });

// Background music track (12 seconds looping)
generateWav(
  path.join(musicPath, 'celebration-melody.wav'),
  12,
  22050,
  [440.0, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25]
);

// Success checkin chime
generateWav(
  path.join(musicPath, 'checkin-success.wav'),
  0.8,
  22050,
  [523.25, 659.25, 783.99, 1046.50]
);
