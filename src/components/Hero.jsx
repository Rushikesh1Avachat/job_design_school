import React from 'react';

export default function Hero({ onScrollToRoles, onScrollToHow }) {
  const handleRolesClick = (e) => {
    e.preventDefault();
    if (onScrollToRoles) {
      onScrollToRoles();
    } else {
      const el = document.getElementById('roles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowClick = (e) => {
    e.preventDefault();
    if (onScrollToHow) {
      onScrollToHow();
    } else {
      const el = document.getElementById('how');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    window.history.pushState(null, '', '#how');
  };

  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div>
        <p className="kicker">Tech roles at Nathaniel</p>
        <h1 id="hero-title">
          Build the tools a music school <em>runs on.</em>
        </h1>
        <p className="lead">
          Nathaniel School of Music teaches piano, guitar, vocals and theory to students in 25 countries,
          mostly through our YouTube channel. We build our own software: a student portal, about 60 practice apps,
          Mac apps we sell, and a studio that runs on sensors. We are hiring for two tech roles. Pick the one that
          fits you; each has a work pack built from our real projects.
        </p>

        <div className="cta">
          <a className="btn" href="#roles" onClick={handleRolesClick}>
            See the two roles{' '}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </a>
          <a className="btn line" href="#how" onClick={handleHowClick}>
            How it works
          </a>
        </div>
      </div>

      <figure className="arch">
        <img
          src="https://brochures.nathanielschool.com/join/studio.jpg"
          onError={(e) => { e.currentTarget.src = '/images/jason-studio.jpg'; }}
          alt="Jason Zac, founder, at the keyboard in the Nathaniel School of Music studio"
          width="1800"
          height="1201"
          fetchPriority="high"
        />
        <figcaption>
          <span>Jason Zac, founder, at the keyboard</span>
          <span>in our studio</span>
        </figcaption>
      </figure>
    </section>
  );
}
