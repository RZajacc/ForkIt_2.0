import AppNav from "./navigation/AppNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function Root() {
  return (
    <>
      <AppNav />
      <Outlet />
      <Footer />
    </>
  );
}
