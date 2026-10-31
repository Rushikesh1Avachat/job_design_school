import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HighlightsStrip from './components/HighlightsStrip';
import TwoRolesSection from './components/TwoRolesSection';
import HowItWorks from './components/HowItWorks';
import QuestionsContactSection from './components/QuestionsContactSection';
import Footer from './components/Footer';
import WorkPackModal from './components/WorkPackModal';
import RoleDetailsModal from './components/RoleDetailsModal';
import AllJobsModal from './components/AllJobsModal';
import Breadcrumbs from './components/Breadcrumbs';
import { techRoles, schoolRoles } from './data/rolesData';

export default function App() {
  const [activeWorkPackRole, setActiveWorkPackRole] = useState(null);
  const [activeRoleDetails, setActiveRoleDetails] = useState(null);
  const [allJobsOpen, setAllJobsOpen] = useState(false);
  const [currentSelectedRole, setCurrentSelectedRole] = useState(null);

  const breadcrumbItems = [
    { id: 'home', label: 'Home', active: false },
    { id: 'jobs', label: 'Jobs at Nathaniel', active: false },
    {
      id: currentSelectedRole?.category === 'school' ? 'school-roles' : 'tech-roles',
      label: currentSelectedRole?.category === 'school' ? 'School roles' : 'Tech roles',
      active: !currentSelectedRole,
    },
    ...(currentSelectedRole
      ? [{ id: currentSelectedRole.id, label: currentSelectedRole.title, active: true }]
      : []),
  ];

  // Handle URL hash changes for deep linking (e.g. #engineer, #embedded, #roles, #how, #all-jobs)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#engineer') {
        setCurrentSelectedRole(techRoles[0]);
        setActiveWorkPackRole('founding-engineer');
      } else if (hash === '#embedded') {
        setCurrentSelectedRole(techRoles[1]);
        setActiveWorkPackRole('pi-esp32-engineer');
      } else if (hash === '#all-jobs' || hash === '#jobs') {
        setAllJobsOpen(true);
      } else if (hash === '#roles') {
        const el = document.getElementById('roles');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === '#how') {
        const el = document.getElementById('how');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleScrollToRoles = () => {
    const el = document.getElementById('roles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToHow = () => {
    const el = document.getElementById('how');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenWorkPack = (roleId) => {
    setActiveWorkPackRole(roleId);
  };

  const handleOpenRole = (role) => {
    const selectedRole = typeof role === 'string'
      ? [...techRoles, ...schoolRoles].find((item) => item.id === role || item.packSlug === role)
      : role;

    if (!selectedRole) return;
    setCurrentSelectedRole(selectedRole);
    setActiveRoleDetails(selectedRole);
    setAllJobsOpen(false);
  };

  const handleBreadcrumbSelect = (item) => {
    if (item.id === 'home') {
      setCurrentSelectedRole(null);
      setActiveRoleDetails(null);
      setAllJobsOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.id === 'jobs' || item.id === 'school-roles') {
      setCurrentSelectedRole(null);
      setActiveRoleDetails(null);
      setAllJobsOpen(true);
      return;
    }

    if (item.id === 'tech-roles') {
      setCurrentSelectedRole(null);
      setActiveRoleDetails(null);
      setAllJobsOpen(false);
      const el = document.getElementById('roles');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const roleMatch = [...techRoles, ...schoolRoles].find((role) => role.id === item.id);
    if (roleMatch) {
      handleOpenRole(roleMatch);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Top Navbar */}
      <Navbar
        activeTab={currentSelectedRole?.category === 'school' ? 'all' : 'tech'}
        onSelectTab={(tab) => {
          if (tab === 'all') {
            setAllJobsOpen(true);
            return;
          }
          setAllJobsOpen(false);
          const el = document.getElementById('roles');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectRole={handleOpenRole}
        onOpenAllJobs={() => setAllJobsOpen(true)}
      />

      {/* Main Page Content */}
      <Breadcrumbs items={breadcrumbItems} onSelect={handleBreadcrumbSelect} />

      <main className="flex-1 overflow-x-hidden">
        <Hero
          onScrollToRoles={handleScrollToRoles}
          onScrollToHow={handleScrollToHow}
        />

        <HighlightsStrip />

        <TwoRolesSection
          onOpenWorkPack={handleOpenWorkPack}
          onOpenRole={handleOpenRole}
        />

        <HowItWorks onOpenAllJobs={() => setAllJobsOpen(true)} />
        <QuestionsContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenAllJobs={() => setAllJobsOpen(true)} />

      {/* Interactive Modals */}
      {activeWorkPackRole && (
        <WorkPackModal
          roleId={activeWorkPackRole}
          onClose={() => setActiveWorkPackRole(null)}
        />
      )}

      {activeRoleDetails && (
        <RoleDetailsModal
          role={activeRoleDetails}
          onClose={() => setActiveRoleDetails(null)}
          onOpenWorkPack={handleOpenWorkPack}
        />
      )}

      {allJobsOpen && (
        <AllJobsModal
          onClose={() => setAllJobsOpen(false)}
          onSelectRole={handleOpenRole}
        />
      )}
    </div>
  );
}
