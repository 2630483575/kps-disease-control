"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSideStore } from "@/app/store/useSideStore";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "System",
    label: "系统管理",
    icon: <DesktopOutlined />,
    children: [
      { key: "User", label: "用户管理" },
      { key: "Dict", label: "字典维护" },
      { key: "Perm", label: "权限管理" },
    ],
  },
];
export default function Side() {
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveSideMenu(e.key);
    router.push(`/System/${e.key}`);
  };
  const setActiveSideMenu = useSideStore((state) => state.setSideSelected);
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["Perm"]}
        defaultOpenKeys={["System"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
