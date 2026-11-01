import React from 'react';
import { Code, Monitor, Clock3 } from 'lucide-react';

export default function HighlightsStrip() {
  const highlights = [
    {
      icon: <Code aria-hidden="true" />,
      title: 'Real work, not puzzles',
      desc: 'Every challenge comes from something we are building now.'
    },
    {
      icon: <Monitor aria-hidden="true" />,
      title: 'Show us, and explain',
      desc: 'For each part, a screen-share video of you talking through it. At least a voice note.'
    },
    {
      icon: <Clock3 aria-hidden="true" />,
      title: 'About 4 to 5 days',
      desc: 'Four parts. Use any AI tool you like, and tell us how you used it.'
    }
  ];

  return (
    <section className="highlights-section" aria-label="What to expect">
      <div className="highlights-grid">
        {highlights.map((item) => (
          <div key={item.title} className="highlight-item">
            <span className="highlight-icon">{item.icon}</span>
            <div className="highlight-copy">
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
