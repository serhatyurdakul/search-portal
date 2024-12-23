import { useEffect } from "react";

const ErrorToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className='error-toast'>
      <div className='error-toast-content'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>
        <div className='error-title'>Error while adding link element</div>
        <div className='error-message'>{message}</div>
        <div className='error-badge'>Error</div>
      </div>
    </div>
  );
};

export default ErrorToast;
