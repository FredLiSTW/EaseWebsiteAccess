import React, { useState } from 'react';
import { 
  MoreVertical, 
  Pencil, 
  Trash2, 
  ExternalLink,
  Globe,
  ShoppingBag,
  Video,
  Music,
  Code,
  BookOpen,
  Mail,
  Image,
  Search,
  Newspaper,
  MessageSquare,
  Building2,
  Heart,
  Gamepad
} from 'lucide-react';

interface SiteIconProps {
  url: string;
  name: string;
  onDelete: () => void;
  onRename: (newName: string) => void;
}

export function SiteIcon({ url, name, onDelete, onRename }: SiteIconProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const [faviconError, setFaviconError] = useState(false);

  const getFaviconUrl = (siteUrl: string) => {
    try {
      const url = new URL(siteUrl);
      return `${url.protocol}//${url.hostname}/favicon.ico`;
    } catch {
      return '';
    }
  };

  const getFallbackIcon = () => {
    const urlLower = url.toLowerCase();
    const nameLower = name.toLowerCase();

    // Common website patterns
    if (urlLower.includes('github') || urlLower.includes('gitlab')) return <Code className="w-6 h-6" />;
    if (urlLower.includes('youtube') || urlLower.includes('vimeo')) return <Video className="w-6 h-6" />;
    if (urlLower.includes('spotify') || urlLower.includes('music')) return <Music className="w-6 h-6" />;
    if (urlLower.includes('amazon') || urlLower.includes('shop')) return <ShoppingBag className="w-6 h-6" />;
    if (urlLower.includes('gmail') || urlLower.includes('mail')) return <Mail className="w-6 h-6" />;
    if (urlLower.includes('flickr') || urlLower.includes('photo')) return <Image className="w-6 h-6" />;
    if (urlLower.includes('google')) return <Search className="w-6 h-6" />;
    if (urlLower.includes('news') || urlLower.includes('blog')) return <Newspaper className="w-6 h-6" />;
    if (urlLower.includes('chat') || urlLower.includes('discord')) return <MessageSquare className="w-6 h-6" />;
    if (urlLower.includes('bank') || urlLower.includes('pay')) return <Building2 className="w-6 h-6" />;
    if (urlLower.includes('game') || urlLower.includes('play')) return <Gamepad className="w-6 h-6" />;
    if (urlLower.includes('docs') || urlLower.includes('wiki')) return <BookOpen className="w-6 h-6" />;
    if (urlLower.includes('love') || urlLower.includes('dating')) return <Heart className="w-6 h-6" />;

    // Fallback to globe icon
    return <Globe className="w-6 h-6" />;
  };

  const handleRename = () => {
    if (newName.trim()) {
      onRename(newName);
      setIsRenaming(false);
    }
  };

  const handleIconClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div
      className="relative group flex items-start space-x-2"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={handleIconClick}
          className="w-12 h-12 relative hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-accent rounded-xl overflow-hidden group"
        >
          {!faviconError ? (
            <img
              src={getFaviconUrl(url)}
              alt={name}
              className="w-full h-full object-contain"
              onError={() => setFaviconError(true)}
            />
          ) : (
            <div className="w-full h-full bg-surface-light flex items-center justify-center text-text-secondary group-hover:text-text transition-colors">
              {getFallbackIcon()}
            </div>
          )}
        </button>
        {isRenaming ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-2 py-1 text-sm bg-surface border border-surface-light rounded-lg focus:border-accent focus:ring-1 focus:ring-accent outline-none text-text"
              onKeyPress={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
            />
            <button
              onClick={handleRename}
              className="text-xs text-accent hover:text-accent-light transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <span className="text-sm text-text-secondary group-hover:text-text transition-colors">
            {name}
          </span>
        )}
      </div>

      {showOptions && !isRenaming && (
        <div className="absolute left-full ml-2 top-0 bg-surface rounded-lg shadow-lg py-1 min-w-[140px] z-10 border border-surface-light/20">
          <button
            onClick={handleIconClick}
            className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:text-text hover:bg-surface-light flex items-center space-x-2 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Open Site</span>
          </button>
          <button
            onClick={() => setIsRenaming(true)}
            className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:text-text hover:bg-surface-light flex items-center space-x-2 transition-colors"
          >
            <Pencil size={16} />
            <span>Rename</span>
          </button>
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-surface-light flex items-center space-x-2 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}