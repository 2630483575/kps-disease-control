"use client";
import { useDictLeftMenuStore } from "@/app/store/useDictStore";
import { leftDictMenu } from "@/app/types/dict";
import { Menu } from "antd";
import type { MenuProps } from "antd";
interface fileMenuProps {
  menu: leftDictMenu[];
}
export default function FileMenu({ menu }: fileMenuProps) {
  const dictLeftSelected = useDictLeftMenuStore(
    (state) => state.dictLeftSelected
  );
  const setDictLeftSelected = useDictLeftMenuStore(
    (state) => state.setDictLeftSelected
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setDictLeftSelected(Number(e.key));
  };
  return (
    <>
      <Menu
        onClick={onClick}
        className="w-full h-full"
        mode="inline"
        items={menu}
      />
    </>
  );
}
