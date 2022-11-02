import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import { toast } from "react-toastify";
import { DashBoard } from "./components/admin/DashBoard";
import { fetchUsers } from "./pages/admin/ManageUsers";
import { AdminLayout } from "./components/UI/AdminLayout";
import Layout from "./components/UI/Layout";
import { NewBlog } from "./components/user/blog/NewBlog";
import { UserBlogs } from "./components/user/blog/UserBlogs";
import { AddProduct } from "./pages/admin/AddProduct";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageUsers from "./pages/admin/ManageUsers";
import Orders from "./pages/admin/Orders";
import Blog from "./pages/Blog";
import ChatRoom from "./pages/ChatRoom";
import EmailRedirect from "./pages/EmailRedirect";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ManageBlogs from "./pages/admin/ManageBlogs";

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
      <>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<LandingPage />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/blogs">
            <Route index element={<Blog />} />
            <Route path=":blogId" element={<Blog />} />
            <Route path="new-blog" element={<NewBlog />} loader={userLoader} />
            <Route
              path="my-blogs"
              element={<UserBlogs />}
              loader={userLoader}
            />
          </Route>
          <Route path="/shop">
            <Route index element={<Shop />} />
          </Route>
          <Route path="/emailVerify/:token" element={<EmailRedirect />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />} errorElement={<ErrorPage />}>
          <Route index path="dash" element={<DashBoard />} />
          <Route path="add-products" element={<AddProduct />} />
          <Route path="manage-orders" element={<Orders />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />

          <Route
            path="manage-users"
            element={<ManageUsers />}
            loader={fetchUsers}
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
