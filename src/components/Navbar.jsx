import React from 'react';

export default function Navbar({ activeTab, onSelectTab, onSelectRole, onOpenAllJobs }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4">
      <a href="/join/roles" className="font-semibold">Jobs at Nathaniel School of Music</a>
      <div className="flex gap-4">
        <button onClick={() => onSelectTab && onSelectTab('all')}>All jobs</button>
        <button onClick={() => onSelectTab && onSelectTab('tech')}>Tech roles</button>
      </div>
    </nav>
  );
}
