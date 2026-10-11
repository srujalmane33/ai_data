import  { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export default function CreateProjectPage({ onNavigate }) {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState({
    name: '',
    project_type: 'AI Data Center',
    capacity_mw: '',
    commissioning_year: new Date().getFullYear() + 2,
    cooling_type: 'Liquid Cooling',
    renewable_requirement_pct: '80',
    expansion_mw: '0',
    water_sensitivity: 'Medium',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const capacity = parseFloat(formData.capacity_mw);
    const expansion = parseFloat(formData.expansion_mw);
    const renewable = parseFloat(formData.renewable_requirement_pct);
    const year = parseInt(formData.commissioning_year, 10);

    // Explicit Phase 1 Validation Rules
    if (isNaN(capacity) || capacity <= 0) {
      setError('Capacity must be a positive number (> 0 MW)');
      return;
    }
    if (isNaN(expansion) || expansion < 0) {
      setError('Expansion capacity must be 0 MW or greater');
      return;
    }
    if (isNaN(renewable) || renewable < 0 || renewable > 100) {
      setError('Renewable requirement percentage must be between 0 and 100');
      return;
    }
    if (isNaN(year) || year < 2000 || year > 2100) {
      setError('Please provide a valid commissioning year (2000–2100)');
      return;
    }

    const created = addProject({
      name: formData.name,
      project_type: formData.project_type,
      capacity_mw: capacity,
      commissioning_year: year,
      cooling_type: formData.cooling_type,
      renewable_requirement_pct: renewable,
      expansion_mw: expansion,
      water_sensitivity: formData.water_sensitivity,
    });

    onNavigate('workspace', created.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create Project Requirements</h2>
          <button onClick={() => onNavigate('projects')} className="text-sm text-gray-500 hover:text-gray-800">
            Cancel
          </button>
        </div>

        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Western India AI Cloud Campus"
              className="w-full border rounded-md p-2 text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                name="project_type"
                className="w-full border rounded-md p-2 text-sm bg-white"
                value={formData.project_type}
                onChange={handleChange}
              >
                <option value="AI Data Center">AI Data Center</option>
                <option value="Hyperscale Cloud">Hyperscale Cloud</option>
                <option value="Enterprise DC">Enterprise DC</option>
                <option value="Edge AI Facility">Edge AI Facility</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (MW)</label>
              <input
                type="number"
                name="capacity_mw"
                required
                min="0.1"
                step="any"
                placeholder="100"
                className="w-full border rounded-md p-2 text-sm"
                value={formData.capacity_mw}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commissioning Year</label>
              <input
                type="number"
                name="commissioning_year"
                required
                className="w-full border rounded-md p-2 text-sm"
                value={formData.commissioning_year}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cooling Type</label>
              <select
                name="cooling_type"
                className="w-full border rounded-md p-2 text-sm bg-white"
                value={formData.cooling_type}
                onChange={handleChange}
              >
                <option value="Liquid Cooling">Liquid Cooling (Direct-to-Chip)</option>
                <option value="Air Cooled Chiller">Air Cooled Chiller</option>
                <option value="Hybrid Evaporative">Hybrid Evaporative</option>
                <option value="Immersion Cooling">Immersion Cooling</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Renewable Requirement (%)</label>
              <input
                type="number"
                name="renewable_requirement_pct"
                required
                min="0"
                max="100"
                className="w-full border rounded-md p-2 text-sm"
                value={formData.renewable_requirement_pct}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Planned Expansion (MW)</label>
              <input
                type="number"
                name="expansion_mw"
                required
                min="0"
                step="any"
                className="w-full border rounded-md p-2 text-sm"
                value={formData.expansion_mw}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Water Sensitivity</label>
            <select
              name="water_sensitivity"
              className="w-full border rounded-md p-2 text-sm bg-white"
              value={formData.water_sensitivity}
              onChange={handleChange}
            >
              <option value="Low">Low (Air cooling / closed-loop prioritized)</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Strict conservation area)</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Save Project Requirements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}