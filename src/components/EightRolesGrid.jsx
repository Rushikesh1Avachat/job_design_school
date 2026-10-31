import React from 'react';
import { schoolRoles, techRoles } from '../data/rolesData';

export default function EightRolesGrid({ onSelectRole }) {
  const handleRoleClick = (e, roleId, isTech = false) => {
    e.preventDefault();
    if (onSelectRole) {
      onSelectRole(roleId, isTech);
    } else {
      const el = document.getElementById(roleId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="wrap glance" aria-labelledby="glance-title">
      <div className="staff" aria-hidden="true"></div>
      <div className="glance-head">
        <h2 id="glance-title">Eight roles, one school</h2>
        <p>Six roles at the school and two in tech. All report to Jason Zac. Tap a role to open its full page.</p>
      </div>

      <div className="rgrid">
        <p className="rgroup">
          At the school <span>Five internships that lead to a full-time job, and one full-time role.</span>
        </p>
        <ul className="rcards">
          {schoolRoles.map((role) => (
            <li key={role.id}>
              <a
                className="rc"
                href={`#${role.id}`}
                onClick={(e) => handleRoleClick(e, role.id, false)}
              >
                <span className="rc-img">
                  <img
                    src={role.photos?.[0]?.src || role.image}
                    onError={(e) => {
                      if (role.photos?.[0]?.fallback) {
                        e.currentTarget.src = role.photos[0].fallback;
                      }
                    }}
                    alt=""
                    width="1600"
                    height="900"
                    loading="lazy"
                  />
                </span>
                <span className="rc-e" aria-hidden="true">
                  {role.emoji}
                </span>
                <span className="rc-n">{role.num}</span>
                <b>{role.title}</b>
                <small>{role.subtitle}</small>
                <span className="rc-go">
                  Read the role{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="rgroup">
          Tech roles <span>Two engineering roles, each with its own work pack.</span>
        </p>
        <ul className="rcards two">
          {techRoles.map((role) => (
            <li key={role.id}>
              <a
                className="rc"
                href={`#${role.id}`}
                onClick={(e) => handleRoleClick(e, role.id, true)}
              >
                <span className="rc-img">
                  <img
                    src={role.image}
                    onError={(e) => {
                      if (role.fallback) e.currentTarget.src = role.fallback;
                    }}
                    alt=""
                    width="1600"
                    height="900"
                    loading="lazy"
                  />
                </span>
                <span className="rc-e" aria-hidden="true">
                  {role.emoji}
                </span>
                <span className="rc-n">{role.num}</span>
                <b>{role.title}</b>
                <small>{role.subtitle}</small>
                <span className="rc-go">
                  Read the role{' '}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
