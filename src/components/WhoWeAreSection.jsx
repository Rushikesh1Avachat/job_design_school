import React from 'react';

export default function WhoWeAreSection() {
  return (
    <section className="band" id="who" aria-labelledby="who-title">
      <div className="wrap band-in">
        <p className="kicker">Who we are</p>
        <h2 className="statement" id="who-title">
          We have taught music since 2008. Today our students learn from <em>25 countries.</em>
        </h2>

        <div className="stats">
          <div className="stat">
            <b>2008</b>
            <span>Founded by Jason Zac and Lillian Zachariah</span>
          </div>
          <div className="stat">
            <b>6,000<small>+</small></b>
            <span>students trained since</span>
          </div>
          <div className="stat">
            <b>544</b>
            <span>students on our two learning portals today</span>
          </div>
          <div className="stat">
            <b>25</b>
            <span>countries those students live in</span>
          </div>
          <div className="stat">
            <b>127,000</b>
            <span>subscribers on our YouTube channel, @nathanielmusicschool</span>
          </div>
          <div className="stat">
            <b>12.5M<small>+</small></b>
            <span>views. YouTube is where most of our students first find us.</span>
          </div>
          <div className="stat">
            <b>90%</b>
            <span>of our students learn online</span>
          </div>
          <div className="stat">
            <b>190<small>+</small></b>
            <span>video lessons in ten self-paced courses that students keep for life</span>
          </div>
        </div>

        <div className="duo">
          <figure>
            <img
              src="https://brochures.nathanielschool.com/join/roles-students.jpg"
              onError={(e) => { e.currentTarget.src = '/images/showcase-stage.jpg'; }}
              alt="Nathaniel School of Music students holding their certificates"
              width="1400"
              height="776"
              loading="lazy"
            />
          </figure>
          <div className="portals">
            <div className="portal">
              <h3>Our live learning portal</h3>
              <a
                href="https://learning-portal.nathanielschool.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                learning-portal.nathanielschool.com
              </a>
              <p>
                Small live classes of about 3 to 7 students on Zoom. Recordings, notes and homework appear on the portal after every class.
              </p>
            </div>
            <div className="portal">
              <h3>Everything for Life</h3>
              <a
                href="https://learn-music.nathanielschool.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn-music.nathanielschool.com
              </a>
              <p>
                Ten self-paced video courses, more than 190 lessons, that students keep for life.
              </p>
            </div>
            <p className="teach">
              We teach <b>piano, guitar, vocals and bass</b>, plus theory and ear training. And we build our own learning portals and practice apps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
