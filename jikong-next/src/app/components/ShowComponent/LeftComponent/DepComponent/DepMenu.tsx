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
    console.log(e);
    setUserLeftGroupSelected(Number(e.keyPath[1]));
    setUserLeftSelected(Number(e.key));
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
