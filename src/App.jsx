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
      element: <UserMeProvider><Main /></UserMeProvider>
    },
    {
      path: "/r/:id",
      element: <UserMeProvider><ShowChatRoom /></UserMeProvider>
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
