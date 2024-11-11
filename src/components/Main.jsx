import MainSearch from "./MainSearch";
import ListChatRooms from "./ListChatRooms";
import { useState } from "react";
import ListSearchResults from "./ListSearchResults";
const Main = () => {
  const [term, setTerm] = useState("");
  return (
    <div className="bg-white h-screen">
      <MainSearch term={term} setTerm={setTerm} />
      {!term.includes("@") && <ListChatRooms filterTerm={term}/>}
      {term.includes("@") && <ListSearchResults searchTerm={term} />}
    </div>
  );
}
 
export default Main;