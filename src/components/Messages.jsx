import { useContext, useEffect, useRef } from "react";
import { UserMeContext } from "../contexts/UserMeContext";
import PropTypes from "prop-types";

const Messages = ({ messages }) => {
  const { state } = useContext(UserMeContext);
  const { userMe } = state;
  const messagesRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto" ref={messagesRef}>
      {messages && (
        <ul className="list-none max-h-screen">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <li key={message._id} className="p-6 border-b">
                {message.user_id === userMe._id && (
                  <div className="flex items-center p-2 justify-end">
                    <div className="text-gray-600">{message.content}</div>
                  </div>
                )}
                {message.user_id !== userMe._id && (
                  <div className="flex items-center p-2">
                    <div className="text-gray-600">{message.content}</div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array,
};
export default Messages;
