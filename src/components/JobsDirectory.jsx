import React from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { schoolRoles, techRoles } from '../data/rolesData';

const labelOverrides = {
  'multi-role': "Founder's Office",
  'ai-media': 'AI Media Associate',
  'content-writer': 'Content Writer',
  'pi-esp32-engineer': 'Raspberry Pi & ESP32 Engineer',
};

function getImage(role) {
  if (role.photos?.[0]) return role.photos[0];
  return { src: role.image, fallback: role.fallback, alt: role.imageAlt || role.title };
}

function RoleCard({ role, index, onOpenRole }) {
  const image = getImage(role);
  return (
    <button
      type="button"
      className="directory-card"
      onClick={() => onOpenRole(role)}
    >
      <div className="directory-card-image">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onError={(event) => {
            if (image.fallback && event.currentTarget.src !== new URL(image.fallback, window.location.href).href) {
              event.currentTarget.src = image.fallback;
            }
          }}
        />
        <span className="directory-card-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="directory-card-body">
        <span className="directory-card-emoji" aria-hidden="true">{role.emoji}</span>
        <h3>{labelOverrides[role.id] || role.title}</h3>
        <p>{role.subtitle || role.headline}</p>
        <span className="directory-card-link">Read the role <ArrowRight size={16} /></span>
      </div>
    </button>
  );
}

export default function JobsDirectory({ onOpenRole }) {
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <div className="directory-wrap directory-hero-grid">
          <div>
            <p className="kicker">Careers at Nathaniel</p>
            <h1>Run a music school <em>with us.</em></h1>
            <p>
              Explore opportunities at Nathaniel School of Music. Our team builds learning
              experiences for students around the world, from the studio in Bengaluru.
            </p>
            <a href="#roles" className="btn">
              Explore the roles <ArrowDown size={17} />
            </a>
          </div>
          <figure className="directory-hero-photo">
            <img src="/images/jason-studio.jpg" alt="Jason Zac at the piano in the school studio" />
            <figcaption>Music, learning and making things together.</figcaption>
          </figure>
        </div>
      </section>

      <section className="directory-wrap directory-roles" id="roles">
        <div className="directory-section-heading">
          <div>
            <p className="role-eyebrow">Open opportunities</p>
            <h2>Find your place here.</h2>
          </div>
          <p>Most roles are studio-based; each role page explains its location and schedule.</p>
        </div>

        <div className="directory-role-group">
          <h3>At the school <span>{schoolRoles.length} roles</span></h3>
          <div className="directory-grid">
            {schoolRoles.map((role, index) => (
              <RoleCard key={role.id} role={role} index={index} onOpenRole={onOpenRole} />
            ))}
          </div>
        </div>

        <div className="directory-role-group">
          <h3>Tech <span>{techRoles.length} roles</span></h3>
          <div className="directory-grid">
            {techRoles.map((role, index) => (
              <RoleCard key={role.id} role={role} index={schoolRoles.length + index} onOpenRole={onOpenRole} />
            ))}
          </div>
        </div>
      </section>

      <section className="directory-apply" id="apply">
        <div className="directory-wrap directory-apply-inner">
          <div>
            <p className="role-eyebrow">Start a conversation</p>
            <h2>Questions about applying?</h2>
            <p><MapPin size={16} /> Langford Town, Bengaluru · Monday to Saturday</p>
          </div>
          <a href="https://wa.me/919561686658" target="_blank" rel="noopener noreferrer" className="btn">
            Talk to us on WhatsApp <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}
