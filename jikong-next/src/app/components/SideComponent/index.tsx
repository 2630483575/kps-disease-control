"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "系统管理",
    icon: <DesktopOutlined />,
    children: [
      { key: "1", label: "用户管理" },
      { key: "2", label: "字典维护" },
      { key: "3", label: "权限管理" },
    ],
  },
];
export default function Side() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
