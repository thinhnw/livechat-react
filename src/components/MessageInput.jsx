import { useParams } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { useState } from "react";

const MessageInput = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    if (e.key !== "Enter") return;
    try {
      const new_message = await apiFetch("/messages", {
        method: "POST",
        body: JSON.stringify({
          content: message,
          chat_room_id: id
        }),
      });
      if (new_message) {
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <footer className="p-4 border-t">
      <input
        type="text"
        placeholder="Type a message"
        className="w-full bg-gray-100 rounded-3xl py-2 px-4 outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={sendMessage}
      />
    </footer>
  );
};

export default MessageInput;
