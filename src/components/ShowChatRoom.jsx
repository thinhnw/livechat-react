import useFetch from "../hooks/useFetch";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useParams } from "react-router-dom";

const ShowChatRoom = () => {
  const { id } = useParams();
  const { data } = useFetch(`/chat_rooms/${id}`);
  return (
    <>
      {data && (
        <div className="flex flex-col min-h-screen">
          <ChatHeader avatar_url={data.avatar_url} name={data.name} />
          <Messages />
          <MessageInput />
        </div>
      )}
    </>
  );
};

export default ShowChatRoom;
