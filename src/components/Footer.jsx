import React, { useState } from 'react';
import { MessageCircle, Check, Copy } from 'lucide-react';

export default function Footer({ onOpenAllJobs }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://brochures.nathanielschool.com/join/tech');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="pt-10 sm:pt-14 pb-12 sm:pb-16 text-center text-[13.5px] sm:text-[14px] text-[#7b7367] dark:text-[#9b9182] border-t border-[rgba(28,25,22,0.1)] dark:border-[rgba(242,234,220,0.1)]">
      <div className="max-w-[1140px] mx-auto px-4 space-y-4">
        {/* Main credits */}
        <p className="m-0">
          Nathaniel School of Music · Bengaluru, India · Teaching students worldwide since 2008
        </p>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[13px]">
          <span>Tech roles:</span>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-[#9e5f1c] dark:text-[#e3aa5f] hover:underline bg-transparent border-0 cursor-pointer p-0 font-medium"
          >
            <span>brochures.nathanielschool.com/join/tech</span>
            {copied ? <Check className="w-3.5 h-3.5 text-[#2f7a4a]" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
          </button>
          <span>·</span>
          <span>Other jobs:</span>
          <button
            onClick={onOpenAllJobs}
            className="text-[#9e5f1c] dark:text-[#e3aa5f] hover:underline bg-transparent border-0 cursor-pointer p-0 font-medium"
          >
            the jobs page
          </button>
          <span>·</span>
          <a
            href="https://wa.me/919561686658"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#2f7a4a] dark:text-[#93d3a2] hover:underline font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp +91 95616 86658</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

