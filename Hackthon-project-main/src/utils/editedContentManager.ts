// frontend/src/utils/editedContentManager.ts

const EDITED_PAGES_PREFIX = 'editedPages_';

export const getEditedContent = (userId: string | null, pageId: string): string | null => {
  if (!userId) return null;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  return localStorage.getItem(key);
};

export const saveEditedContent = (userId: string | null, pageId: string, content: string) => {
  if (!userId) return;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  localStorage.setItem(key, content);
};

export const deleteEditedContent = (userId: string | null, pageId: string) => {
  if (!userId) return;
  const key = `${EDITED_PAGES_PREFIX}${userId}_${pageId}`;
  localStorage.removeItem(key);
};
