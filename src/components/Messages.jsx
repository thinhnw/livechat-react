import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserMeContext } from "../contexts/UserMeContext";

const Messages = () => {
  const { id } = useParams();
  const { data } = useFetch(`/messages?chat_room_id=${id}`);
  const { state } = useContext(UserMeContext);
  const { userMe } = state;
  return (
    <div className="flex-1">
      {data && (
        <ul className="list-none">
          {data["messages"]
            .slice()
            .reverse()
            .map((message) => (
              <li key={message.id} className="p-6 border-b">
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

export default Messages;
