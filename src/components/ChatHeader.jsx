import Prop from 'prop-types';
const ChatHeader = ({ avatar_url, name }) => {
  return (  
    <div className="flex items-center p-2 border-b hover:bg-gray-100 cursor-pointer">
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

ChatHeader.propTypes = {
  avatar_url: Prop.string.isRequired,
  name: Prop.string.isRequired
}
 
export default ChatHeader;