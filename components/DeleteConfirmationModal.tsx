import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Product',
  message = 'Are you sure you want to delete this product?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // close modal if backdrop clicked
    >
      <div
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <h3 className="text-lg font-semibold text-red-600">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
