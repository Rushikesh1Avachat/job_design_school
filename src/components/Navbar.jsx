import React, { useRef } from 'react';
import { schoolRoles, techRoles } from '../data/rolesData';

const roleLabels = {
  'personal-assistant': 'Personal Assistant',
  admin: 'Admin & Student Relations',
  'multi-role': "Founder's Office",
  'ai-media': 'AI Media Associate',
  'content-writer': 'Content Writer',
  'pi-esp32-engineer': 'Pi & ESP32 Engineer',
};

export default function Navbar({
  activeTab,
  activeRoleId,
  onSelectTab,
  onSelectRole,
  onOpenAllJobs,
  onGoHome,
}) {
  const menuRef = useRef(null);
  const schoolRoleLinks = schoolRoles.map((role) => ({
    id: role.id,
    label: roleLabels[role.id] || role.title,
    emoji: role.emoji,
  }));
  const allRoles = [
    ...schoolRoleLinks,
    ...techRoles.map((role) => ({
      id: role.id,
      label: roleLabels[role.id] || role.title,
      emoji: role.emoji,
      category: 'tech',
    })),
  ];

  const selectRole = (roleId) => {
    menuRef.current?.removeAttribute('open');
    const role = [...schoolRoles, ...techRoles].find((item) => item.id === roleId);
    if (role) {
      onSelectRole?.(role);
    } else {
      onOpenAllJobs?.();
    }
  };

  const scrollToRoles = () => {
    document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="jn" aria-label="Jobs at Nathaniel">
      <div className="jn-in">
        <div className="jn-row">
          <a
            href="/join/roles"
            className="jn-brand"
            onClick={(event) => {
              event.preventDefault();
              onGoHome?.();
            }}
          >
            <img src="/images/nsm-logo-white.png" alt="" />
            <span className="long">Jobs at Nathaniel School of Music</span>
            <span className="short">Jobs at Nathaniel</span>
          </a>

          <div className="jn-links">
            <button type="button" className="hide-sm" onClick={() => onSelectTab?.('all')}>
              All jobs
            </button>
            <button
              type="button"
              className={activeTab === 'tech' ? 'active' : ''}
              aria-current={activeTab === 'tech' ? 'page' : undefined}
              onClick={() => {
                onSelectTab?.('tech');
                scrollToRoles();
              }}
            >
              Tech roles
            </button>
            <details className="jn-menu" ref={menuRef}>
              <summary>Every role</summary>
              <div className="jn-drop">
                <h5>At the school</h5>
                {schoolRoleLinks.map((role) => (
                  <a
                    key={role.id}
                    href={`#${role.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      selectRole(role.id);
                    }}
                  >
                    <span className="e" aria-hidden="true">{role.emoji}</span>
                    <b>{role.label}</b>
                  </a>
                ))}
                <h5>Tech</h5>
                {allRoles.filter((role) => role.category === 'tech').map((role) => (
                  <a
                    key={role.id}
                    href={`#${role.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      selectRole(role.id);
                    }}
                  >
                    <span className="e" aria-hidden="true">{role.emoji}</span>
                    <b>{role.label}</b>
                  </a>
                ))}
              </div>
            </details>
            <button type="button" className="jn-pill" onClick={() => onSelectTab?.('apply')}>
              Apply
            </button>
          </div>
        </div>

        <div className="jn-chips" aria-label="Switch role">
          {schoolRoleLinks.map((role) => (
            <a
              key={role.id}
              href={`#${role.id}`}
              aria-current={activeRoleId === role.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault();
                selectRole(role.id);
              }}
            >
              <span aria-hidden="true">{role.emoji}</span>
              {role.label}
            </a>
          ))}
          <span className="sep">Tech</span>
          {techRoles.map((role) => (
            <a
              key={role.id}
              href={`#${role.id}`}
              aria-current={activeRoleId === role.id ? 'true' : undefined}
              onClick={(event) => {
                event.preventDefault();
                selectRole(role.id);
              }}
            >
              <span aria-hidden="true">{role.emoji}</span>
              {roleLabels[role.id] || role.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
