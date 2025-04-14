"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSideStore } from "@/app/store/useSideStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Side() {
  const router = useRouter();
  const sideItems = useSideStore((state) => state.sideMenu);
  const pathName = usePathname();
  const setSideMenu = useSideStore((state) => state.setSideMenu);
  const openKeys = useSideStore((state) => state.activeOpenKeys);
  const setOpenKeys = useSideStore((state) => state.setActiveOpenKeys);

  const onClick: MenuProps["onClick"] = (e) => {
    setActiveSideMenu(e.key);
    router.push(`/${e.keyPath[1]}/${e.key}`);
  };
  useEffect(() => {
    const savedMenu = sessionStorage.getItem("menuList");
    if (savedMenu) {
      setSideMenu(JSON.parse(savedMenu));
    }
    const activeOpenKey = pathName.split("/")[1];
    const activeMenu = pathName.split("/")[2];
    setActiveSideMenu(activeMenu);
    setOpenKeys([activeOpenKey]);
  }, []);
  const setActiveSideMenu = useSideStore((state) => state.setSideSelected);
  const activeSideMenu = useSideStore((state) => state.sideSelected);
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        mode="inline"
        items={sideItems}
        selectedKeys={[activeSideMenu]}
        openKeys={openKeys}
      />
    </div>
  );
}
