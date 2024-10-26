import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { BsStars } from "react-icons/bs";

import { useAppDispatch } from "../store";
import { resetPassword } from "../store/auth/authApi";

export interface ResetInterface {
  token: string | void;
  password: string;
  confirm_password: string;
};

const ResetPassword: React.FC = () => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState<ResetInterface>({ token: "", password: "", confirm_password: "" });
  const [err, setErr] = useState<any>();
  const [msg, setMsg] = useState<string>("");
  const { token } = useParams();

  const dispatch = useAppDispatch();

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = (e: React.SyntheticEvent) => {
    e.preventDefault(); const data: ResetInterface = {
      token: token,
      password: field.password,
      confirm_password: field.confirm_password
    };

    dispatch(resetPassword(data)).then((res) => {
      if (res.payload.errors) {
        let er: any = {};
        for (let i = 0; i < res.payload.errors.length; i++) {
          const k = res.payload.errors[i].path;
          const v = res.payload.errors[i].msg;
          er[k] = v;
        }
        setErr(er);
      } else {
        setMsg(res.payload.message);
        setTimeout(() => { setMsg("") }, 2000);
        setField({ token: "", password: "", confirm_password: "" });
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
        <h3 className="text-xl uppercase text-center mb-3">Reset Password</h3>
        {msg &&
          <p className="text-red-500 text-center p-1 px-2 bg-red-100 rounded mb-3">
            {msg}
          </p>
        }
        <form onSubmit={submitData}>
          <Input
            label="New Password"
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
            <Button type="submit" className="btn btn-primary" label="Submit" icon={<BsStars />} />
            <NavLink to="/login" className="text-sm italic">Login</NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;