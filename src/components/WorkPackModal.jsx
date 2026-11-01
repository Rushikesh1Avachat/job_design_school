import React, { useState, useEffect } from 'react';
import { X, Check, Upload, ExternalLink, ChevronDown, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { techRoles } from '../data/rolesData';

export default function WorkPackModal({ roleId, onClose }) {
  const role = techRoles.find((r) => r.id === roleId) || techRoles[0];

  const workPackDetails = role?.workPackDetails ?? {
    headline: role?.headline || `${role?.title || 'Role'} work pack`,
    intro: role?.description || 'Show us how you think, build and ship.',
    parts: [1, 2, 3, 4].map((num, index) => ({
      num,
      title: `Challenge ${num}`,
      duration: '5-10 min',
      linkPlaceholder: 'https://github.com/your-project',
      description: role?.workPackChallenges?.[index]
        ? `Tell us how you would approach and deliver: ${role.workPackChallenges[index]}.`
        : `Share a concise explanation of your approach for part ${num}.`,
      deliverables: 'Share a short screen-recording or voice-note walkthrough and a live link or repository.',
      prompts: [
        'Explain the problem and your approach.',
        'Show the key decisions you made and why.',
        'Call out anything you would improve next.'
      ]
    }))
  };

  const [openPart, setOpenPart] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    links: { 1: '', 2: '', 3: '', 4: '' },
    files: { 1: null, 2: null, 3: null, 4: null }
  });
  const [uploadProgress, setUploadProgress] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const [isUploading, setIsUploading] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Count how many parts have either a file or a valid link
  const partsCompletedCount = [1, 2, 3, 4].filter(
    (n) => (formData.files[n] || uploadProgress[n] === 100) && formData.links[n].trim() !== ''
  ).length;

  // Handle fake file upload with smooth progress
  const handleFileSelect = (partNum, file) => {
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      files: { ...prev.files, [partNum]: file.name }
    }));
    setIsUploading((prev) => ({ ...prev, [partNum]: true }));
    setUploadProgress((prev) => ({ ...prev, [partNum]: 10 }));

    let current = 10;
    const interval = setInterval(() => {
      current += 25;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress((prev) => ({ ...prev, [partNum]: 100 }));
        setIsUploading((prev) => ({ ...prev, [partNum]: false }));
      } else {
        setUploadProgress((prev) => ({ ...prev, [partNum]: current }));
      }
    }, 150);
  };

  const handleLinkChange = (partNum, val) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [partNum]: val }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp phone number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Jason / Nathaniel Team! I'm ${formData.name}. I have just completed and submitted my ${role.title} work pack.`
  );
  // Escape key listener and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#f5efe4] dark:bg-[#14110e] text-[#1c1916] dark:text-[#f2eadc] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Sticky Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#ede4d4] dark:bg-[#1b1713] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[22px]">{role.emoji}</span>
            <div>
              <span className="text-[12px] uppercase tracking-wider font-semibold text-[#9e5f1c] dark:text-[#e3aa5f] block">
                {role.roleNum}
              </span>
              <h2 className="font-serif text-[22px] sm:text-[26px] leading-none m-0 text-[#1c1916] dark:text-[#f2eadc]">
                {role.title} Work Pack
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors border-0 bg-transparent cursor-pointer text-inherit"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
          {/* Header Banner */}
          <div>
            <h1 className="font-serif text-[36px] sm:text-[48px] leading-[1.05] tracking-tight mb-3">
              {workPackDetails.headline}
            </h1>
            <p className="text-[16.5px] sm:text-[18px] text-[#4b453c] dark:text-[#cdc3b2] leading-[1.6]">
              {workPackDetails.intro} The work pack is the interview. We would rather see what you can build than read a list of skills.
            </p>
          </div>

          {/* Progress Rail (4 segments) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {workPackDetails.parts.map((p) => {
              const isDone = (formData.files[p.num] || uploadProgress[p.num] === 100) && formData.links[p.num];
              const isActive = openPart === p.num;
              return (
                <button
                  key={p.num}
                  onClick={() => setOpenPart(p.num)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isDone
                      ? 'border-[#2f7a4a] bg-[#2f7a4a]/10 text-[#2f7a4a] dark:text-[#93d3a2]'
                      : isActive
                      ? 'border-[#9e5f1c] dark:border-[#e3aa5f] bg-[#fbf8f1] dark:bg-[#1d1915]'
                      : 'border-[rgba(28,25,22,0.12)] dark:border-[rgba(242,234,220,0.12)] bg-[#fbf8f1] dark:bg-[#1d1915]'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-[15px] border ${
                      isDone
                        ? 'bg-[#2f7a4a] text-white border-[#2f7a4a]'
                        : 'border-current text-[#9e5f1c] dark:text-[#e3aa5f]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : p.num}
                  </span>
                  <div className="min-w-0">
                    <b className="block min-w-0 whitespace-normal break-words font-medium text-[13px] leading-[1.35] text-[#1c1916] dark:text-[#f2eadc]">
                      {p.title}
                    </b>
                    <small className="block text-[11px] text-[#7b7367] dark:text-[#9b9182]">
                      {isDone ? '✓ Uploaded' : p.duration}
                    </small>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Accordion List for The Four Parts */}
          <div className="space-y-4">
            <h3 className="font-serif text-[28px] sm:text-[34px] leading-tight mb-2">
              The four parts
            </h3>

            {workPackDetails.parts.map((part) => {
              const isOpen = openPart === part.num;
              return (
                <div
                  key={part.num}
                  className="rounded-2xl border border-[rgba(28,25,22,0.14)] dark:border-[rgba(242,234,220,0.14)] bg-[#fbf8f1] dark:bg-[#1d1915] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenPart(isOpen ? 0 : part.num)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <div>
                      <span className="text-[12px] uppercase tracking-widest font-semibold text-[#9e5f1c] dark:text-[#e3aa5f] block mb-1">
                        Part {part.num} · {part.duration}
                      </span>
                      <h4 className="font-serif text-[22px] sm:text-[26px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                        {part.title}
                      </h4>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? 'rotate-45 bg-black/5 dark:bg-white/5' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-[rgba(28,25,22,0.08)] dark:border-[rgba(242,234,220,0.08)] text-[15.5px] leading-[1.65] text-[#4b453c] dark:text-[#cdc3b2] space-y-4">
                      <p>{part.description}</p>

                      {/* Spec table if present */}
                      {part.spec && (
                        <div className="rounded-xl border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#ede4d4] dark:bg-[#1b1713] overflow-hidden text-[14px]">
                          {part.spec.map((s, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-1 sm:grid-cols-[10em_1fr] gap-2 p-3 border-b border-[rgba(28,25,22,0.08)] dark:border-[rgba(242,234,220,0.08)] last:border-b-0"
                            >
                              <b className="font-medium text-[#1c1916] dark:text-[#f2eadc]">{s.label}</b>
                              <span>{s.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Prompts list */}
                      {part.prompts && (
                        <ol className="list-decimal pl-5 space-y-2 marker:text-[#9e5f1c] dark:marker:text-[#e3aa5f] font-normal">
                          {part.prompts.map((prompt, idx) => (
                            <li key={idx}>{prompt}</li>
                          ))}
                        </ol>
                      )}

                      {/* Tracks if present */}
                      {part.tracks && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {part.tracks.map((t) => (
                            <div
                              key={t.id}
                              className="p-4 rounded-xl border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#ede4d4] dark:bg-[#1b1713]"
                            >
                              <b className="block text-[#9e5f1c] dark:text-[#e3aa5f] font-serif text-[18px] mb-1">
                                Track {t.id}: {t.name}
                              </b>
                              <span className="text-[14px] leading-relaxed">{t.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Callout box for video expectation */}
                      <div className="p-4 rounded-xl bg-[#9e5f1c]/10 border-l-4 border-[#9e5f1c] dark:border-[#e3aa5f] text-[#1c1916] dark:text-[#f2eadc] text-[15px]">
                        <strong>In your video:</strong> {part.deliverables}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submission Form Dock */}
          <div className="mt-12 rounded-[32px] border border-[rgba(28,25,22,0.26)] dark:border-[rgba(242,234,220,0.22)] bg-[#fbf8f1] dark:bg-[#1d1915] p-6 sm:p-8 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Meter top */}
                <div className="pb-5 border-b border-dashed border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-serif text-[26px] sm:text-[32px] m-0">
                      {partsCompletedCount} of 4 parts in
                    </h3>
                    <span className="text-[14px] text-[#7b7367] dark:text-[#9b9182]">
                      Your details first, then one video or voice note for each part.
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-full transition-colors duration-300 ${
                          i <= partsCompletedCount
                            ? 'bg-[#2f7a4a]'
                            : 'bg-[rgba(28,25,22,0.12)] dark:bg-[rgba(242,234,220,0.12)]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h4 className="text-[12.5px] uppercase tracking-widest font-semibold text-[#7b7367] dark:text-[#9b9182] mb-3">
                    Your details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className="block text-[14px] font-medium">
                      <span>Full name *</span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] bg-[#f5efe4] dark:bg-[#14110e] text-inherit focus:outline-none focus:border-[#9e5f1c] text-[15px]"
                      />
                    </label>

                    <label className="block text-[14px] font-medium">
                      <span>WhatsApp number *</span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] bg-[#f5efe4] dark:bg-[#14110e] text-inherit focus:outline-none focus:border-[#9e5f1c] text-[15px]"
                      />
                    </label>

                    <label className="block text-[14px] font-medium">
                      <span>Email <small className="text-[#7b7367] dark:text-[#9b9182]">(optional)</small></span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] bg-[#f5efe4] dark:bg-[#14110e] text-inherit focus:outline-none focus:border-[#9e5f1c] text-[15px]"
                      />
                    </label>
                  </div>
                </div>

                {/* The 4 Part Slots */}
                <div>
                  <h4 className="text-[12.5px] uppercase tracking-widest font-semibold text-[#7b7367] dark:text-[#9b9182] mb-3">
                    Your four parts
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workPackDetails.parts.map((p) => {
                      const isComplete = (formData.files[p.num] || uploadProgress[p.num] === 100) && formData.links[p.num];
                      return (
                        <div
                          key={p.num}
                          className={`p-4 rounded-2xl border transition-all ${
                            isComplete
                              ? 'border-[#2f7a4a] bg-[#2f7a4a]/5'
                              : 'border-dashed border-[rgba(28,25,22,0.22)] dark:border-[rgba(242,234,220,0.22)] bg-[#f5efe4] dark:bg-[#14110e]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-[15px] border ${
                                isComplete
                                  ? 'bg-[#2f7a4a] text-white border-[#2f7a4a]'
                                  : 'border-[#9e5f1c] dark:border-[#e3aa5f] text-[#9e5f1c] dark:text-[#e3aa5f]'
                              }`}
                            >
                              {p.num}
                            </span>
                            <div>
                              <b className="font-serif text-[18px] block leading-tight">{p.title}</b>
                              <span className="text-[12px] text-[#7b7367] dark:text-[#9b9182]">
                                Screen-share video or voice note (5-10 min)
                              </span>
                            </div>
                          </div>

                          {/* File upload button */}
                          <div className="mt-3">
                            <label className="flex items-center justify-center gap-2 py-2 px-3 rounded-full border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] hover:border-[#1c1916] dark:hover:border-[#f2eadc] cursor-pointer text-[13.5px] font-medium bg-black/5 dark:bg-white/5 transition-colors">
                              <Upload className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f]" />
                              <span>{formData.files[p.num] || 'Choose video or voice note'}</span>
                              <input
                                type="file"
                                accept="video/*,audio/*"
                                onChange={(e) => handleFileSelect(p.num, e.target.files[0])}
                                className="hidden"
                              />
                            </label>

                            {/* Progress bar */}
                            {isUploading[p.num] && (
                              <div className="mt-2 h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#9e5f1c] dark:bg-[#e3aa5f] transition-all duration-300"
                                  style={{ width: `${uploadProgress[p.num]}%` }}
                                />
                              </div>
                            )}

                            {uploadProgress[p.num] === 100 && (
                              <span className="text-[12px] text-[#2f7a4a] dark:text-[#93d3a2] flex items-center gap-1 mt-1.5">
                                <Check className="w-3.5 h-3.5" /> Upload complete
                              </span>
                            )}
                          </div>

                          {/* URL input */}
                          <div className="mt-3">
                            <label className="text-[12.5px] font-medium block text-[#4b453c] dark:text-[#cdc3b2] mb-1">
                              Live URL or GitHub repository:
                            </label>
                            <input
                              type="url"
                              value={formData.links[p.num]}
                              onChange={(e) => handleLinkChange(p.num, e.target.value)}
                              placeholder={p.linkPlaceholder}
                              className="w-full px-3 py-2 text-[13.5px] rounded-xl border border-[rgba(28,25,22,0.18)] dark:border-[rgba(242,234,220,0.18)] bg-[#fbf8f1] dark:bg-[#1d1915] text-inherit focus:outline-none focus:border-[#9e5f1c]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-[14px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-none" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Footer Submit Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)]">
                  <p className="text-[14px] text-[#7b7367] dark:text-[#9b9182] max-w-lg m-0">
                    Paste each link before choosing your video so they travel together. Once all four parts are in, your work pack sends itself.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] text-[15.5px] font-medium hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer border-0 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Send my work pack</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success Thanks State */
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2f7a4a]/10 border-2 border-[#2f7a4a] text-[#2f7a4a] dark:text-[#93d3a2] flex items-center justify-center mx-auto text-2xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-[36px] sm:text-[44px] leading-tight m-0">
                  Thank you, {formData.name}!
                </h3>
                <p className="text-[17px] text-[#4b453c] dark:text-[#cdc3b2] max-w-md mx-auto leading-relaxed">
                  Your work pack for <strong>{role.title}</strong> has been received. Our engineering team reviews submissions within 48 hours.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919561686658?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c7e46] hover:bg-[#166e3c] text-white font-medium text-[15px] transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp us to say it's done</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-full border border-[rgba(28,25,22,0.2)] dark:border-[rgba(242,234,220,0.2)] text-[15px] font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-transparent cursor-pointer"
                  >
                    Back to brochure
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
