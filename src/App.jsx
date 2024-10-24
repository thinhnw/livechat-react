import Login from "./components/Login";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowChatRoom from "./components/ShowChatRoom";
import ListChatRooms from "./components/ListChatRooms";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <ListChatRooms />
    },
    {
      path: "/r/:id",
      element: <ShowChatRoom /> 
    }
  ])
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white h-full w-11/12 max-w-md shadow-lg">
        <RouterProvider router={router} /> 
      </div>
    </div>
  );
}

export default App;
