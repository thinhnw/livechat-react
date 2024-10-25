import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { id } = useParams();
  const { data } = useFetch(`/messages?chat_room_id=${id}`);
  return (  
    <div className="flex-1">
      {data && (
        <ul className="list-none">
          {data["messages"].map((message) => (
            <li key={message.id} className="p-6 border-b">
              <div className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer">
                {/* <img
                  src={message.user.avatar_url}
                  alt={message.user.name}
                  className="w-12 h-12 rounded-full mr-3"
                /> */}
                <div className="flex-grow">
                  <div className="font-semibold">{message.user.display_name}</div>
                  <div className="text-gray-600">{message.text}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 
export default Messages;