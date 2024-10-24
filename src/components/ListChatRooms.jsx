import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const ListChatRooms = ({ filterTerm }) => {
  const { data, isPending, error } = useFetch("/chat_rooms");
  return (
    <>
      <div>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {data && data["chat_rooms"] && (
          <ul className="list-none">
            {data["chat_rooms"]
              .filter((chat_room) => chat_room.name.includes(filterTerm))
              .map((chat_room) => (
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
    </>
  );
};

ListChatRooms.propTypes = {
  filterTerm: PropTypes.string,
};

export default ListChatRooms;
