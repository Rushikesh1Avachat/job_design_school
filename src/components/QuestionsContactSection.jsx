import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function QuestionsContactSection() {
  const email = 'avachatrushikesh45@gmail.com';
  const phone = '9561686658';
  const formattedPhone = '+91 95616 86658';

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent('Application for Tech Role - Nathaniel School of Music')}&body=${encodeURIComponent(
    'Hi,\n\nI am reaching out regarding the tech roles at Nathaniel School of Music.\n\nBest regards,'
  )}`;

  const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(
    'Hi! Reaching out regarding Nathaniel School of Music tech roles.'
  )}`;

  const handleOpenGmail = (e) => {
    e.preventDefault();
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWhatsApp = (e) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="border-t border-[rgba(28,25,22,0.13)] bg-[#ede4d4] py-10 text-[#1c1916] sm:py-14 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-[760px]">
            <h2
              className="m-0 font-serif font-normal leading-[0.95] tracking-[-0.04em] text-[#1c1916]"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 'clamp(3rem, 5vw, 7rem)',
              }}
            >
              Questions? Talk to us.
            </h2>

            <p             className="m-0 mt-4 text-[1.05rem] sm:text-[1.2rem] leading-[1.5] text-[#4b453c]">
              We&apos;re happy to hear from students and placement officers alike.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[1rem] sm:text-[1.1rem] text-[#1c1916]">
              <a
                href={gmailUrl}
                onClick={handleOpenGmail}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal text-[#1c1916] transition-opacity hover:opacity-80"
              >
                {email}
              </a>

              <span className="hidden sm:inline-block h-5 w-px bg-[rgba(28,25,22,0.25)]" aria-hidden="true" />

              <a
                href={whatsappUrl}
                onClick={handleOpenWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-normal text-[#1c1916] transition-opacity hover:opacity-80"
              >
                WhatsApp {formattedPhone}
              </a>
            </div>
          </div>

          <div className="flex w-full max-w-[580px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <a
              href="mailto:music@nathanielschool.com?subject=Application"
              className="btn inline-flex h-[72px] min-w-[300px] items-center justify-center gap-3 rounded-full bg-[#1c1916] px-7 text-[1.08rem] font-medium text-[#f5efe4] no-underline transition-transform duration-200 hover:-translate-y-0.5"
              aria-label="Email your CV"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-none stroke-[#f5efe4] stroke-[1.7]"
              >
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m4 7 8 6 8-6"></path>
              </svg>
              <span>Email your CV</span>
            </a>

            <a
              href={whatsappUrl}
              onClick={handleOpenWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[72px] min-w-[300px] items-center justify-center gap-3 rounded-full bg-[#0f8d5a] px-7 text-[1.08rem] font-medium text-white shadow-[0_12px_24px_rgba(15,141,90,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5 shrink-0 stroke-[2.2]" />
              <span className="leading-none">WhatsApp us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
