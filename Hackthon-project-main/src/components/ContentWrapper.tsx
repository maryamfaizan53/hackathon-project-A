// frontend/src/components/ContentWrapper.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { authService } from '../services/authService';
import { User } from '../types/user';
import PersonalizeButton from './PersonalizeButton';
import EditPageButton from './EditPageButton';
import { getPersonalizedContent } from '../services/geminiService';
import { getEditedContent, saveEditedContent, deleteEditedContent } from '../utils/editedContentManager';
import { useLocation } from '@docusaurus/router';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [personalizeError, setPersonalizeError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const pageId = location.pathname;

  // Initialize user on client side only
  useEffect(() => {
    setCurrentUser(authService.getUser());
  }, []);

  // Update current user on auth status change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = () => {
      setCurrentUser(authService.getUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Capture original content after render
  useEffect(() => {
    if (contentRef.current && !originalContent) {
      setTimeout(() => {
        if (contentRef.current) {
          const original = contentRef.current.innerHTML;
          setOriginalContent(original);

          // Load saved content if exists
          if (currentUser?.userId) {
            const savedContent = getEditedContent(currentUser.userId, pageId);
            if (savedContent) {
              setPersonalizedContent(savedContent);
            }
          }
        }
      }, 100);
    }
  }, [children, currentUser, pageId]);

  // Clear personalized content when page changes
  useEffect(() => {
    setPersonalizedContent(null);
    setOriginalContent('');
    setPersonalizeError(null);
  }, [location.pathname]);

  // Personalization Logic
  const handlePersonalize = useCallback(async () => {
    if (!currentUser || !currentUser.preferences) {
      setPersonalizeError("Please login and set your preferences first.");
      return;
    }

    if (!contentRef.current) {
      setPersonalizeError("Content is not loaded yet. Please wait and try again.");
      return;
    }

    setIsPersonalizing(true);
    setPersonalizeError(null);

    try {
      const contentToPersonalize = contentRef.current.innerHTML;

      if (!contentToPersonalize || contentToPersonalize.length < 50) {
        throw new Error("Content is too short to personalize.");
      }

      const personalizedHtml = await getPersonalizedContent(
        contentToPersonalize,
        currentUser.preferences,
        document.title
      );

      setPersonalizedContent(personalizedHtml);
      saveEditedContent(currentUser.userId, pageId, personalizedHtml);
    } catch (err: any) {
      setPersonalizeError(err.message || "Failed to personalize content.");
      console.error("Personalization error:", err);
    } finally {
      setIsPersonalizing(false);
    }
  }, [currentUser, pageId]);

  // Editing Logic
  const handleEditToggle = useCallback((editing: boolean) => {
    setIsEditing(editing);
    if (contentRef.current) {
      contentRef.current.contentEditable = editing ? 'true' : 'false';
      if (editing) {
        contentRef.current.focus();
      }
    }
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (currentUser?.userId && contentRef.current) {
      const editedHtml = contentRef.current.innerHTML;
      saveEditedContent(currentUser.userId, pageId, editedHtml);
      setPersonalizedContent(editedHtml);
    }
    setIsEditing(false);
  }, [currentUser, pageId]);

  const handleCancelEdit = useCallback(() => {
    if (contentRef.current && originalContent) {
      contentRef.current.innerHTML = personalizedContent || originalContent;
    }
    setIsEditing(false);
  }, [originalContent, personalizedContent]);

  const handleResetEdit = useCallback(() => {
    if (currentUser?.userId) {
      deleteEditedContent(currentUser.userId, pageId);
      setPersonalizedContent(null);
    }
    setIsEditing(false);
  }, [currentUser, pageId]);

  return (
    <div className="container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0'
    }}>
      {/* Action Buttons */}
      {currentUser && (
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--ifm-background-surface-color)',
          borderRadius: '8px',
          border: '1px solid var(--ifm-color-emphasis-300)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <PersonalizeButton
            onPersonalize={handlePersonalize}
            isLoading={isPersonalizing}
            error={personalizeError}
          />
          <EditPageButton
            onEditToggle={handleEditToggle}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            onReset={handleResetEdit}
            isEditing={isEditing}
            initialContent={originalContent}
            pageId={pageId}
          />
        </div>
      )}

      {/* Content Area with proper Docusaurus styling */}
      <article className="markdown">
        {personalizedContent ? (
          <div
            ref={contentRef}
            className="theme-doc-markdown"
            dangerouslySetInnerHTML={{ __html: personalizedContent }}
            style={{
              outline: isEditing ? '2px solid var(--ifm-color-primary)' : 'none',
              padding: isEditing ? '16px' : '0',
              borderRadius: isEditing ? '8px' : '0',
              minHeight: '200px',
              backgroundColor: isEditing ? 'var(--ifm-background-surface-color)' : 'transparent'
            }}
          />
        ) : (
          <div
            ref={contentRef}
            className="theme-doc-markdown"
            style={{
              outline: isEditing ? '2px solid var(--ifm-color-primary)' : 'none',
              padding: isEditing ? '16px' : '0',
              borderRadius: isEditing ? '8px' : '0',
              backgroundColor: isEditing ? 'var(--ifm-background-surface-color)' : 'transparent'
            }}
          >
            {children}
          </div>
        )}
      </article>
    </div>
  );
};

export default ContentWrapper;