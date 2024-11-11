// Notification.js
import { useEffect } from 'react';

function Notification({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [duration, onClose]);

  // Define Tailwind classes based on the type of notification
  const baseStyles = "flex items-center justify-between p-4 rounded-lg shadow-md text-white mb-4";
  const typeStyles = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-lg font-bold focus:outline-none hover:text-gray-200">
        ✖
      </button>
    </div>
  );
}

export default Notification;
