import React from 'react';
import { ArrowRight } from 'lucide-react';
import { techRoles } from '../data/rolesData';

export default function TwoRolesSection({ onOpenWorkPack, onOpenRole }) {
  return (
    <section id="roles" className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24">
      {/* Heading */}
      <div className="max-w-[700px] mb-10">
        <h2 className="font-serif text-[38px] sm:text-[52px] leading-[1.05] tracking-[-0.02em] text-[#1c1916] dark:text-[#f2eadc] mb-4">
          The two roles
        </h2>
        <p className="text-[17px] sm:text-[18px] text-[#4b453c] dark:text-[#cdc3b2] leading-[1.6]">
          Both are in person at our studio in Langford Town, Bengaluru, Monday to Saturday, 9 am to 5 pm. You work directly with Jason Zac, the founder, who writes code with you.
        </p>
      </div>

      {/* The 2 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {techRoles.map((role) => (
          <article
            key={role.id}
            id={role.packSlug === 'engineer' ? 'engineer' : 'embedded'}
            className="flex flex-col gap-5 p-6 sm:p-8 rounded-[28px] border border-[rgba(28,25,22,0.18)] dark:border-[rgba(242,234,220,0.18)] bg-[#fbf8f1] dark:bg-[#1d1915] shadow-sm hover:shadow-md transition-shadow group"
          >
            {/* Cover Image with badge */}
            <div
              onClick={() => onOpenRole(role)}
              className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 aspect-[16/9] overflow-hidden rounded-t-[28px] cursor-pointer group"
            >
              <img
                src={role.image}
                alt={role.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span
                aria-hidden="true"
                className="absolute left-4 bottom-4 w-11 h-11 rounded-xl bg-[#fbf8f1] dark:bg-[#1d1915] flex items-center justify-center text-[22px] shadow-md border border-[rgba(28,25,22,0.08)] dark:border-[rgba(242,234,220,0.1)]"
              >
                {role.emoji}
              </span>
            </div>

            {/* Role Header */}
            <div>
              <span className="text-[12px] uppercase tracking-[0.14em] font-medium text-[#9e5f1c] dark:text-[#e3aa5f] block mb-1">
                {role.roleNum}
              </span>
              <h3 className="font-serif text-[32px] sm:text-[40px] leading-[1.05] tracking-[-0.015em] text-[#1c1916] dark:text-[#f2eadc] m-0">
                {role.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-[16px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] m-0">
              {role.headline}
            </p>

            {/* Bullet Points */}
            <ul className="grid gap-2 text-[15px] leading-[1.55] text-[#4b453c] dark:text-[#cdc3b2] pl-5 m-0 list-disc marker:text-[#9e5f1c] dark:marker:text-[#e3aa5f]">
              {role.highlights.map((bullet, idx) => (
                <li key={idx} className="pl-1">
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Tech Chips */}
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {role.chips.map((chip, idx) => (
                <li
                  key={idx}
                  className="text-[12.5px] font-medium px-3 py-1.5 rounded-full border border-[rgba(28,25,22,0.22)] dark:border-[rgba(242,234,220,0.2)] text-[#4b453c] dark:text-[#cdc3b2] bg-[rgba(28,25,22,0.02)] dark:bg-[rgba(255,255,255,0.03)]"
                >
                  {chip}
                </li>
              ))}
            </ul>

            {/* Work Pack Challenges List */}
            <div className="pt-2">
              <p className="text-[15px] font-medium text-[#1c1916] dark:text-[#f2eadc] mb-2.5">
                The work pack:
              </p>
              <ol className="list-none p-0 m-0 grid gap-2">
                {role.workPackChallenges.map((challenge, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[1.8em_1fr] gap-2 items-baseline text-[15px] text-[#1c1916] dark:text-[#f2eadc]"
                  >
                    <span className="font-serif text-[18px] text-[#9e5f1c] dark:text-[#e3aa5f] font-normal">
                      {idx + 1}
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Terms and Pay Callout */}
            <div className="border-t border-[rgba(28,25,22,0.13)] dark:border-[rgba(242,234,220,0.11)] pt-3.5 text-[14.5px] text-[#4b453c] dark:text-[#cdc3b2] grid gap-1">
              <div>
                <b className="font-medium text-[#1c1916] dark:text-[#f2eadc]">Terms:</b> {role.terms}
              </div>
              <div>
                <b className="font-medium text-[#1c1916] dark:text-[#f2eadc]">Pay:</b> {role.pay}
              </div>
            </div>

            {/* CTA Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2 mt-auto">
              <button
                onClick={() => onOpenWorkPack(role.id)}
                className="inline-flex items-center gap-2 text-[15px] font-medium px-5 py-3 rounded-full bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer border-0 shadow-sm"
              >
                <span>
                  {role.packSlug === 'engineer' ? 'Open the engineer work pack' : 'Open the Pi & ESP32 work pack'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenRole(role)}
                className="text-[15px] font-medium text-[#4b453c] dark:text-[#cdc3b2] hover:text-[#9e5f1c] dark:hover:text-[#e3aa5f] transition-colors bg-transparent border-0 cursor-pointer p-1"
              >
                Read the full role
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
