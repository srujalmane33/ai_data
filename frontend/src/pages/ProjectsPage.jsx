// import React from 'react';
import { useProjects } from '../context/ProjectContext';

export default function ProjectsPage({ onNavigate }) {
  const { projects, currentOrg, signOut } = useProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Projects</h1>
          <p className="text-xs text-gray-500">Organization: {currentOrg?.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('create-project')}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700"
          >
            New Project
          </button>
          <button onClick={signOut} className="text-sm text-gray-500 hover:text-gray-800">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">
        {projects.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects created yet</h3>
            <p className="text-sm text-gray-500 mb-4">Get started by specifying requirements for a new project.</p>
            <button
              onClick={() => onNavigate('create-project')}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
            >
              New Project
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-100 border-b border-gray-200 text-gray-600">
                <tr>
                  <th className="p-4">Project Name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Capacity (MW)</th>
                  <th className="p-4">Commissioning Year</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{project.name}</td>
                    <td className="p-4 text-gray-600">{project.project_type}</td>
                    <td className="p-4 text-gray-600">{project.capacity_mw} MW</td>
                    <td className="p-4 text-gray-600">{project.commissioning_year}</td>
                    <td className="p-4 text-gray-500">{new Date(project.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onNavigate('workspace', project.id)}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Open Project
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}