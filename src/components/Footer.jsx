import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Footer({ onOpenAllJobs, onOpenTechRoles }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <img src="/images/nsm-logo-white.png" alt="" />
          <div>
            <strong>Nathaniel School of Music</strong>
            <p>Music education, made for the way people learn.</p>
          </div>
        </div>

        <div className="site-footer-column">
          <span className="site-footer-label">Explore</span>
          <button type="button" onClick={onOpenAllJobs}>All open roles</button>
          <button type="button" onClick={onOpenTechRoles}>Tech roles</button>
          <a href="https://nathanielschool.com/" target="_blank" rel="noopener noreferrer">
            Nathaniel School <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="site-footer-column">
          <span className="site-footer-label">Get in touch</span>
          <a href="https://wa.me/919561686658" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={15} /> WhatsApp us
          </a>
          <span>Langford Town, Bengaluru, India</span>
          <span>Teaching students worldwide since 2008</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© Nathaniel School of Music</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
