import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightsStrip from './components/HighlightsStrip';
import TwoRolesSection from './components/TwoRolesSection';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import QuestionsContactSection from './components/QuestionsContactSection';
import WorkPackModal from './components/WorkPackModal';
import RoleDetailsPage from './components/RoleDetailsPage';
import JobsDirectory from './components/JobsDirectory';
import { schoolRoles, techRoles } from './data/rolesData';

const roles = [...schoolRoles, ...techRoles];

function resolveRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const roleMatch = pathname.match(/\/join\/role\/([^/]+)$/);
  if (roleMatch) {
    const role = roles.find((item) => item.id === decodeURIComponent(roleMatch[1]));
    return role ? { page: 'role', role } : { page: 'not-found' };
  }

  if (pathname === '/join/roles') return { page: 'directory' };

  const workPackMatch = pathname.match(/\/join\/(engineer|embedded)$/);
  const hashWorkPack = window.location.hash === '#engineer'
    ? 'engineer'
    : window.location.hash === '#embedded' ? 'embedded' : null;
  const workPackSlug = workPackMatch?.[1] || hashWorkPack;
  if (workPackSlug) {
    const role = techRoles.find((item) => item.packSlug === workPackSlug);
    if (role) return { page: 'work-pack', roleId: role.id };
  }

  if (pathname === '/' || pathname === '/join' || pathname === '/join/tech') {
    return { page: 'tech' };
  }

  return { page: 'not-found' };
}

export default function App() {
  const [route, setRoute] = useState(resolveRoute);
  const [activeWorkPackRole, setActiveWorkPackRole] = useState(
    route.page === 'work-pack' ? route.roleId : null
  );
  const [workPackReturnPath, setWorkPackReturnPath] = useState('/join/tech');

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    const nextRoute = resolveRoute();
    setRoute(nextRoute);
    setActiveWorkPackRole(nextRoute.page === 'work-pack' ? nextRoute.roleId : null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = resolveRoute();
      setRoute(nextRoute);
      setActiveWorkPackRole(nextRoute.page === 'work-pack' ? nextRoute.roleId : null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (window.location.hash === '#apply' && route.page === 'directory') {
      window.requestAnimationFrame(() => {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else if (window.location.hash === '#roles' && route.page === 'tech') {
      window.requestAnimationFrame(() => {
        document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else if (window.location.hash === '#how' && route.page === 'tech') {
      window.requestAnimationFrame(() => {
        document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [route]);

  useEffect(() => {
    const pageTitle = route.page === 'role'
      ? `${route.role.title} · Jobs at Nathaniel School of Music`
      : route.page === 'directory'
        ? 'Open Roles · Nathaniel School of Music'
        : route.page === 'not-found'
          ? 'Page Not Found · Jobs at Nathaniel School of Music'
          : 'Tech Roles at Nathaniel · Jobs at Nathaniel School of Music';
    document.title = pageTitle;
  }, [route]);

  const openRole = (role) => {
    const selectedRole = typeof role === 'string'
      ? roles.find((item) => item.id === role || item.packSlug === role)
      : role;
    if (!selectedRole) return;
    navigate(`/join/role/${selectedRole.id}`);
  };

  const openWorkPack = (roleId) => {
    const role = techRoles.find((item) => item.id === roleId);
    if (!role) return;
    setWorkPackReturnPath(
      route.page === 'role' && route.role ? `/join/role/${route.role.id}` : '/join/tech'
    );
    navigate(`/join/${role.packSlug}`);
  };

  const closeWorkPack = () => navigate(workPackReturnPath);

  const openDirectory = () => navigate('/join/roles');
  const showTechRoles = () => navigate('/join/tech#roles');

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <Navbar
        activeTab={route.page === 'directory' || (route.page === 'role' && route.role?.category === 'school') ? 'all' : 'tech'}
        activeRoleId={route.page === 'role' ? route.role.id : undefined}
        onGoHome={openDirectory}
        onSelectTab={(tab) => {
          if (tab === 'apply') {
            navigate('/join/roles#apply');
          } else if (tab === 'all') {
            openDirectory();
          } else {
            showTechRoles();
          }
        }}
        onSelectRole={openRole}
        onOpenAllJobs={openDirectory}
      />

      {route.page === 'directory' && <JobsDirectory onOpenRole={openRole} />}

      {route.page === 'role' && (
        <RoleDetailsPage
          role={route.role}
          onNavigate={navigate}
          onOpenWorkPack={openWorkPack}
        />
      )}

      {route.page === 'tech' && (
        <main className="flex-1 overflow-x-hidden">
          <Hero
            onScrollToRoles={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
            onScrollToHow={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          />
          <HighlightsStrip />
          <TwoRolesSection onOpenWorkPack={openWorkPack} onOpenRole={openRole} />
          <HowItWorks onOpenAllJobs={openDirectory} />
        </main>
      )}

      {route.page === 'not-found' && (
        <main className="not-found-page">
          <p className="kicker">Page not found</p>
          <h1>That role isn’t in this directory.</h1>
          <p>Browse the available roles or return to our tech openings.</p>
          <div className="cta">
            <button type="button" className="btn" onClick={openDirectory}>Browse all jobs</button>
            <button type="button" className="btn line" onClick={() => navigate('/join/tech')}>Tech roles</button>
          </div>
        </main>
      )}

      <QuestionsContactSection />
      <Footer onOpenAllJobs={openDirectory} onOpenTechRoles={showTechRoles} />

      {activeWorkPackRole && (
        <WorkPackModal roleId={activeWorkPackRole} onClose={closeWorkPack} />
      )}
    </div>
  );
}
