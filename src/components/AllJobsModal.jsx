import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Search } from 'lucide-react';
import { schoolRoles, techRoles } from '../data/rolesData';

export default function AllJobsModal({ onClose, onSelectRole }) {
  const [filter, setFilter] = useState('all'); // all, school, tech
  const [search, setSearch] = useState('');

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

  const allJobsList = [
    ...schoolRoles.map((r, index) => ({
      ...r,
      type: 'school',
      num: String(index + 1).padStart(2, '0'),
    })),
    ...techRoles.map((r, index) => ({
      ...r,
      type: 'tech',
      num: String(schoolRoles.length + index + 1).padStart(2, '0'),
    }))
  ];

  const filteredJobs = allJobsList.filter((job) => {
    if (filter === 'school' && job.type !== 'school') return false;
    if (filter === 'tech' && job.type !== 'tech') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDesc = (job.subtitle || job.headline || '').toLowerCase().includes(q);
      return matchTitle || matchDesc;
    }
    return true;
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#f5efe4] dark:bg-[#14110e] text-[#1c1916] dark:text-[#f2eadc] rounded-[28px] sm:rounded-[36px] shadow-2xl border border-[rgba(28,25,22,0.15)] dark:border-[rgba(242,234,220,0.15)] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)] bg-[#ede4d4] dark:bg-[#1b1713] sticky top-0 z-20">
          <div>
            <span className="text-[12px] uppercase tracking-wider font-semibold text-[#9e5f1c] dark:text-[#e3aa5f] block">
              Nathaniel School of Music
            </span>
            <h2 className="font-serif text-[24px] sm:text-[30px] leading-tight m-0 text-[#1c1916] dark:text-[#f2eadc]">
              All Open Positions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors border-0 bg-transparent cursor-pointer text-inherit"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-6 pb-2 border-b border-[rgba(28,25,22,0.08)] dark:border-[rgba(242,234,220,0.08)] flex flex-wrap items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[rgba(28,25,22,0.06)] dark:bg-[rgba(255,255,255,0.06)] text-[13px]">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition-all border-0 cursor-pointer font-medium ${
                filter === 'all'
                  ? 'bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] shadow-sm'
                  : 'bg-transparent text-inherit hover:opacity-75'
              }`}
            >
              All ({allJobsList.length})
            </button>
            <button
              onClick={() => setFilter('tech')}
              className={`px-3.5 py-1.5 rounded-full transition-all border-0 cursor-pointer font-medium ${
                filter === 'tech'
                  ? 'bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] shadow-sm'
                  : 'bg-transparent text-inherit hover:opacity-75'
              }`}
            >
              Tech Roles ({techRoles.length})
            </button>
            <button
              onClick={() => setFilter('school')}
              className={`px-3.5 py-1.5 rounded-full transition-all border-0 cursor-pointer font-medium ${
                filter === 'school'
                  ? 'bg-[#1c1916] text-[#f5efe4] dark:bg-[#f2eadc] dark:text-[#14110e] shadow-sm'
                  : 'bg-transparent text-inherit hover:opacity-75'
              }`}
            >
              At The School ({schoolRoles.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7b7367] dark:text-[#9b9182]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full text-[13.5px] border border-[rgba(28,25,22,0.18)] dark:border-[rgba(242,234,220,0.18)] bg-[#fbf8f1] dark:bg-[#1d1915] text-inherit focus:outline-none focus:border-[#9e5f1c]"
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => {
                  onClose();
                  onSelectRole(job);
                }}
                className="group p-4 sm:p-5 rounded-2xl border border-[rgba(28,25,22,0.14)] dark:border-[rgba(242,234,220,0.14)] bg-[#fbf8f1] dark:bg-[#1d1915] hover:border-[#9e5f1c] dark:hover:border-[#e3aa5f] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[rgba(28,25,22,0.06)] dark:bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[18px]">
                      {job.emoji}
                    </span>
                    <span className="font-serif text-[15px] text-[#7b7367] dark:text-[#9b9182]">
                      {job.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-[20px] sm:text-[22px] leading-tight text-[#1c1916] dark:text-[#f2eadc] group-hover:text-[#9e5f1c] dark:group-hover:text-[#e3aa5f] transition-colors mb-1.5">
                    {job.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[#4b453c] dark:text-[#cdc3b2] m-0">
                    {job.subtitle || job.headline}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-[rgba(28,25,22,0.08)] dark:border-[rgba(242,234,220,0.08)] text-[12.5px] text-[#7b7367] dark:text-[#9b9182]">
                  <span className="capitalize">{job.type === 'tech' ? 'Tech Role' : 'School Role'}</span>
                  <span className="flex items-center gap-1 font-medium text-[#9e5f1c] dark:text-[#e3aa5f] group-hover:translate-x-0.5 transition-transform">
                    Read the role <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
