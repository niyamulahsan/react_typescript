import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { BsSave } from "react-icons/bs";

import { useAppDispatch } from "../store";
import { userRegister } from "../store/auth/authApi";

export interface RegisterInterface {
  name?: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register: React.FC = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState<RegisterInterface>({ name: "", email: "", password: "", confirm_password: "" });
  const [err, setErr] = useState<any>();
  const [msg, setMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: RegisterInterface = {
      name: field.name,
      email: field.email,
      password: field.password,
      confirm_password: field.confirm_password
    };

    dispatch(userRegister(data)).then((res) => {
      if (res.payload.errors) {
        let er: any = {};
        for (let i = 0; i < res.payload.errors.length; i++) {
          const k = res.payload.errors[i].path;
          const v = res.payload.errors[i].msg;
          er[k] = v;
        }
        setErr(er);
      } else {
        setMsg(res.payload.msg);
        setTimeout(() => { setMsg("") }, 2000);
        setField({ name: "", email: "", password: "", confirm_password: "" });
        setErr([]);
      }
    });
  };

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <>
      <div className="w-[350px] shadow-sm rounded border border-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 py-12">
        <h3 className="text-xl uppercase text-center mb-3">Register</h3>
        {msg && (
          <p className="text-green-500 text-center p-1 px-2 bg-green-100 rounded mb-3">
            {msg}
          </p>
        )}
        <form onSubmit={submitData}>
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Jhon Doe"
            ref={focusRef}
            name="name"
            onChange={handleField}
            value={field.name}
            err={err?.name}
          />
          <Input
            label="Email"
            id="email"
            type="text"
            placeholder="jhondoe@gmail.com"
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
            name="password"
            onChange={handleField}
            value={field.password}
            err={err?.password}
          />
          <Input
            label="Confirm Password"
            id="confirmpassword"
            type="password"
            placeholder="********"
            name="confirm_password"
            onChange={handleField}
            value={field.confirm_password}
            err={err?.confirm_password}
          />
          <div className="flex items-center justify-between">
            <Button type="submit" className="btn btn-primary" label="Sign Up" icon={<BsSave />} />
            <NavLink to="/login" className="text-sm italic">Login</NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;