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
    <div className="flex-1 overflow-y-auto p-5" ref={messagesRef}>
      {messages && (
        <ul className="list-none max-h-screen">
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <li key={message._id} className="mb-1">
                {message.user_id === userMe._id && (
                  <div className="flex justify-end">
                    <div className="bg-violet-400 text-white p-3 rounded-md min-w-[50px] max-w-xs break-words">
                      {message.content}
                    </div>
                  </div>
                )}
                {message.user_id !== userMe._id && (
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-black p-3 rounded-md min-w-[50px] max-w-xs break-words">
                      {message.content}
                    </div>
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
