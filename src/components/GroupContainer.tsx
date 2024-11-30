import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { SiteIcon } from './SiteIcon';
import { Website } from '../types';

interface GroupContainerProps {
  id: string;
  name: string;
  sites: Website[];
  onRenameGroup: (id: string, newName: string) => void;
  onDeleteSite: (siteId: string) => void;
  onRenameSite: (siteId: string, newName: string) => void;
}

export function GroupContainer({
  id,
  name,
  sites,
  onRenameGroup,
  onDeleteSite,
  onRenameSite,
}: GroupContainerProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleRename = () => {
    if (newName.trim()) {
      onRenameGroup(id, newName);
      setIsRenaming(false);
    }
  };

  return (
    <div className="bg-surface/50 backdrop-blur-sm rounded-3xl p-8 relative border border-surface-light/20 shadow-lg transition-all hover:shadow-glow">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-4">
        {sites.map((site) => (
          <SiteIcon
            key={site.id}
            url={site.url}
            name={site.name}
            onDelete={() => onDeleteSite(site.id)}
            onRename={(newName) => onRenameSite(site.id, newName)}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        {isRenaming ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg bg-surface border border-surface-light focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text"
              onKeyPress={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
            />
            <button
              onClick={handleRename}
              className="text-sm text-accent hover:text-accent-light transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-medium text-text">{name}</h2>
            <button
              onClick={() => setIsRenaming(true)}
              className="p-1.5 text-text-secondary hover:text-text rounded-full hover:bg-surface-light transition-all"
            >
              <Pencil size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}