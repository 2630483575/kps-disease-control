"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "市控中心",
    children: [
      { key: "1", label: "疫情科" },
      { key: "2", label: "疫情科" },
      { key: "3", label: "疫情科" },
    ],
  },
  {
    key: "sub2",
    label: "市卫建委",
    children: [
      { key: "4", label: "疫情科" },
      { key: "5", label: "疫情科" },
      { key: "6", label: "疫情科" },
    ],
  },
];
export default function DepMenu() {
  const onClick: MenuProps["onClick"] = (e) => {
    setUserLeftMenu(e.key);
  };

  const setUserLeftMenu = useUserLeftMenuStore(
    (state) => state.setUserLeftSelected
  );
  return (
    <>
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </>
  );
}
