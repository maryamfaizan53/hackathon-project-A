// frontend/src/components/EditPageButton.tsx
import React, { useState } from 'react';

interface EditPageButtonProps {
  onEditToggle: (isEditing: boolean) => void;
  onSave: (editedContent: string) => void;
  onCancel: () => void;
  onReset: () => void;
  isEditing: boolean;
  initialContent: string; // The content before editing, to reset to
  pageId: string;
}

const EditPageButton: React.FC<EditPageButtonProps> = ({
  onEditToggle,
  onSave,
  onCancel,
  onReset,
  isEditing,
  initialContent,
  pageId,
}) => {
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleEditClick = () => {
    onEditToggle(true);
    setEditedContent(initialContent); // Initialize edited content when starting edit
  };

  const handleSaveClick = () => {
    onSave(editedContent);
    onEditToggle(false);
  };

  const handleCancelClick = () => {
    onCancel();
    onEditToggle(false);
    setEditedContent(initialContent); // Revert to initial content
  };

  const handleResetClick = () => {
    onReset();
    onEditToggle(false); // Exit edit mode after reset
    setEditedContent(initialContent); // Revert to initial content
  };

  return (
    <div className="edit-page-button-container">
      {isEditing ? (
        <div className="flex space-x-2">
          <button className="button button--primary" onClick={handleSaveClick}>
            Save
          </button>
          <button className="button button--secondary" onClick={handleCancelClick}>
            Cancel
          </button>
          <button className="button button--danger" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      ) : (
        <button className="button button--secondary" onClick={handleEditClick}>
          ✏️ Edit Page
        </button>
      )}
    </div>
  );
};

export default EditPageButton;
