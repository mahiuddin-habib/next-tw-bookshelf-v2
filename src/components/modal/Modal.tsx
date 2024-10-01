import { useEffect } from 'react';

const Modal = ({
  isModalOpen,
  onClose,
  children,
  className,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen, onClose]);

  if (!isModalOpen) return null;

  return (
    <div
      className={`modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50`}
    >
      <div
        className={`${className} relative m-2 rounded-lg bg-gray-700 p-4 shadow-lg`}
      >
        <button
          className="absolute right-2 top-0 text-2xl font-semibold text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
