import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddSiteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string, name: string) => void;
}

export function AddSiteDialog({ isOpen, onClose, onAdd }: AddSiteDialogProps) {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && name) {
      onAdd(url, name);
      setUrl('');
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface rounded-2xl p-8 w-full max-w-md relative border border-surface-light/20 shadow-glow">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-text">Add New Website</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-light border border-surface-light rounded-lg focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text"
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
              Website Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-light border border-surface-light rounded-lg focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text"
              placeholder="My Website"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-text-secondary bg-surface-light rounded-lg hover:bg-surface hover:text-text transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white bg-accent hover:bg-accent-light rounded-lg transition-all"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}