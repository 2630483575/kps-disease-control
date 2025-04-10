"use client";
import { Input } from "antd";
import DepMenu from "./DepMenu";
import type { GetProps } from "antd";
import fetchApi from "@/lib/fetchApi";
import { useEffect } from "react";
import { IdeplistData } from "@/app/types/dep";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
// 根据接口返回数据转换成menu的格式
const depColumnConvert: Function = (depList: IdeplistData[]) => {
  return depList.map((dep, i) => {
    let children = null;

    if (dep.children) {
      children = depColumnConvert(dep.children);
    }

    return {
      key: dep.id,
      label: dep.label,
      children: children,
    };
  });
};

export default function DepComponent() {
  const userLeftMenu = useUserLeftMenuStore((state) => state.userLeftMenu);
  const setUserLeftMenu = useUserLeftMenuStore(
    (state) => state.setUserLeftMenu
  );

  const getDepList = (depName: string) => {
    fetchApi.get("/cdc/dept/simpleTree", { deptName: depName }).then((res) => {
      if (res.code === 200) {
        const leftDepListByName = depColumnConvert(res.data);
        setUserLeftMenu(leftDepListByName);
      }
    });
  };
  const initDepList = () => {
    fetchApi.get("/cdc/dept/list").then((res) => {
      if (res.code === 200) {
        const leftColumnList = depColumnConvert(res.data);
        setUserLeftMenu(leftColumnList);
      }
    });
  };
  useEffect(() => {
    initDepList();
  }, []);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    getDepList(value);
  };
  return (
    <>
      <div className="w-full h-100px">
        <Search placeholder="请输入部门名称" onSearch={onSearch} size="large" />
      </div>
      <div className="flex-1 w-full">
        <DepMenu menuItems={userLeftMenu} />
      </div>
    </>
  );
}
