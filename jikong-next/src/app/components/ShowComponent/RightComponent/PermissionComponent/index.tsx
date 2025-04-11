import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import RoleInfo from "./RoleInfo";
import MenuPermission from "./MenuPermission";
import DataPermission from "./DataPermission";
import RelatedUser from "./RelatedUser";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";

const tabItems: TabsProps["items"] = [
  {
    key: "roleInfo",
    label: "角色信息",
    children: <RoleInfo />,
  },
  {
    key: "menuPermission",
    label: "菜单权限",
    children: <MenuPermission />,
  },
  {
    key: "dataPermission",
    label: "数据权限",
    children: <DataPermission />,
  },
  {
    key: "relatedUser",
    label: "关联用户",
    children: <RelatedUser />,
  },
];
export default function PermissionComponent() {
  const setTabSelected = useRoleLeftMenuStore((state) => state.setTabSelected);
  const onChange = (key: string) => {
    setTabSelected(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      onChange={onChange}
      className="h-full"
    />
  );
}
