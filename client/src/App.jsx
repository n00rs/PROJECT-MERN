
import {
  createBrowserRouter,
  createRoutesFromElements,
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<LandingPage />} />
      <Route path="/chat" element={<ChatRoom />} />
      <Route path = '/emailVerify/:token' element={<EmailRedirect/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
