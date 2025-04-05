import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import RoleInfo from "./RoleInfo";
import MenuPermission from "./MenuPermission";
import DataPermission from "./DataPermission";
import RelatedUser from "./RelatedUser";

const onChange = (key: string) => {
  console.log(key);
};

const tabItems: TabsProps["items"] = [
  {
    key: "1",
    label: "角色信息",
    children: <RoleInfo />,
  },
  {
    key: "2",
    label: "菜单权限",
    children: <MenuPermission />,
  },
  {
    key: "3",
    label: "数据权限",
    children: <DataPermission />,
  },
  {
    key: "4",
    label: "关联用户",
    children: <RelatedUser />,
  },
];
export default function PermissionComponent() {
  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      onChange={onChange}
      className="h-full"
    />
  );
}
