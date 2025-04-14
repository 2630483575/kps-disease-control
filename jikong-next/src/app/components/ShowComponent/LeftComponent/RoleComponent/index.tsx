"use client";
import { Input, message } from "antd";
import type { GetProps } from "antd";
import RoleMenu from "./RoleMenu";
import fetchApi from "@/lib/fetchApi";
import { IRoleData } from "@/app/types/role";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import { useEffect } from "react";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
// 根据接口返回数据转换成menu的格式
const roleColumnConvert: Function = (depList: IRoleData[]) => {
  return depList.map((role, i) => {
    return {
      key: role.roleId,
      label: role.roleName,
    };
  });
};

export default function RoleComponent() {
  const [messageApi, contextHolder] = message.useMessage();
  const leftRoleMenu = useRoleLeftMenuStore((state) => state.leftRoleMenu);
  const needUpdate = useRoleLeftMenuStore((state) => state.needUpdateRoleList);
  const setNeedUpdate = useRoleLeftMenuStore(
    (state) => state.setNeedUpdateRoleList
  );
  const setLeftRoleMenu = useRoleLeftMenuStore(
    (state) => state.setLeftRoleMenu
  );
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    getRoleList(value);
  };
  const getRoleList = (depName: string) => {
    fetchApi
      .get("/system/role/rolesByDeptName", { deptName: depName })
      .then((res) => {
        if (res.code === 200) {
          const leftRoleList = roleColumnConvert(res.data);
          setLeftRoleMenu(leftRoleList);
        } else {
          messageApi.error(res.msg);
        }
      });
  };
  const initRoleList = () => {
    fetchApi.get("/system/role/listRoleAll").then((res) => {
      if (res.code === 200) {
        const leftColumnList = roleColumnConvert(res.data);
        setLeftRoleMenu(leftColumnList);
      } else {
        messageApi.error(res.msg);
      }
    });
  };
  useEffect(() => {
    initRoleList();
  }, []);
  useEffect(() => {
    if (needUpdate) {
      initRoleList();
    }
  }, [needUpdate]);
  return (
    <>
      {contextHolder}
      <div className="overflow-auto">
        <div className="w-full h-100px">
          <Search
            placeholder="请输入部门名称"
            onSearch={onSearch}
            size="large"
          />
        </div>
        <div className="flex-1 w-full">
          <RoleMenu menuItems={leftRoleMenu} getRoleList={getRoleList} />
        </div>
      </div>
    </>
  );
}
