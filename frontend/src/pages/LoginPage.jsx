import  { useState } from 'react';
import { useProjects } from '../context/ProjectContext';

export default function LoginPage({ onLoginSuccess }) {
  const { signIn } = useProjects();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name || !orgName) {
      setError('Please fill out all fields.');
      return;
    }
    signIn(email, name, orgName);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">India AI Infrastructure Intelligence</h2>
        <p className="text-sm text-gray-600 mb-6">Phase 1: Foundation Setup</p>

        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., Advisory Infra Partners"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="rahul@advisoryinfra.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm transition-colors"
          >
            Sign In & Create Organization
          </button>
        </form>
      </div>
    </div>
  );
}