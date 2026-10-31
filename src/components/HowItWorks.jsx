import React from 'react';

export default function HowItWorks({ onOpenAllJobs }) {
  const steps = [
    {
      title: 'Pick your role',
      desc: 'If both fit, do one pack well rather than two in a hurry.'
    },
    {
      title: 'Do the four parts',
      desc: "About 4 to 5 days. Build what you can, and for anything you can't finish, show us your plan."
    },
    {
      title: 'Explain each part on video',
      desc: 'A screen share with your voice is best. A voice note is the minimum. We are listening for how you think.'
    },
    {
      title: 'Send it on the work pack page',
      desc: "Upload your videos and paste your GitHub and live links. Then WhatsApp us to say it's done."
    },
    {
      title: 'Video call, then the studio',
      desc: 'If your pack is strong, we talk on a video call. The final round is in person with Jason Zac at the studio.'
    }
  ];

  return (
    <section id="how" className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
      <div className="max-w-[700px]">
        <h2 className="font-serif text-[38px] sm:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#1c1916] dark:text-[#f2eadc] mb-4">
          How it works
        </h2>
        <p className="text-[17px] sm:text-[18px] text-[#4b453c] dark:text-[#cdc3b2] leading-[1.6] mb-10">
          The work pack is the interview. We would rather see what you can build than read a list of skills.
        </p>

        {/* Timeline Journey */}
        <ol className="list-none p-0 m-0 space-y-6">
          {steps.map((step, idx) => (
            <li key={idx} className="relative pl-12">
              {/* Number circle */}
              <span className="absolute left-0 top-0.5 w-8 h-8 rounded-full border border-[#9e5f1c] dark:border-[#e3aa5f] text-[#9e5f1c] dark:text-[#e3aa5f] font-serif text-[17px] flex items-center justify-center">
                {idx + 1}
              </span>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-[38px] bottom-[-16px] w-[1px] bg-[rgba(28,25,22,0.18)] dark:bg-[rgba(242,234,220,0.18)]"
                />
              )}

              <div>
                <b className="block font-medium text-[16.5px] text-[#1c1916] dark:text-[#f2eadc] mb-1">
                  {step.title}
                </b>
                <span className="text-[15px] leading-[1.55] text-[#4b453c] dark:text-[#cdc3b2]">
                  {step.desc}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Callout box */}
      <div className="mt-12 p-6 rounded-[20px] border border-dashed border-[rgba(28,25,22,0.25)] dark:border-[rgba(242,234,220,0.22)] bg-[rgba(28,25,22,0.02)] dark:bg-[rgba(255,255,255,0.02)] text-[15.5px] text-[#4b453c] dark:text-[#cdc3b2]">
        Looking for our other jobs (admin, student communications, media, writing)? They are on{' '}
        <button
          onClick={onOpenAllJobs}
          className="text-[#9e5f1c] dark:text-[#e3aa5f] underline underline-offset-4 font-medium bg-transparent border-0 cursor-pointer p-0"
        >
          the jobs page
        </button>
        . This page is only for the two tech roles.
      </div>
    </section>
  );
}
