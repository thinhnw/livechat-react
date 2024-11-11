import { useParams } from "react-router-dom";
import { useState } from "react";
const MessageInput = ({ sendMessage }) => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    sendMessage(JSON.stringify({
      type: "message",
      message: {
        chat_room_id: id,
        content: message
      }
    }));
    setMessage("");
  };
  return (
    <footer className="p-4 border-t">
      <input
        type="text"
        placeholder="Type a message"
        className="w-full bg-gray-100 rounded-3xl py-2 px-4 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </footer>
  );
};

export default MessageInput;
