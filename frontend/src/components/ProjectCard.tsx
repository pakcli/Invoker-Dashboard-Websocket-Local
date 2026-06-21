import React from 'react';
import { Github, Folder, FileText } from 'lucide-react';
import { PortfolioEntry } from '../types';
import { getSkillGradient } from '../lib/skillGradient';

interface CardProps {
  entry: PortfolioEntry;
  onOpenFolder: (path: string) => void;
  onMore: (entry: PortfolioEntry) => void;
}

export const ProjectCard: React.FC<CardProps> = ({ entry, onOpenFolder, onMore }) => {
  const gradient = getSkillGradient(entry.skill);

  return (
    <div className="dark:bg-[#12161b] bg-white border dark:border-slate-800/80 border-slate-200 rounded-lg p-5 hover:border-blue-500/50 dark:hover:border-slate-600 transition-all duration-300 shadow-md group aspect-[4/3] max-w-[512px] w-full flex flex-col justify-between mx-auto md:mx-0">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-start mb-2 gap-3">
          <h3 className="text-md font-bold dark:text-slate-100 text-slate-800 group-hover:text-blue-500 dark:group-hover:text-quas transition-colors line-clamp-1">
            {entry.title}
          </h3>
          <span className="text-[9px] tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
            PROJECT
          </span>
        </div>
        
        {/* Skill Underline Gradient */}
        <div className="h-[3px] w-full rounded-full mb-3 shrink-0" style={{ background: gradient }} />

        {entry.imgPath ? (
          <div className="w-full flex-1 min-h-0 rounded overflow-hidden mb-3 border dark:border-slate-800 border-slate-200 bg-slate-900/50 flex items-center justify-center">
            <img 
              src={entry.imgPath} 
              alt={entry.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className="w-full flex-1 min-h-0 rounded mb-3 border border-dashed dark:border-slate-800 border-slate-200 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs">
            No image preview available
          </div>
        )}

        <div className="text-[11px] dark:text-slate-400 text-slate-500 mb-3 shrink-0">
          <span className="font-semibold">Date:</span> {entry.datestart} {entry.dateend ? `→ ${entry.dateend}` : '→ Present'}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs shrink-0 pt-2 border-t dark:border-slate-800/50 border-slate-100">
        <button 
          onClick={() => onMore(entry)} 
          className="flex items-center gap-1 px-2.5 py-1.5 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-200 text-slate-700 rounded transition-colors"
        >
          <FileText size={12} />
          <span>More</span>
        </button>
        <button 
          onClick={() => onOpenFolder(entry.folderPath)} 
          className="flex items-center gap-1 px-2.5 py-1.5 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-200 text-slate-700 rounded transition-colors"
        >
          <Folder size={12} />
          <span>Folder</span>
        </button>
        {entry.github && (
          <a 
            href={entry.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 px-2.5 py-1.5 dark:bg-slate-800 bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-200 text-slate-700 rounded transition-colors"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
