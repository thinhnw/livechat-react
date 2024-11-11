import Login from "./components/Login";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowChatRoom from "./components/ShowChatRoom";
import Main from "./components/Main";
import { UserMeProvider } from "./contexts/UserMeContext";

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
      element: <UserMeProvider><div className="bg-white h-screen"><Main /></div></UserMeProvider>
    },
    {
      path: "/r/:id",
      element: <UserMeProvider><div className="bg-white h-screen"><ShowChatRoom /></div></UserMeProvider>
    }
  ])
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-neutral-700">
      <div className="h-full w-11/12 max-w-md">
        <RouterProvider router={router} /> 
      </div>
    </div>
  );
}

export default App;
