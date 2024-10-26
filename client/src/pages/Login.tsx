import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { IoIosLogIn } from "react-icons/io";

import { useAppDispatch } from "../store";
import { userLogin, userMe } from "../store/auth/authApi";
import { setAuth } from "../store/auth/authSlice";

export interface LoginInterface {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState<LoginInterface>({ email: "", password: "" });
  const [err, setErr] = useState<any>();
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: LoginInterface = {
      email: field.email,
      password: field.password
    };

    const result: any = await dispatch(userLogin(data));
    if (result.payload.msg) {
      setMsg(result.payload.msg);
      setTimeout(() => { setMsg("") }, 3000);
    } else {
      setField({ email: "", password: "" });
      setErr([]);
      await dispatch(userMe()).then((res) => {
        if (res.payload.auth) {
          dispatch(setAuth(true));
          navigate("/dashboard");
        } else {
          dispatch(setAuth(false));
        }
      });
    }
  };

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <>
      <div className="w-[350px] shadow-sm rounded border border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-12">
        <h3 className="text-xl uppercase text-center mb-3">Login</h3>
        {msg &&
          <p className="text-red-500 text-center p-1 px-2 bg-red-100 rounded mb-3">
            {msg}
          </p>
        }
        <form onSubmit={submitData}>
          <Input
            label="Email"
            id="email"
            type="text"
            placeholder="jhondoe@gmail.com"
            ref={focusRef}
            name="email"
            onChange={handleField}
            value={field.email}
            err={err?.email}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="********"
            hood={<NavLink to="/forgetpassword" className="text-xs italic">Forget password</NavLink>}
            name="password"
            onChange={handleField}
            value={field.password}
            err={err?.password}
          />
          <div className="flex items-center justify-between">
            <Button type="submit" label="Sign In" className="btn btn-primary" icon={<IoIosLogIn />} />
            <NavLink to="/register" className="text-sm italic">Don't hava an account ?</NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
