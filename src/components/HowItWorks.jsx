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
    <section id="how" className="how-section">
      <div className="how-section-heading">
        <p className="role-eyebrow">The application process</p>
        <h2>How it works</h2>
        <p>
          The work pack is the interview. We would rather see what you can build than read a list of skills.
        </p>
      </div>

      <ol className="how-steps">
        {steps.map((step, idx) => (
          <li className="how-step" key={step.title}>
            <span className="how-step-number">{String(idx + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>

      <div className="how-callout">
        Looking for our other jobs (admin, student communications, media, writing)? They are on{' '}
        <button
          onClick={onOpenAllJobs}
        >
          the jobs page
        </button>
        . This page is only for the two tech roles.
      </div>
    </section>
  );
}
