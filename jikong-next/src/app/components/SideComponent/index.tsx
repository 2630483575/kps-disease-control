"use client";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useSideStore } from "@/app/store/useSideStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Side() {
  const router = useRouter();
  const sideItems = useSideStore((state) => state.sideMenu);
  const setSideMenu = useSideStore((state) => state.setSideMenu);

  const onClick: MenuProps["onClick"] = (e) => {
    setActiveSideMenu(e.key);
    router.push(`/${e.keyPath[1]}/${e.key}`);
  };
  useEffect(() => {
    // 仅在客户端执行
    const savedMenu = sessionStorage.getItem("menuList");
    if (savedMenu) {
      setSideMenu(JSON.parse(savedMenu));
    }
  }, []);
  const setActiveSideMenu = useSideStore((state) => state.setSideSelected);
  return (
    <div className="w-[200px]">
      <Menu
        onClick={onClick}
        className="w-full h-full"
        mode="inline"
        items={sideItems}
        defaultSelectedKeys={["User"]}
        defaultOpenKeys={["System"]}
      />
    </div>
  );
}
