import React from 'react';
import { ArrowLeft, ArrowRight, Clock3, MapPin, MessageCircle } from 'lucide-react';

function RolePhoto({ photo, className = '' }) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(event) => {
          if (photo.fallback && event.currentTarget.src !== new URL(photo.fallback, window.location.href).href) {
            event.currentTarget.src = photo.fallback;
          }
        }}
      />
      {photo.caption && (
        <figcaption className="px-4 py-3 text-sm text-[var(--text-secondary)]">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Section({ title, children }) {
  return (
    <section className="role-page-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function RoleDetailsPage({ role, onNavigate, onOpenWorkPack }) {
  const isTechRole = role.category === 'tech';
  const lead = role.headline || role.about || role.subtitle || role.sum;
  const photos = role.photos?.length
    ? role.photos
    : [{ src: role.image, fallback: role.fallback, alt: role.imageAlt || role.title }];
  const responsibilities = role.responsibilities?.map((item) => (
    typeof item === 'string' ? item : item.text
  )) || role.highlights || [];
  const whatsappUrl = `https://wa.me/919561686658?text=${encodeURIComponent(
    `Hello, I am interested in the ${role.title} role at Nathaniel School of Music.`
  )}`;

  return (
    <main className="role-page">
      <div className="role-page-wrap">
        <nav className="role-breadcrumbs" aria-label="Breadcrumb">
          <a href="/join/roles" onClick={(event) => {
            event.preventDefault();
            onNavigate('/join/roles');
          }}>All jobs</a>
          <span aria-hidden="true">/</span>
          {isTechRole && (
            <>
              <a href="/join/tech" onClick={(event) => {
                event.preventDefault();
                onNavigate('/join/tech');
              }}>Tech roles</a>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span aria-current="page">{role.title}</span>
        </nav>

        <a
          href={isTechRole ? '/join/tech' : '/join/roles'}
          className="role-back-link"
          onClick={(event) => {
            event.preventDefault();
            onNavigate(isTechRole ? '/join/tech' : '/join/roles');
          }}
        >
          <ArrowLeft size={16} />
          Back to {isTechRole ? 'tech roles' : 'all jobs'}
        </a>

        <header className="role-page-hero">
          <RolePhoto photo={photos[0]} className="role-page-cover" />
          <div className="role-page-heading">
            <p className="kicker">{role.roleNum || role.tag || (isTechRole ? 'Tech role' : 'At the school')}</p>
            <h1>{role.title}</h1>
            <p className="role-page-lead">{lead}</p>
            {isTechRole ? (
              <button
                type="button"
                className="btn"
                onClick={() => onOpenWorkPack(role.id)}
              >
                Open the {role.packSlug === 'engineer' ? 'engineer' : 'Pi & ESP32'} work pack
                <ArrowRight size={17} />
              </button>
            ) : (
              <a className="btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Apply via WhatsApp
                <MessageCircle size={17} />
              </a>
            )}
          </div>
        </header>

        <div className="role-facts" aria-label="Role details">
          <div><MapPin size={17} /><span>Langford Town, Bengaluru</span></div>
          <div><Clock3 size={17} /><span>Monday to Saturday · 9 am to 5 pm</span></div>
        </div>

        <div className="role-page-content">
          <article className="role-about">
            <p className="role-eyebrow">About the role</p>
            <p>{role.about || role.description || lead}</p>
            {(role.facts?.length > 0 || role.pay || role.terms || role.pathToFullTime) && (
              <dl className="role-facts-list">
                {(role.facts || []).map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
                {role.pathToFullTime ? (
                  <div><dt>Pay & terms</dt><dd>{role.pathToFullTime}</dd></div>
                ) : (
                  <>
                    {role.pay && <div><dt>Pay</dt><dd>{role.pay}{role.paySub}</dd></div>}
                    {role.terms && <div><dt>Terms</dt><dd>{role.terms}</dd></div>}
                  </>
                )}
              </dl>
            )}
          </article>

          {photos.length > 1 && (
            <div className="role-photo-grid" aria-label={`${role.title} photos`}>
              {photos.slice(1).map((photo) => <RolePhoto key={photo.src} photo={photo} />)}
            </div>
          )}

          {responsibilities.length > 0 && (
            <Section title={isTechRole ? 'What you will build and run' : 'Key responsibilities'}>
              <ul className="role-bullet-list">
                {responsibilities.map((item, index) => (
                  <li key={`${index}-${item}`}>{item}</li>
                ))}
              </ul>
            </Section>
          )}

          {role.chips?.length > 0 && (
            <Section title="Tools and technologies">
              <ul className="role-chip-list">
                {role.chips.map((chip) => <li key={chip}>{chip}</li>)}
              </ul>
            </Section>
          )}

          {role.workPackChallenges?.length > 0 && (
            <Section title="The work pack">
              <ol className="role-work-pack">
                {role.workPackChallenges.map((challenge, index) => (
                  <li key={challenge}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {challenge}
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {role.day?.length > 0 && (
            <Section title="A typical day">
              <ol className="role-timeline">
                {role.day.map((item) => (
                  <li key={`${item.time}-${item.text}`}>
                    <time>{item.time}</time>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {role.qualities?.length > 0 && (
            <Section title="What we look for">
              <ul className="role-bullet-list">
                {role.qualities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Section>
          )}

          {role.learning?.length > 0 && (
            <Section title="What you will learn">
              <ul className="role-bullet-list">
                {role.learning.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Section>
          )}

          {role.ninetyDays?.length > 0 && (
            <Section title="Your first 90 days">
              <div className="role-months">
                {role.ninetyDays.map((month) => (
                  <article key={month.month}>
                    <p>{month.stage}</p>
                    <h3>{month.title}</h3>
                    <span>{month.desc}</span>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {role.qualifications && (
            <Section title="Qualifications">
              <p className="role-copy">{role.qualifications}</p>
            </Section>
          )}

          <div className="role-page-cta">
            <div>
              <p className="role-eyebrow">Interested in this role?</p>
              <h2>Let’s talk about what you could build here.</h2>
            </div>
            {isTechRole ? (
              <button className="btn" type="button" onClick={() => onOpenWorkPack(role.id)}>
                Start the work pack <ArrowRight size={17} />
              </button>
            ) : (
              <a className="btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Apply via WhatsApp <MessageCircle size={17} />
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
