
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import "./App.css";
import Layout from "./components/UI/Layout";
import { GOOGLE_CLIENT_ID } from "./Constant";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
