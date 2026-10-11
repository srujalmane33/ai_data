import  { useState } from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage';

function MainRouter() {
  const { currentUser } = useProjects();
  const [currentPage, setCurrentPage] = useState('projects');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const navigate = (page, projectId = null) => {
    setCurrentPage(page);
    if (projectId) setSelectedProjectId(projectId);
  };

  if (!currentUser) {
    return <LoginPage onLoginSuccess={() => navigate('projects')} />;
  }

  switch (currentPage) {
    case 'create-project':
      return <CreateProjectPage onNavigate={navigate} />;
    case 'workspace':
      return <ProjectWorkspacePage projectId={selectedProjectId} onNavigate={navigate} />;
    case 'projects':
    default:
      return <ProjectsPage onNavigate={navigate} />;
  }
}

export default function App() {
  return (
    <ProjectProvider>
      <MainRouter />
    </ProjectProvider>
  );
}