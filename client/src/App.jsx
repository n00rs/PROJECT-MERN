import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
// import "./App.css";
import Layout from "./components/UI/Layout";
import ChatRoom from "./pages/ChatRoom";
import EmailRedirect from "./pages/EmailRedirect";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

function App() {
  const a = useSelector((state) => state.auth);
  console.log(a.userExist);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<LandingPage />} />

        <Route path="/chat" element={<ChatRoom />} />

        <Route path="/emailVerify/:token" element={<EmailRedirect />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
