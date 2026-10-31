import React from 'react';

export default function IconRenderer({ name, className = "ic" }) {
  switch (name) {
    case 'chat':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 19.5 6 15.6A8 8 0 1 1 9 18.6z" />
        </svg>
      );
    case 'user':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    case 'link':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      );
    case 'coin':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M9 9h6M9 12h6M12 12l-3 4" />
        </svg>
      );
    case 'refresh':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 12a8 8 0 0 1-14 5.3" />
          <path d="M4 12a8 8 0 0 1 14-5.3" />
          <path d="M18 3v4h-4M6 21v-4h4" />
        </svg>
      );
    case 'edit':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20h4L19 9l-4-4L4 16z" />
          <path d="m13 7 4 4" />
        </svg>
      );
    case 'check-list':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6h11M9 12h11M9 18h11" />
          <circle cx="4.5" cy="6" r="1" />
          <circle cx="4.5" cy="12" r="1" />
          <circle cx="4.5" cy="18" r="1" />
        </svg>
      );
    case 'globe':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" />
        </svg>
      );
    case 'sun':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      );
    case 'star':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
          <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
        </svg>
      );
    case 'mic':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="9" y="3.5" width="6" height="11" rx="3" />
          <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" />
        </svg>
      );
    case 'music':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18V6l10-2v12" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </svg>
      );
    case 'faders':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4v16M12 4v16M18 4v16" />
          <rect x="4" y="13" width="4" height="3" rx="1" />
          <rect x="10" y="7" width="4" height="3" rx="1" />
          <rect x="16" y="11" width="4" height="3" rx="1" />
        </svg>
      );
    case 'device':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
        </svg>
      );
    case 'check-square':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      );
    case 'video':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5.5" width="18" height="13" rx="3.5" />
          <path d="m10.5 9.5 4 2.5-4 2.5z" />
        </svg>
      );
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.5-4.5" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
        </svg>
      );
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5" />
        </svg>
      );
    case 'chart':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
        </svg>
      );
    case 'file-text':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3.5h8l4 4V20.5H6z" />
          <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
        </svg>
      );
    case 'badge':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="9" r="5" />
          <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case 'screen':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="12" rx="2" />
          <path d="M9 20h6M12 16.5V20" />
        </svg>
      );
    case 'alert':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 2.5 20h19z" />
          <path d="M12 10v4.5M12 17.5v.01" />
        </svg>
      );
    case 'camera':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2.5" />
          <path d="M8.5 7l1.5-2.5h4L15.5 7" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
      );
    case 'folder':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 6.5h6l2 2h9v11h-17z" />
        </svg>
      );
    case 'eye':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'image':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="m4 18 5-5 4 4 3-3 4.5 4.5" />
        </svg>
      );
    case 'wave':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0" />
        </svg>
      );
    case 'film':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="4" width="17" height="16" rx="2" />
          <path d="M7.5 4v16M16.5 4v16M3.5 9h4M3.5 15h4M16.5 9h4M16.5 15h4" />
        </svg>
      );
    case 'upload':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    case 'play-square':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="m10.5 9.5 4 2.5-4 2.5z" />
        </svg>
      );
    case 'wand':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m4 20 11-11M14 4v3M12.5 5.5h3M19 9v3M17.5 10.5h3M18 3l1 1" />
          <path d="m13 8 3 3" />
        </svg>
      );
    case 'subtitles':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <path d="M7 14h4M13 14h4M7 17h10" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      );
    case 'book':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5A2 2 0 0 1 6 3.5h13v15H6a2 2 0 0 0-2 2z" />
          <path d="M4 20.5v-15M8 7.5h7" />
        </svg>
      );
    case 'mail':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'phone':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="7" y="2.5" width="10" height="19" rx="2" />
          <path d="M10.5 18.5h3" />
        </svg>
      );
    case 'pen':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 20h4L19 9l-4-4L4 16z" />
          <path d="m13 7 4 4" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}
