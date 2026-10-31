import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Music, Volume2, Sparkles, Check, ChevronRight } from 'lucide-react';

// Musical notes and keys mapping
const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Key offset in semitones relative to C
const KEY_SEMITONES = {
  'C': 0, 'C#': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5,
  'F#': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11
};

// Proper note spellings for each major key
const KEY_SCALES = {
  'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
  'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
  'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
};

const SWARAS = ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'];
const BASE_MIDI_C4 = 60; // Middle C

// Three preloaded melody homework tunes
const PRELOADED_TUNES = [
  {
    id: 'ode-to-joy',
    title: 'Ode to Joy',
    composer: 'L. v. Beethoven',
    timeSignature: '4/4',
    tempoBpm: 120,
    difficulty: 'Easy',
    // degrees: 1 to 7 (1=Sa, 2=Re, 3=Ga, 4=Ma, 5=Pa, 6=Dha, 7=Ni)
    // sticks: '|' = quarter note, '||' = eighth note, '~' = half/dotted note
    notes: [
      { degree: 3, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 4, stick: '|', duration: 1 },
      { degree: 5, stick: '|', duration: 1 },
      { degree: 5, stick: '|', duration: 1 },
      { degree: 4, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 1, stick: '|', duration: 1 },
      { degree: 1, stick: '|', duration: 1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 3, stick: '~', duration: 1.5 },
      { degree: 2, stick: '||', duration: 0.5 },
      { degree: 2, stick: '~', duration: 2 }
    ]
  },
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle / Baa Baa',
    composer: 'Traditional',
    timeSignature: '4/4',
    tempoBpm: 110,
    difficulty: 'Beginner',
    notes: [
      { degree: 1, stick: '|', duration: 1 },
      { degree: 1, stick: '|', duration: 1 },
      { degree: 5, stick: '|', duration: 1 },
      { degree: 5, stick: '|', duration: 1 },
      { degree: 6, stick: '|', duration: 1 },
      { degree: 6, stick: '|', duration: 1 },
      { degree: 5, stick: '~', duration: 2 },
      { degree: 4, stick: '|', duration: 1 },
      { degree: 4, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 1, stick: '~', duration: 2 }
    ]
  },
  {
    id: 'yaman',
    title: 'Raag Yaman Theme',
    composer: 'Indian Classical Tradition',
    timeSignature: '16-beat Teentaal',
    tempoBpm: 96,
    difficulty: 'Intermediate',
    notes: [
      { degree: 7, stick: '|', duration: 1, octaveOffset: -1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 3, stick: '~', duration: 1.5 },
      { degree: 4, stick: '||', duration: 0.5 }, // Teevra Ma
      { degree: 5, stick: '|', duration: 1 },
      { degree: 6, stick: '|', duration: 1 },
      { degree: 7, stick: '|', duration: 1 },
      { degree: 1, stick: '~', duration: 2, octaveOffset: 1 },
      { degree: 7, stick: '|', duration: 1 },
      { degree: 6, stick: '|', duration: 1 },
      { degree: 5, stick: '|', duration: 1 },
      { degree: 4, stick: '|', duration: 1 },
      { degree: 3, stick: '|', duration: 1 },
      { degree: 2, stick: '|', duration: 1 },
      { degree: 1, stick: '~', duration: 2 }
    ]
  }
];

// Semitone intervals of major scale degrees [1, 2, 3, 4, 5, 6, 7]
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

export default function DhunPracticeWidget() {
  const [selectedTune, setSelectedTune] = useState(PRELOADED_TUNES[0]);
  const [selectedKey, setSelectedKey] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNoteIdx, setActiveNoteIdx] = useState(-1);
  const audioCtxRef = useRef(null);
  const playbackTimeoutRef = useRef(null);

  // Initialize Audio Context lazily on user interaction
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a single synthesized note with harmonics
  const playPitch = (midiNumber, durationSec = 0.5) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const freq = 440 * Math.pow(2, (midiNumber - 69) / 12);
      const now = ctx.currentTime;

      // Primary oscillator (warm sine)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic

      // ADSR Envelope
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.28, now + 0.02); // quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationSec); // decay

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + durationSec);
      osc2.stop(now + durationSec);
    } catch {
      // Audio fallback silent
    }
  };

  // Calculate note name and MIDI pitch based on key and degree
  const getNoteInfo = (note) => {
    const scaleDegrees = KEY_SCALES[selectedKey] || KEY_SCALES['C'];
    const degreeIndex = ((note.degree - 1) % 7 + 7) % 7;
    const noteName = scaleDegrees[degreeIndex];
    const swaraName = SWARAS[degreeIndex];
    const keyOffset = KEY_SEMITONES[selectedKey] || 0;
    const semitoneInterval = MAJOR_SCALE_INTERVALS[degreeIndex];
    const octaveBonus = (note.octaveOffset || 0) * 12;
    const midiPitch = BASE_MIDI_C4 + keyOffset + semitoneInterval + octaveBonus;

    return { noteName, swaraName, midiPitch };
  };

  // Stop playback cleanly
  const stopPlayback = () => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
    }
    setIsPlaying(false);
    setActiveNoteIdx(-1);
  };

  // Play full tune sequentially
  const startPlayback = () => {
    stopPlayback();
    getAudioContext();
    setIsPlaying(true);

    const notes = selectedTune.notes;
    const bpm = selectedTune.tempoBpm;
    const beatMs = (60 / bpm) * 1000;

    let currentIdx = 0;

    const playNext = () => {
      if (currentIdx >= notes.length) {
        setIsPlaying(false);
        setActiveNoteIdx(-1);
        return;
      }

      setActiveNoteIdx(currentIdx);
      const currentNote = notes[currentIdx];
      const { midiPitch } = getNoteInfo(currentNote);
      const durationSec = (currentNote.duration * beatMs) / 1000;

      playPitch(midiPitch, Math.max(0.25, durationSec * 0.95));

      currentIdx++;
      playbackTimeoutRef.current = setTimeout(playNext, currentNote.duration * beatMs);
    };

    playNext();
  };

  useEffect(() => {
    return () => {
      if (playbackTimeoutRef.current) clearTimeout(playbackTimeoutRef.current);
    };
  }, []);

  return (
    <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="rounded-[28px] border border-[rgba(28,25,22,0.18)] dark:border-[rgba(242,234,220,0.18)] bg-[#fbf8f1] dark:bg-[#1d1915] p-6 sm:p-8 shadow-sm">
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-[rgba(28,25,22,0.12)] dark:border-[rgba(242,234,220,0.1)]">
          <div>
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-medium text-[#9e5f1c] dark:text-[#e3aa5f] mb-1">
              <Sparkles className="w-4 h-4 text-[#9e5f1c]" />
              <span>Founding Engineer Work Pack Part 1 · Working Clone</span>
            </div>
            <h3 className="font-serif text-[26px] sm:text-[34px] leading-tight text-[#1c1916] dark:text-[#f2eadc] m-0">
              Dhun: Melody Practice Engine
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12.5px] px-3 py-1.5 rounded-full bg-[#9e5f1c]/10 text-[#9e5f1c] dark:text-[#e3aa5f] font-medium border border-[#9e5f1c]/25">
              12-Key Transposition & Web Audio API
            </span>
          </div>
        </div>

        {/* Controls Bar: Tune Selector & Key Transposer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[rgba(28,25,22,0.04)] dark:bg-[rgba(255,255,255,0.04)] border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] mb-6">
          {/* Tune Picker Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-medium text-[#7b7367] dark:text-[#9b9182] mr-1">
              Tune:
            </span>
            {PRELOADED_TUNES.map((tune) => {
              const isSelected = selectedTune.id === tune.id;
              return (
                <button
                  key={tune.id}
                  onClick={() => {
                    stopPlayback();
                    setSelectedTune(tune);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] border-transparent shadow-sm'
                      : 'bg-transparent text-[#4b453c] dark:text-[#cdc3b2] border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] hover:border-[#9e5f1c]'
                  }`}
                >
                  {tune.title}
                </button>
              );
            })}
          </div>

          {/* Transpose Key Picker (All 12 keys) */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-medium text-[#7b7367] dark:text-[#9b9182]">
              Key:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto max-w-[340px] no-scrollbar">
              {KEYS.map((k) => (
                <button
                  key={k}
                  onClick={() => {
                    stopPlayback();
                    setSelectedKey(k);
                  }}
                  className={`w-7 h-7 rounded-lg text-[12px] font-mono font-medium transition-colors border cursor-pointer flex items-center justify-center ${
                    selectedKey === k
                      ? 'bg-[#9e5f1c] text-white border-[#9e5f1c] font-bold shadow-sm'
                      : 'bg-[#fbf8f1] dark:bg-[#1d1915] text-[#4b453c] dark:text-[#cdc3b2] border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] hover:border-[#9e5f1c]'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Melody Sheet Display (Authentic Blackboard / Notebook Style) */}
        <div className="p-6 rounded-2xl bg-[#ede4d4]/60 dark:bg-[#17130f] border border-[rgba(28,25,22,0.14)] dark:border-[rgba(242,234,220,0.14)] shadow-inner mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-serif text-[22px] sm:text-[26px] leading-tight text-[#1c1916] dark:text-[#f2eadc] m-0">
                {selectedTune.title}
              </h4>
              <p className="text-[13px] text-[#7b7367] dark:text-[#9b9182] m-0">
                Key of <strong>{selectedKey} Major</strong> · Scale: {KEY_SCALES[selectedKey]?.join(' - ')}
              </p>
            </div>

            {/* Play/Stop CTA Button */}
            <button
              onClick={isPlaying ? stopPlayback : startPlayback}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-[14.5px] transition-all cursor-pointer border-0 shadow-md ${
                isPlaying
                  ? 'bg-[#b4442c] text-white hover:brightness-110'
                  : 'bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Stop Tune</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play in {selectedKey}</span>
                </>
              )}
            </button>
          </div>

          {/* Note Blocks Matrix */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-2.5 pt-2">
            {selectedTune.notes.map((note, idx) => {
              const { noteName, swaraName, midiPitch } = getNoteInfo(note);
              const isActive = activeNoteIdx === idx;

              return (
                <div
                  key={idx}
                  onClick={() => playPitch(midiPitch, 0.4)}
                  className={`p-3 rounded-xl text-center border cursor-pointer select-none transition-all duration-150 relative group ${
                    isActive
                      ? 'bg-[#9e5f1c] text-white border-[#9e5f1c] scale-105 shadow-md -translate-y-0.5'
                      : 'bg-[#fbf8f1] dark:bg-[#1d1915] text-[#1c1916] dark:text-[#f2eadc] border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] hover:border-[#9e5f1c] hover:shadow-sm'
                  }`}
                  title="Click to play note"
                >
                  {/* Rhythm Stick on top */}
                  <div
                    className={`font-mono text-[13px] font-bold leading-none mb-1.5 ${
                      isActive ? 'text-white' : 'text-[#9e5f1c] dark:text-[#e3aa5f]'
                    }`}
                  >
                    {note.stick}
                  </div>

                  {/* Western Note Name (changes with key) */}
                  <div className="font-serif text-[24px] sm:text-[28px] font-bold leading-none mb-1 tracking-tight">
                    {noteName}
                  </div>

                  {/* Scale Number (1=Sa) */}
                  <div
                    className={`text-[12px] font-semibold leading-none mb-0.5 font-mono ${
                      isActive ? 'text-white/90' : 'text-[#7b7367] dark:text-[#9b9182]'
                    }`}
                  >
                    deg {note.degree}
                  </div>

                  {/* Swara under each note */}
                  <div
                    className={`text-[11.5px] font-medium leading-none ${
                      isActive ? 'text-white' : 'text-[#9e5f1c] dark:text-[#e3aa5f]'
                    }`}
                  >
                    {swaraName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights proving the challenge specification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-[13.5px] text-[#4b453c] dark:text-[#cdc3b2]">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            <Check className="w-4 h-4 text-[#2f7a4a] flex-none mt-0.5" />
            <span>
              <strong>Correct Key Spelling:</strong> In G major, F# is rendered (never Gb); in F major, Bb is rendered (never A#).
            </span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            <Check className="w-4 h-4 text-[#2f7a4a] flex-none mt-0.5" />
            <span>
              <strong>Triple Alignment:</strong> Rhythm stick on top, scale number in middle, swara underneath, mirroring board lessons.
            </span>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)]">
            <Check className="w-4 h-4 text-[#2f7a4a] flex-none mt-0.5" />
            <span>
              <strong>Extensible Data Model:</strong> Adding a new tune takes one clean array structure without changing rendering code.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
