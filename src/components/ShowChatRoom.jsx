import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const ShowChatRoom = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatHeader />
      <Messages />
      <MessageInput />
    </div>
  );
};

export default ShowChatRoom;
