import useFetch from "../hooks/useFetch";
import MainSearch from "./MainSearch";
import { useState } from "react";

const ListChatRooms = () => {
  const { data, isPending, error } = useFetch("/chat_rooms");
  const [isSearching, setIsSearching] = useState(false);
  return (
    <>
      <MainSearch />
      {!isSearching && (
        <div>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && data["chat_rooms"] && (
            <ul className="list-none">
              {data["chat_rooms"].map((chat_room) => (
                <li key={chat_room.id} className="p-6 border-b">
                  <div className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer">
                    <img
                      src={chat_room.avatar_url}
                      alt={chat_room.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-grow">
                      <div className="font-semibold">{chat_room.name}</div>
                      <div className="text-gray-600">
                        {chat_room.lastMessage}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default ListChatRooms;
