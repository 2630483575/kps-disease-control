"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { leftDepMenu } from "@/app/types/dep";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";

export default function DepMenu(props: { menuItems: leftDepMenu[] }) {
  const setUserLeftSelected = useUserLeftMenuStore(
    (state) => state.setUserLeftSelected
  );
  const setUserLeftGroupSelected = useUserLeftMenuStore(
    (state) => state.setUserLeftGroupSelected
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setUserLeftGroupSelected(Number(e.key));
    setUserLeftSelected(Number(e.keyPath[1]));
  };

  return (
    <>
      <Menu
        onClick={onClick}
        className="w-full h-full"
        mode="inline"
        items={props.menuItems}
      />
    </>
  );
}
