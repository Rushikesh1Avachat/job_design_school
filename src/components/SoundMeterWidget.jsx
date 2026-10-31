import React, { useState, useEffect } from 'react';
import { Volume2, Radio, DoorClosed, AlertTriangle, CheckCircle, Flame } from 'lucide-react';

export default function SoundMeterWidget() {
  const [dbLevel, setDbLevel] = useState(38);
  const [isRecording, setIsRecording] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [autoSimulate, setAutoSimulate] = useState(false);

  // Background ambient noise simulation
  useEffect(() => {
    if (!autoSimulate) return;
    const interval = setInterval(() => {
      setDbLevel((prev) => {
        const delta = (Math.random() - 0.48) * 6;
        return Math.max(30, Math.min(85, Math.round(prev + delta)));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [autoSimulate]);

  // Determine LED status based on spec
  // Baseline threshold = 42 dBA
  let ledState = 'green';
  let statusText = 'Room Ready (Quiet)';
  let statusColor = 'text-[#2f7a4a] dark:text-[#93d3a2]';
  let badgeBg = 'bg-[#2f7a4a]/10 border-[#2f7a4a]/30';

  if (isDoorOpen) {
    ledState = 'amber';
    statusText = 'Door Ajar · Recording Paused';
    statusColor = 'text-[#b4442c] dark:text-[#ff9d88]';
    badgeBg = 'bg-[#b4442c]/10 border-[#b4442c]/30';
  } else if (isRecording) {
    if (dbLevel > 44) {
      ledState = 'pulse-red';
      statusText = 'Take Live · Ambient Spikes Above 42 dBA!';
      statusColor = 'text-[#b4442c] dark:text-[#ff9d88]';
      badgeBg = 'bg-[#b4442c]/15 border-[#b4442c]/40';
    } else {
      ledState = 'red';
      statusText = 'Live Take In Progress (Quiet)';
      statusColor = 'text-[#b4442c] dark:text-[#ff9d88]';
      badgeBg = 'bg-[#b4442c]/10 border-[#b4442c]/30';
    }
  } else if (dbLevel > 42) {
    ledState = 'amber';
    statusText = 'Room Too Loud (> 42 dBA threshold)';
    statusColor = 'text-[#a87a12] dark:text-[#f1cf7f]';
    badgeBg = 'bg-[#a87a12]/10 border-[#a87a12]/30';
  }

  return (
    <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="rounded-[28px] border border-[rgba(28,25,22,0.18)] dark:border-[rgba(242,234,220,0.18)] bg-[#fbf8f1] dark:bg-[#1d1915] p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-[rgba(28,25,22,0.12)] dark:border-[rgba(242,234,220,0.1)]">
          <div>
            <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-medium text-[#9e5f1c] dark:text-[#e3aa5f] mb-1">
              <Radio className="w-4 h-4 animate-pulse text-[#9e5f1c]" />
              <span>Interactive Studio IoT Simulator</span>
            </div>
            <h3 className="font-serif text-[26px] sm:text-[32px] leading-tight text-[#1c1916] dark:text-[#f2eadc] m-0">
              ESP32 Studio Sensing Layer
            </h3>
          </div>

          {/* Quick status pill */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[13px] font-medium ${badgeBg} ${statusColor}`}>
            {ledState === 'green' && <CheckCircle className="w-4 h-4" />}
            {(ledState === 'amber' || ledState === 'pulse-red') && <AlertTriangle className="w-4 h-4" />}
            {ledState === 'red' && <Flame className="w-4 h-4" />}
            <span>{statusText}</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Live Sound Meter */}
          <div className="p-5 rounded-2xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] uppercase tracking-wider text-[#7b7367] dark:text-[#9b9182] font-medium">
                  SEN0232 Sound Level
                </span>
                <Volume2 className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f]" />
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[48px] leading-none text-[#1c1916] dark:text-[#f2eadc]">
                  {dbLevel}
                </span>
                <span className="text-[16px] text-[#7b7367] dark:text-[#9b9182] font-mono">dBA</span>
              </div>
              <p className="text-[12.5px] text-[#7b7367] dark:text-[#9b9182] leading-tight mb-4">
                Target line: ≤ 42 dBA (baseline AC noise in Langford Town control room).
              </p>
            </div>

            {/* Manual Sound Level Slider */}
            <div>
              <input
                type="range"
                min="30"
                max="85"
                value={dbLevel}
                onChange={(e) => {
                  setAutoSimulate(false);
                  setDbLevel(Number(e.target.value));
                }}
                className="w-full accent-[#9e5f1c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#7b7367] dark:text-[#9b9182] mt-1 font-mono">
                <span>30 dBA (Whisper)</span>
                <span className="text-[#9e5f1c] font-semibold">42 dBA (Limit)</span>
                <span>85 dBA (Loud Piano)</span>
              </div>
            </div>
          </div>

          {/* Column 2: WS2812B 60-LED Strip Visualizer */}
          <div className="p-5 rounded-2xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] uppercase tracking-wider text-[#7b7367] dark:text-[#9b9182] font-medium">
                  WS2812B Door Lights
                </span>
                <span className="text-[11px] font-mono text-[#7b7367] dark:text-[#9b9182]">GPIO18</span>
              </div>
              <p className="text-[13px] text-[#4b453c] dark:text-[#cdc3b2] leading-snug mb-4">
                Exterior indicator visible to students outside the recording studio room.
              </p>
            </div>

            {/* LED strip lights simulation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-1.5 p-3 rounded-xl bg-[#14110e] border border-black/40">
                {Array.from({ length: 14 }).map((_, i) => {
                  let ledBg = 'bg-[#2f7a4a] shadow-[0_0_8px_#2f7a4a]';
                  if (ledState === 'amber') {
                    ledBg = 'bg-[#e8b46c] shadow-[0_0_8px_#e8b46c]';
                  } else if (ledState === 'red') {
                    ledBg = 'bg-[#e53e3e] shadow-[0_0_8px_#e53e3e]';
                  } else if (ledState === 'pulse-red') {
                    ledBg = 'bg-[#e53e3e] animate-ping shadow-[0_0_12px_#ff4d4d]';
                  }
                  return (
                    <span
                      key={i}
                      className={`h-4 flex-1 rounded-sm transition-colors duration-300 ${ledBg}`}
                    />
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-[12px] font-mono text-[#7b7367] dark:text-[#9b9182]">
                <span>State: <strong className="capitalize">{ledState.replace('-', ' ')}</strong></span>
                <span>Power: 5V / 74AHCT</span>
              </div>
            </div>
          </div>

          {/* Column 3: Studio Controls & Reed Switch */}
          <div className="p-5 rounded-2xl bg-[rgba(28,25,22,0.03)] dark:bg-[rgba(255,255,255,0.03)] border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] uppercase tracking-wider text-[#7b7367] dark:text-[#9b9182] font-medium">
                  Studio Controls
                </span>
                <DoorClosed className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f]" />
              </div>
              <p className="text-[13px] text-[#4b453c] dark:text-[#cdc3b2] leading-snug mb-4">
                Toggle magnetic door reed switches or simulate recording sessions.
              </p>
            </div>

            <div className="space-y-2">
              {/* Recording Toggle */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-full py-2 px-3 rounded-xl text-[13.5px] font-medium transition-colors border cursor-pointer flex items-center justify-between ${
                  isRecording
                    ? 'bg-[#b4442c] text-white border-[#b4442c]'
                    : 'bg-[#fbf8f1] dark:bg-[#1d1915] text-[#1c1916] dark:text-[#f2eadc] border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)]'
                }`}
              >
                <span>Live Take Recording</span>
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/20">
                  {isRecording ? 'LIVE REC' : 'STANDBY'}
                </span>
              </button>

              {/* Door Switch Toggle */}
              <button
                onClick={() => setIsDoorOpen(!isDoorOpen)}
                className={`w-full py-2 px-3 rounded-xl text-[13.5px] font-medium transition-colors border cursor-pointer flex items-center justify-between ${
                  isDoorOpen
                    ? 'bg-[#a87a12] text-white border-[#a87a12]'
                    : 'bg-[#fbf8f1] dark:bg-[#1d1915] text-[#1c1916] dark:text-[#f2eadc] border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)]'
                }`}
              >
                <span>Studio Door Reed Switch</span>
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/20">
                  {isDoorOpen ? 'OPEN' : 'CLOSED'}
                </span>
              </button>

              {/* Auto Ambient Sim */}
              <button
                onClick={() => setAutoSimulate(!autoSimulate)}
                className={`w-full py-1.5 px-3 rounded-xl text-[12px] font-medium transition-colors border cursor-pointer ${
                  autoSimulate
                    ? 'bg-[#9e5f1c] text-white border-[#9e5f1c]'
                    : 'text-[#7b7367] dark:text-[#9b9182] border-dashed border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)]'
                }`}
              >
                {autoSimulate ? '● Auto Noise Drift On' : '○ Enable Auto Noise Drift'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
