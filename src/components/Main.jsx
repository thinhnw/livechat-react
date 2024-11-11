import MainSearch from "./MainSearch";
import ListChatRooms from "./ListChatRooms";
import { useState } from "react";
import ListSearchResults from "./ListSearchResults";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [term, setTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userMe");
    navigate("/login")
  };

  return (
    <div className="bg-white h-screen relative">
      <header className="flex px-4 border-b">
        <button onClick={toggleSidebar} className="p-3">☰</button>
        <MainSearch term={term} setTerm={setTerm} />
      </header>
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-800 text-white h-screen p-4 absolute top-0 left-0">
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li onClick={handleLogout} className="cursor-pointer">
                Logout
              </li>
            </ul>
          </nav>
        </aside>
      )}
      {!term.includes("@") && <ListChatRooms filterTerm={term} />}
      {term.includes("@") && <ListSearchResults searchTerm={term} />}
    </div>
  );
};

export default Main;
