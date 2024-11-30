import React, { useState } from 'react';
import { Plus, Bookmark } from 'lucide-react';
import { AddSiteDialog } from './components/AddSiteDialog';
import { GroupContainer } from './components/GroupContainer';
import { Website, Group } from './types';

function App() {
  const [sites, setSites] = useState<Website[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const handleAddGroup = () => {
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: 'New Group',
    };
    setGroups([...groups, newGroup]);
  };

  const handleAddSite = (url: string, name: string) => {
    if (selectedGroupId) {
      setSites([
        ...sites,
        { id: crypto.randomUUID(), url, name, groupId: selectedGroupId },
      ]);
      setIsDialogOpen(false);
      setSelectedGroupId(null);
    }
  };

  const handleDeleteSite = (id: string) => {
    setSites(sites.filter((site) => site.id !== id));
  };

  const handleRenameSite = (id: string, newName: string) => {
    setSites(
      sites.map((site) => (site.id === id ? { ...site, name: newName } : site))
    );
  };

  const handleRenameGroup = (id: string, newName: string) => {
    setGroups(
      groups.map((group) => (group.id === id ? { ...group, name: newName } : group))
    );
  };

  const handleAddClick = (groupId: string) => {
    setSelectedGroupId(groupId);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <Bookmark className="w-10 h-10 text-accent" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              WebMarks
            </h1>
          </div>
          <p className="text-text-secondary text-lg">
            Organize and access your favorite websites
          </p>
        </header>

        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.id} className="relative group">
              <GroupContainer
                id={group.id}
                name={group.name}
                sites={sites.filter((site) => site.groupId === group.id)}
                onRenameGroup={handleRenameGroup}
                onDeleteSite={handleDeleteSite}
                onRenameSite={handleRenameSite}
              />
              <button
                onClick={() => handleAddClick(group.id)}
                className="absolute top-8 right-8 flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface border border-surface-light/20 flex items-center justify-center group-hover:bg-surface-light transition-all">
                  <Plus className="w-6 h-6 text-text-secondary group-hover:text-text transition-colors" />
                </div>
              </button>
            </div>
          ))}

          <button
            onClick={handleAddGroup}
            className="w-full py-6 border-2 border-dashed border-surface-light/30 rounded-3xl text-text-secondary hover:text-text hover:border-accent/50 transition-all"
          >
            Add New Group
          </button>
        </div>
      </div>

      <AddSiteDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedGroupId(null);
        }}
        onAdd={handleAddSite}
      />
    </div>
  );
}

export default App;