import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentOrg, setCurrentOrg] = useState(() => {
    const saved = localStorage.getItem('app_org');
    return saved ? JSON.parse(saved) : null;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('app_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('app_sites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('app_org', JSON.stringify(currentOrg));
  }, [currentOrg]);

  useEffect(() => {
    localStorage.setItem('app_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('app_sites', JSON.stringify(sites));
  }, [sites]);

  const signIn = (email, name, orgName) => {
    const org = {
      id: crypto.randomUUID(),
      name: orgName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const user = {
      id: crypto.randomUUID(),
      organization_id: org.id,
      email,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCurrentOrg(org);
    setCurrentUser(user);
  };

  const signOut = () => {
    setCurrentUser(null);
    setCurrentOrg(null);
  };

  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: crypto.randomUUID(),
      organization_id: currentOrg?.id || 'demo-org',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const addSite = (projectId, siteData) => {
    const newSite = {
      ...siteData,
      id: crypto.randomUUID(),
      project_id: projectId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setSites((prev) => [...prev, newSite]);
    return newSite;
  };

  const getProject = (id) => projects.find((p) => p.id === id);
  const getSitesByProject = (projectId) => sites.filter((s) => s.project_id === projectId);

  return (
    <ProjectContext.Provider
      value={{
        currentUser,
        currentOrg,
        projects,
        signIn,
        signOut,
        addProject,
        addSite,
        getProject,
        getSitesByProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext);