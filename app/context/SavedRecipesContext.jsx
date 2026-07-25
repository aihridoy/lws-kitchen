'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getSavedIds, toggleSavedId } from '../lib/savedRecipes';

const SavedRecipesContext = createContext(null);

export function SavedRecipesProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());

  useEffect(() => {
    setSavedIds(new Set(getSavedIds()));
  }, []);

  const toggleSaved = useCallback((id) => {
    const next = toggleSavedId(id);
    setSavedIds(new Set(next));
  }, []);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  return (
    <SavedRecipesContext.Provider value={{ savedIds, isSaved, toggleSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export function useSavedRecipes() {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useSavedRecipes must be used within SavedRecipesProvider');
  }
  return context;
}
