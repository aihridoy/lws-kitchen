'use client';

import { useState } from 'react';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const PdpActions = ({ recipeId }) => {
  const { isSaved, toggleSaved } = useSavedRecipes();
  const [copied, setCopied] = useState(false);
  const saved = isSaved(recipeId);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-3 mb-8 md:mb-12">
      <button onClick={handleShare} className="btn-secondary inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        {copied ? 'Copied!' : 'Share'}
      </button>
      <button
        onClick={() => toggleSaved(recipeId)}
        className="btn-secondary inline-flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={saved ? 0 : 1.5}
            d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
          />
        </svg>
        {saved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default PdpActions;
