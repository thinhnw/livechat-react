import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ShowChatRoom from "./components/ShowChatRoom";
import ListChatRooms from "./components/ListChatRooms";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthLayout><Login /></AuthLayout>,
    },
    {
      path: "/register",
      element: <AuthLayout><Register /></AuthLayout>,
    },
    {
      path: "/",
      element: <MainLayout><ListChatRooms /></MainLayout>
    },
    {
      path: "/r/:id",
      element: <MainLayout><ShowChatRoom /></MainLayout>
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
