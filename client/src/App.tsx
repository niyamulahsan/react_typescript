import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateOutlet from "./PrivateOutlet";
import PublicOutlet from "./PublicOutlet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import { userMe } from "./store/auth/authApi";
import { useAppDispatch } from "./store";
import { setAuth } from "./store/auth/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(userMe()).then((res) => {
        if (res.payload.auth) {
          dispatch(setAuth(true));
        } else {
          dispatch(setAuth(false));
        }
      });
    })();
  }, []);

  // console.log(auth);

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/*" element={<PublicOutlet />}>
            <Route path="/*" element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            <Route path="resetpassword/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="/*" element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
