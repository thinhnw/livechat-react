import Prop from 'prop-types';
import { useNavigate } from "react-router-dom";

const ChatRoomHeader = ({ avatar_url, name }) => {
  const navigate = useNavigate();
  return (  
    <div className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer">
      <button className="mr-2" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <img
        src={avatar_url}
        alt={name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div className="flex-grow">
        <div className="font-semibold">{name}</div>
      </div>
    </div>
  );
}

ChatRoomHeader.propTypes = {
  avatar_url: Prop.string.isRequired,
  name: Prop.string.isRequired
}
 
export default ChatRoomHeader;