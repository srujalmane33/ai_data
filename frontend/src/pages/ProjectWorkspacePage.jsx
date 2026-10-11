import  { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export default function ProjectWorkspacePage({ projectId, onNavigate }) {
  const { getProject, getSitesByProject, addSite } = useProjects();
  const project = getProject(projectId);
  const candidateSites = getSitesByProject(projectId);

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [formError, setFormError] = useState('');

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p>Project not found.</p>
        <button onClick={() => onNavigate('projects')} className="mt-4 text-blue-600 underline">
          Return to Projects
        </button>
      </div>
    );
  }

  const handleSaveSite = (e) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    // Explicit geographic bounds validation
    if (isNaN(lat) || lat < -90 || lat > 90) {
      setFormError('Latitude must be a valid coordinate between -90 and 90');
      return;
    }
    if (isNaN(lng) || lng < -180 || lng > 180) {
      setFormError('Longitude must be a valid coordinate between -180 and 180');
      return;
    }

    addSite(projectId, {
      name: siteName,
      latitude: lat,
      longitude: lng,
    });

    setSiteName('');
    setLatitude('');
    setLongitude('');
    setFormError('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Workspace Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('projects')} className="text-gray-500 hover:text-gray-700 text-sm">
            &larr; Projects
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-xs text-gray-500">Project Workspace</p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Candidate Site
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-6 px-4 space-y-6">
        {/* Project Information Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Project Requirements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block">Type</span>
              <span className="font-medium text-gray-900">{project.project_type}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Capacity</span>
              <span className="font-medium text-gray-900">{project.capacity_mw} MW</span>
            </div>
            <div>
              <span className="text-gray-500 block">Expansion</span>
              <span className="font-medium text-gray-900">{project.expansion_mw} MW</span>
            </div>
            <div>
              <span className="text-gray-500 block">Commissioning</span>
              <span className="font-medium text-gray-900">{project.commissioning_year}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Cooling</span>
              <span className="font-medium text-gray-900">{project.cooling_type}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Renewables</span>
              <span className="font-medium text-gray-900">{project.renewable_requirement_pct}%</span>
            </div>
            <div>
              <span className="text-gray-500 block">Water Sensitivity</span>
              <span className="font-medium text-gray-900">{project.water_sensitivity}</span>
            </div>
          </div>
        </div>

        {/* Candidate Sites Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-900">Candidate Sites</h2>
            <span className="text-xs text-gray-500">{candidateSites.length} site(s) saved</span>
          </div>

          {candidateSites.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-md p-8 text-center">
              <p className="text-sm text-gray-500 mb-3">No candidate sites entered yet for this project.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                + Add first candidate site
              </button>
            </div>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-md">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                  <tr>
                    <th className="p-3">Site Name</th>
                    <th className="p-3">Latitude</th>
                    <th className="p-3">Longitude</th>
                    <th className="p-3">Saved Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidateSites.map((site) => (
                    <tr key={site.id}>
                      <td className="p-3 font-medium text-gray-900">{site.name}</td>
                      <td className="p-3 text-gray-600">{site.latitude}</td>
                      <td className="p-3 text-gray-600">{site.longitude}</td>
                      <td className="p-3 text-gray-500">{new Date(site.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add Site Modal (Strictly No Map, standard form inputs) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Candidate Site</h3>
            {formError && <div className="p-2 mb-3 text-xs text-red-700 bg-red-100 rounded">{formError}</div>}
            <form onSubmit={handleSaveSite} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Site Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dholera SIR Plot A"
                  className="w-full border rounded-md p-2 text-sm"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Latitude (-90 to 90)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="22.2442"
                    className="w-full border rounded-md p-2 text-sm"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Longitude (-180 to 180)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="72.1931"
                    className="w-full border rounded-md p-2 text-sm"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border rounded-md text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  Save Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}