import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/UI/Layout";
import { EachBlog } from "./components/user/blog/EachBlog";
import { NewBlog } from "./components/user/blog/NewBlog";
import Blog from "./pages/Blog";
import ChatRoom from "./pages/ChatRoom";
import EmailRedirect from "./pages/EmailRedirect";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const a = useSelector((state) => state.auth);
  console.log(a.userExist);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/blogs" >
          <Route index element={<Blog />} />
          <Route path=":blogid" element={<EachBlog />} />
          <Route path="newBlog" element={<NewBlog />} />

        </Route>
        <Route path="/emailVerify/:token" element={<EmailRedirect />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
