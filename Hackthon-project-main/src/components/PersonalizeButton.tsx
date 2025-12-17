// frontend/src/components/PersonalizeButton.tsx
import React from 'react';

interface PersonalizeButtonProps {
  onPersonalize: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const PersonalizeButton: React.FC<PersonalizeButtonProps> = ({ 
  onPersonalize, 
  isLoading, 
  error 
}) => {
  return (
    <div style={{ flex: 1 }}>
      <button
        className="button button--primary button--block"
        onClick={onPersonalize}
        disabled={isLoading}
        style={{
          width: '100%',
          cursor: isLoading ? 'wait' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? '⏳ Personalizing...' : '🎯 Personalize for My Level'}
      </button>
      {error && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          backgroundColor: 'var(--ifm-color-danger-contrast-background)',
          color: 'var(--ifm-color-danger)',
          borderRadius: '4px',
          fontSize: '14px',
          border: '1px solid var(--ifm-color-danger)'
        }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default PersonalizeButton;