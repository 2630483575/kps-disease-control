"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSideStore } from "@/app/store/useSideStore";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "systemManage",
    label: "系统管理",
    icon: <DesktopOutlined />,
    children: [
      { key: "userManage", label: "用户管理" },
      { key: "dictManage", label: "字典维护" },
      { key: "permissionManage", label: "权限管理" },
    ],
  },
];
export default function Side() {
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveSideMenu(e.key);
  };
  const setActiveSideMenu = useSideStore((state) => state.setSideSelected);
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["userManage"]}
        defaultOpenKeys={["systemManage"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
