"use client";
import { Input } from "antd";
import DepMenu from "./DepMenu";
import type { GetProps } from "antd";
import fetchApi from "@/lib/fetchApi";
import axios from "axios";
import { API_BASE_URL } from "@/lib/constants";
import { getAxios } from "@/app/utils/axios";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function DepComponent() {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    getDepList(value);
  };
  const getDepList = async (depName: string) => {
    // axios
    //   .get(`${API_BASE_URL}/cdc/dept/simpleTree?deptName=${depName}`, {
    //     headers: {
    //       Authorization: "Bearer",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    fetchApi.get("/cdc/dept/simpleTree", { deptName: depName }).then((res) => {
      console.log(res);
    });
    // getAxios({
    //   url: `cdc/dept/simpleTree`,
    //   params: { deptName: depName },
    // }).then((res) => {
    //   console.log(res);
    // });
  };
  return (
    <>
      <div className="w-full h-100px">
        <Search placeholder="请输入部门名称" onSearch={onSearch} size="large" />
      </div>
      <div className="flex-1 w-full">
        <DepMenu />
      </div>
    </>
  );
}
