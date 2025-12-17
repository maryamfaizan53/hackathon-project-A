// frontend/src/components/Auth/SignupForm.tsx
import React, { useState } from 'react';
import { SignupData, UserPreferences } from '../../types/user';

interface SignupFormProps {
  onSubmit: (data: SignupData) => void;
  isLoading: boolean;
  error: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState<UserPreferences['level']>('beginner');
  const [languages, setLanguages] = useState('');
  const [aiExperience, setAiExperience] = useState<UserPreferences['aiExperience']>('none');
  const [hardwareKnowledge, setHardwareKnowledge] = useState<UserPreferences['hardwareKnowledge']>('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preferences: UserPreferences = {
      level,
      languages: languages.split(',').map(lang => lang.trim()).filter(lang => lang),
      aiExperience,
      hardwareKnowledge,
    };
    onSubmit({ email, password, name, preferences });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>

      <h3 className="text-xl font-bold mt-6 mb-4">Personalization Questions</h3>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
          Your Programming Experience Level:
        </label>
        <select
          id="level"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={level}
          onChange={(e) => setLevel(e.target.value as UserPreferences['level'])}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="languages">
          Programming Languages you know (comma-separated):
        </label>
        <input
          type="text"
          id="languages"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="e.g., Python, JavaScript, C++"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aiExperience">
          Your AI/ML Experience:
        </label>
        <select
          id="aiExperience"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={aiExperience}
          onChange={(e) => setAiExperience(e.target.value as UserPreferences['aiExperience'])}
        >
          <option value="none">None</option>
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hardwareKnowledge">
          Your Hardware Knowledge:
        </label>
        <select
          id="hardwareKnowledge"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={hardwareKnowledge}
          onChange={(e) => setHardwareKnowledge(e.target.value as UserPreferences['hardwareKnowledge'])}
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
