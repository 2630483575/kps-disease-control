"use client";
import { Input } from "antd";
import type { GetProps } from "antd";
import RoleMenu from "./RoleMenu";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function RoleComponent() {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <>
      <div className="w-full h-100px">
        <Search placeholder="请输入部门名称" onSearch={onSearch} size="large" />
      </div>
      <div className="flex-1 w-full">
        <RoleMenu />
      </div>
    </>
  );
}
