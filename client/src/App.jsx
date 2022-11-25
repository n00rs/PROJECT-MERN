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
// import { ViewEachProd } from "./components/user/shop/ViewProdImg";
import { ShopLayout } from "./components/user/shop/ShopLayout";
import { Category } from "./components/user/shop/Category";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";

function App() {
  var console_head_style =
      'color: #ffbc04; font-size:large; font-weight: bold; font-family:"Inter", sans-serif;',
    console_desc_style =
      'font-size: medium; color: #666; font-weight: light; font-family:"Inter", sans-serif; ',
    console_link_style =
      'font-size: medium; color: #5851D3!important; font-weight: light; font-family:"Inter", sans-serif; ';
  console.log(
    "\n%cwelcome to  ♥'s web$\n%c Check  out here: %chttps://github.com/n00rs\n\n",
    console_head_style,
    console_desc_style,
    console_link_style
  );
  console.log("welcome to  ♥'s web$");
  const { userExist, adminExist } = useSelector((state) => state.auth);

  const userLoader = () => {
    if (!userExist) {
      toast.dark("please login to continue");
      return redirect("/");
    }
  };

  // const adminLoader = () => {
  //   // log
  //   if (!adminExist) {
  //     toast.dark("you are not authorizised ");
  //     return redirect("/admin/login");
  //   } else {
  //    return redirect("/admin/dash");
  //   }
  // };

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
            <Route path="my-blogs" element={<UserBlogs />} loader={userLoader} />
          </Route>

          <Route path="/shop" element={<ShopLayout />}>
            <Route index element={<Shop />} />
            <Route path="products/:category" element={<Category />} />
            <Route path="view-product/:prodId" element={<ViewProduct />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          <Route path="/emailVerify/:token" element={<EmailRedirect />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={<AdminLayout />}
          errorElement={<ErrorPage />}
          // loader={adminLoader}
        >
          <Route index path="dash" element={<DashBoard />} />
          <Route path="add-products" element={<AddProduct />} />
          <Route path="manage-orders" element={<Orders />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
          <Route path="manage-users" element={<ManageUsers />} loader={fetchUsers} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
