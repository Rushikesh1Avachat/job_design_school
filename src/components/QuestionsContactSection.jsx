import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

export default function QuestionsContactSection() {
  const email = 'music@nathanielschool.com';
  const phone = '917760456847';
  const formattedPhone = '+91 77604 56847';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hello, I have a question about the roles at Nathaniel School of Music.'
  )}`;

  return (
    <section className="contact-band" aria-labelledby="contact-title">
      <div className="contact-band-inner">
        <div className="contact-band-copy">
          <h2 id="contact-title">Questions? Talk to us.</h2>
          <p>We&apos;re happy to hear from students and placement officers alike.</p>
          <div className="contact-band-links">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp {formattedPhone}
            </a>
          </div>
        </div>

        <div className="contact-band-actions">
          <a className="contact-button contact-button-email" href={`mailto:${email}?subject=${encodeURIComponent('Application')}`}>
            <Mail size={19} strokeWidth={1.8} />
            <span>Email your CV</span>
          </a>
          <a className="contact-button contact-button-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={19} strokeWidth={1.9} />
            <span>WhatsApp us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
