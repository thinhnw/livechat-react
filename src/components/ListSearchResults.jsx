import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";
import { apiFetch } from "../utils/api";
import { UserMeContext } from "../contexts/UserMeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ListSearchResults = ({ searchTerm }) => {
  const { state } = useContext(UserMeContext);
  const { userMe } = state;
  const {
    data: usersData,
    isPending,
    error,
  } = useFetch("/users?search=" + searchTerm);

  const navigate = useNavigate();

  const createDirectChat = async (partner_id) => {
    try {
      const find_chat = await apiFetch(
        `/chat_rooms/direct?partner_id=${partner_id}`
      );
      console.log(find_chat);
      if (find_chat) {
        navigate(`/r/${find_chat._id}`);
        return
      }
    } catch (error) {
      if (error.message.includes("404")) {
        const new_chat = await apiFetch("/chat_rooms/direct", {
          method: "POST",
          body: JSON.stringify({
            user_ids: [userMe._id, partner_id],
          }),
        });
        if (new_chat) {
          navigate(`/r/${new_chat._id}`);
        }
      }
    }
  };

  return (
    <>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {usersData && (
        <ul className="list-none">
          {usersData["users"].map((user) => (
            <li key={user._id} className="p-6 border-b">
              <div
                className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => createDirectChat(user._id)}
              >
                <img
                  src={user.avatar_url}
                  alt={user.display_name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <div className="font-semibold">{user.display_name}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ListSearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default ListSearchResults;
