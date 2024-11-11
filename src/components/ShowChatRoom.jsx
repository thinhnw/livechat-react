import useFetch from "../hooks/useFetch";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ShowChatRoom = () => {
  const { id } = useParams();
  const { data: chatRoom, isPending: isChatRoomPending } = useFetch(
    `/chat_rooms/${id}`
  );
  const {
    data: msgData,
    isPending: isMsgPending,
  } = useFetch(`/messages?chat_room_id=${id}`);
  const [messages, setMessages] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    if (isChatRoomPending || isMsgPending) return;
    setMessages(msgData.messages);
    setIsPending(false);
  }, [isChatRoomPending, isMsgPending]);

  useEffect(() => {

    const socket = new WebSocket(
      import.meta.env.VITE_WS_URL + `/ws/chat_rooms/${id}`
    );

    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket.send(
        JSON.stringify({
          type: "auth",
          token: localStorage.getItem("accessToken"),
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      if (data.type === "message") {
        const message = data.message;
        console.log(message.chat_room_id, message.chat_room_id === id);
        console.log(messages)
        if (message.chat_room_id === id) {
          console.log([message, ...messages])
          setMessages((prev) => [message, ...prev]);
        }
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      socket.close();
    };
  }, [isPending]);

  const sendWsMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <>
      {chatRoom && (
        <div className="flex flex-col h-screen">
          <ChatHeader avatar_url={chatRoom.avatar_url} name={chatRoom.name} />
          <Messages messages={messages} isPending={isPending} />
          <MessageInput sendMessage={sendWsMessage} />
        </div>
      )}
    </>
  );
};

export default ShowChatRoom;
