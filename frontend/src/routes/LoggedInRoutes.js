import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Home from "../pages/Home";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }))
  return user ? <Outlet /> : <Home />
}
