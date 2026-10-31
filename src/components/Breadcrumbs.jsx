import React from 'react';

export default function Breadcrumbs({ items = [], onSelect }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <div className="wrap py-3">
        <ol className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] text-[#5f564f]">
          {items.map((item, index) => (
            <li key={item.id || `${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="crumb-separator">/</span>}
              <button
                type="button"
                aria-current={item.active ? 'page' : undefined}
                onClick={() => onSelect && onSelect(item)}
                className={[
                  'rounded-full border border-transparent bg-transparent px-2 py-1 text-left transition-colors',
                  item.active
                    ? 'font-semibold text-[#1c1916]'
                    : 'text-[#5f564f] hover:border-[rgba(28,25,22,0.08)] hover:bg-[rgba(28,25,22,0.02)] hover:text-[#9e5f1c]'
                ].join(' ')}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
