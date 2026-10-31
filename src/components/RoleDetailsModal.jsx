import React, { useEffect } from 'react';
import { X, ArrowRight, MapPin, Calendar, Clock, DollarSign, Sparkles } from 'lucide-react';

export default function RoleDetailsModal({ role, onClose, onOpenWorkPack }) {
  // Escape key listener and body scroll lock
  useEffect(() => {
    if (!role) return;
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
  }, [role, onClose]);

  if (!role) return null;

  const isTechRole = role.category !== 'school' || role.packSlug;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#f5efe4] dark:bg-[#14110e] text-[#1c1916] dark:text-[#f2eadc] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black flex-none">
          <img
            src={role.image}
            alt={role.title}
            className="w-full h-full object-cover opacity-85"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border-0 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute left-6 bottom-4 flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-[#fbf8f1] dark:bg-[#1d1915] text-[20px] flex items-center justify-center shadow">
              {role.emoji}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 text-white text-[12px] uppercase tracking-wider font-semibold">
              {role.roleNum || (role.category === 'school' ? 'School Operations' : 'Tech Role')}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-[32px] sm:text-[42px] leading-tight text-[#1c1916] dark:text-[#f2eadc] mb-3">
              {role.title}
            </h2>
            <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2]">
              {role.headline || role.subtitle}
            </p>
          </div>

          {/* Quick Specs Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#ede4d4] dark:bg-[#1b1713] text-[13.5px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none" />
              <span>Langford Town, BLR</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none" />
              <span>Mon to Sat</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none" />
              <span>9 am to 5 pm</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none" />
              <span>In Person Studio</span>
            </div>
          </div>

          {/* Details / What you will build */}
          {role.highlights && (
            <div className="space-y-3">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                What you will build & run
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] pl-5 list-disc marker:text-[#9e5f1c]">
                {role.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key responsibilities */}
          {role.responsibilities && (
            <div className="space-y-3">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                Key Responsibilities
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] pl-5 list-disc marker:text-[#9e5f1c]">
                {role.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Typical Day Timeline */}
          {role.typicalDay && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                A typical day might look like this
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {role.typicalDay.map((slot, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[rgba(28,25,22,0.02)] dark:bg-[rgba(255,255,255,0.02)] text-[14px]"
                  >
                    <b className="text-[#9e5f1c] dark:text-[#e3aa5f] font-mono mr-2">{slot.time}</b>
                    <span className="text-[#4b453c] dark:text-[#cdc3b2]">{slot.task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills and Qualities */}
          {role.skills && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                Skills and qualities we look for
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] pl-5 list-disc marker:text-[#9e5f1c]">
                {role.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* What You'll Learn */}
          {role.whatYouLearn && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                What you'll learn
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] pl-5 list-disc marker:text-[#2f7a4a]">
                {role.whatYouLearn.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* First 90 Days */}
          {role.first90Days && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-[24px] text-[#1c1916] dark:text-[#f2eadc] m-0">
                Your first 90 days
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {role.first90Days.map((d, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#ede4d4]/60 dark:bg-[#1b1713]"
                  >
                    <span className="text-[12px] uppercase font-mono font-bold text-[#9e5f1c] dark:text-[#e3aa5f] block mb-1">
                      {d.month}
                    </span>
                    <b className="block text-[15px] text-[#1c1916] dark:text-[#f2eadc] mb-1">
                      {d.title}
                    </b>
                    <span className="text-[13px] leading-relaxed text-[#4b453c] dark:text-[#cdc3b2]">
                      {d.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Gallery if Founding Engineer */}
          {role.id === 'founding-engineer' && (
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-[22px] m-0">Projects you'll touch daily</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#fbf8f1] dark:bg-[#1d1915]">
                  <img src="/images/shot-dhun-tune.jpg" alt="Dhun App" className="w-full aspect-[4/3] object-cover" />
                  <p className="p-2 text-[12px] font-medium text-[#7b7367] dark:text-[#9b9182] text-center m-0">
                    Dhun: Melody Homework
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#fbf8f1] dark:bg-[#1d1915]">
                  <img src="/images/shot-portal.jpg" alt="Learning Portal" className="w-full aspect-[4/3] object-cover" />
                  <p className="p-2 text-[12px] font-medium text-[#7b7367] dark:text-[#9b9182] text-center m-0">
                    Student & Fee Portal
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden border border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#fbf8f1] dark:bg-[#1d1915]">
                  <img src="/images/shot-labs.jpg" alt="Nathaniel Labs" className="w-full aspect-[4/3] object-cover" />
                  <p className="p-2 text-[12px] font-medium text-[#7b7367] dark:text-[#9b9182] text-center m-0">
                    Nathaniel Labs (Mac Apps)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms & compensation */}
          <div className="p-4 rounded-xl border border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] text-[14.5px] text-[#4b453c] dark:text-[#cdc3b2]">
            <p className="m-0 mb-1">
              <strong>Terms:</strong> {role.terms}
            </p>
            <p className="m-0">
              <strong>Pay:</strong> {role.pay}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(28,25,22,0.12)] dark:border-[rgba(242,234,220,0.1)]">
            <button
              onClick={onClose}
              className="text-[15px] font-medium text-[#7b7367] dark:text-[#9b9182] hover:text-[#1c1916] dark:hover:text-[#f2eadc] bg-transparent border-0 cursor-pointer"
            >
              Close
            </button>

            {isTechRole ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenWorkPack(role.id);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] text-[15px] font-medium hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer border-0 shadow-md"
              >
                <span>Open Work Pack</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href={`https://wa.me/919561686658?text=${encodeURIComponent(
                  `Hi Rushikesh! I am applying for the ${role.title} role at Nathaniel School of Music.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c7e46] hover:bg-[#166e3c] text-white text-[15px] font-medium transition-all shadow-md"
              >
                <span>Apply via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
