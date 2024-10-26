import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaRegPaperPlane } from "react-icons/fa";

import { useAppDispatch } from "../store";
import { forgetPassword } from "../store/auth/authApi";

export interface ForgetInterface {
  email: string;
};

const ForgetPassword: React.FC = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState<ForgetInterface>({ email: "" });
  const [err, setErr] = useState<any>();
  const [msg, setMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: ForgetInterface = { email: field.email };

    dispatch(forgetPassword(data)).then((res) => {
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
        setField({ email: "" });
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
        <h3 className="text-xl uppercase text-center mb-3">Forget Password</h3>
        {msg &&
          <p className="text-green-500 text-center p-1 px-2 bg-green-100 rounded mb-3">
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
          <div className="flex items-center justify-between">
            <Button type="submit" className="btn btn-primary" label="Submit" icon={<FaRegPaperPlane />} />
            <NavLink to="/login" className="text-sm italic">Login</NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
