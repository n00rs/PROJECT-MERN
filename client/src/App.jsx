import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import "./App.css";
import Layout from "./components/UI/Layout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<ErrorPage />}>
      <Route path="/login" element={<Login/>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
