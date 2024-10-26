import { Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useAppSelector, RootState } from "./store/index";

export default function PublicOutlet() {
  const { auth } = useAppSelector((state: RootState) => state.authSlice);

  return !auth ? (
    <>
      <div className="wrapper">
        <Header />
        <div className="mainbody">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <Navigate to="dashboard" />
    </>
  );
}
