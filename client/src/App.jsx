import { useSelector } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";

import { toast } from "react-toastify";
import Layout from "./components/UI/Layout";
// import { actions as commentAction } from "./components/user/blog/EachBlog";
import { NewBlog } from "./components/user/blog/NewBlog";
import { UserBlogs } from "./components/user/blog/UserBlogs";
import Blog from "./pages/Blog";
import ChatRoom from "./pages/ChatRoom";
import EmailRedirect from "./pages/EmailRedirect";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const { userExist } = useSelector((state) => state.auth);

  const userLoader = () => {
    if (!userExist) {
      toast.dark("please login to continue");
      return redirect("/");
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/blogs">
          <Route index element={<Blog />} />
          <Route path=":blogId" element={<Blog />}  />
          <Route path="new-blog" element={<NewBlog />} loader={userLoader} />
          <Route path="my-blogs" element={<UserBlogs />} loader={userLoader} />
        </Route>
        <Route path="/emailVerify/:token" element={<EmailRedirect />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
