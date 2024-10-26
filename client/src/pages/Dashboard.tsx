import React from "react";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store/index";
import { fetchData, createData, fetchSingleData, updateSingleData, deleteSingleData } from "../store/info/infoApi";

import Input from "../components/Input";
import Button from "../components/Button";
import { FaRegEdit, FaRegTrashAlt, FaSave } from "react-icons/fa";


export interface InfoInterface {
  _id?: number | string;
  name: string;
  mobile: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [field, setField] = useState<InfoInterface>({ _id: "", name: "", mobile: "", email: "" });
  const [err, setErr] = useState<any>();
  const [msg, setMsg] = useState<string>("");

  const { infos } = useAppSelector((state: RootState) => state.infoSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField({ ...field, [name]: value });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: InfoInterface = {
      _id: field._id,
      name: field.name,
      mobile: field.mobile,
      email: field.email
    };

    if (field._id) {
      dispatch(updateSingleData(data)).then((res) => {
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
          setField({ _id: "", name: "", mobile: "", email: "" });
          setErr([]);
          dispatch(fetchData());
        }
      });
    } else {
      delete data["_id"];
      await dispatch(createData(data)).then((res) => {
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
          setField({ _id: "", name: "", mobile: "", email: "" });
          setErr([]);
          dispatch(fetchData());
        }
      });
    }
  };

  const singleData = async (id: string) => {
    dispatch(fetchSingleData(id)).then((res) => {
      setField({ _id: res.payload._id, name: res.payload.name, mobile: res.payload.mobile, email: res.payload.email });
      // console.log(res);
    });
  };

  const deleteData = async (id: string) => {
    dispatch(deleteSingleData(id)).then(() => {
      dispatch(fetchData());
    });
  };

  return (
    <>
      <div className="w-[600px] mx-auto bg-white mt-6 p-3">
        {msg && (
          <div className="p-1 bg-green-300 mb-1 rounded text-xs text-center">
            {msg}
          </div>
        )}
        <form onSubmit={submitData}>
          <div className="shadow-sm rounded-sm">
            <Input
              type="hidden"
              id="id"
              placeholder="ID..."
              name="id"
              onChange={handleField}
              value={field._id}
            />
            <div className="flex gap-x-2">
              <Input
                label="Name"
                type="text"
                id="name"
                placeholder="Name..."
                name="name"
                onChange={handleField}
                value={field.name}
                err={err?.name}
              />
              <Input
                label="Mobile"
                type="text"
                id="mobile"
                placeholder="Mobile..."
                name="mobile"
                onChange={handleField}
                value={field.mobile}
                err={err?.mobile}
              />
              <Input
                label="Email"
                type="text"
                id="email"
                placeholder="Email..."
                name="email"
                onChange={handleField}
                value={field.email}
                err={err?.email}
              />
            </div>
            <Button
              type="submit"
              label="Save"
              className="btn btn-primary w-full text-center flex justify-center"
              icon={<FaSave />}
            />
          </div>
        </form>
      </div>
      <div className="bg-white p-3 mx-auto mt-6 rounded-sm">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {infos.result && infos?.result.map((data: InfoInterface) => (
              <tr className="text-center" key={data._id}>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.mobile}</td>
                <td>{data.email}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <Button className="btn btn-warning" icon={<FaRegEdit />} onClick={() => singleData(`${data._id}`)} />
                    <Button className="btn btn-danger" icon={<FaRegTrashAlt />} onClick={() => deleteData(`${data._id}`)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;