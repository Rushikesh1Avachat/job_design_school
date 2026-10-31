import React from 'react';
import { Code, Monitor, Clock } from 'lucide-react';

export default function HighlightsStrip() {
  const highlights = [
    {
      icon: <Code className="w-5 h-5 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none mt-1" />,
      title: 'Real work, not puzzles',
      desc: 'Every challenge comes from something we are building now.'
    },
    {
      icon: <Monitor className="w-5 h-5 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none mt-1" />,
      title: 'Show us, and explain',
      desc: 'For each part, a screen-share video of you talking through it. At least a voice note.'
    },
    {
      icon: <Clock className="w-5 h-5 text-[#9e5f1c] dark:text-[#e3aa5f] flex-none mt-1" />,
      title: 'About 4 to 5 days',
      desc: 'Four parts. Use any AI tool you like, and tell us how you used it.'
    }
  ];

  return (
    <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-[rgba(28,25,22,0.13)] dark:border-[rgba(242,234,220,0.11)]">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className={`py-6 px-3 sm:px-6 flex items-start gap-4 text-[#4b453c] dark:text-[#cdc3b2] text-[15px] leading-[1.55] ${
              idx > 0 ? 'md:border-l md:border-[rgba(28,25,22,0.13)] dark:md:border-[rgba(242,234,220,0.11)] border-t md:border-t-0' : ''
            }`}
          >
            {item.icon}
            <div>
              <b className="block font-medium text-[16px] text-[#1c1916] dark:text-[#f2eadc] mb-0.5">
                {item.title}
              </b>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
