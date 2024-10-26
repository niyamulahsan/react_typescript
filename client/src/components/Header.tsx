import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { RootState, useAppDispatch, useAppSelector } from "../store";
import { userLogout } from "../store/auth/authApi";
import { setAuth } from "../store/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { auth, authuser } = useAppSelector((state: RootState) => state.authSlice);

  const navigate = useNavigate();


  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await dispatch(userLogout()).then(() => {
      dispatch(setAuth(false));
      navigate("/home");
    });
  };

  return (
    <>
      <div className="flex py-3 lg:mx-[100px] sm:mx-[0] bg-slate-500">
        <ul className="flex">
          <li className="p-2">
            <NavLink to="/" className={`${auth ? 'hidden' : ''} p-2 rounded`}>
              Home
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard" className={`${auth ? '' : 'hidden'} p-2 rounded`}>
              Dashboard
            </NavLink>
          </li>
        </ul>
        <ul className="flex ml-auto">
          <li className="p-2">
            <NavLink to="/login" className={`${auth ? 'hidden' : ''} p-2 rounded`}>
              Login
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/register" className={`${auth ? 'hidden' : ''} p-2 rounded`}>
              Register
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/logout" className={`${auth ? '' : 'hidden'} p-2 rounded`} onClick={handleLogout}>
              ({authuser && authuser.email}) Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header;
