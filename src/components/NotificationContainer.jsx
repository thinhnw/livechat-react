// NotificationContainer.js
import React, { useState } from 'react';
import Notification from './Notification';

function NotificationContainer() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);

    // Remove notification after its duration
    setTimeout(() => removeNotification(id), duration);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 max-w-xs w-full space-y-2 z-50">
      {notifications.map(({ id, message, type, duration }) => (
        <Notification
          key={id}
          message={message}
          type={type}
          duration={duration}
          onClose={() => removeNotification(id)}
        />
      ))}
      <button
        onClick={() => addNotification('This is a test notification', 'success')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Add Notification
      </button>
    </div>
  );
}

export default NotificationContainer;
