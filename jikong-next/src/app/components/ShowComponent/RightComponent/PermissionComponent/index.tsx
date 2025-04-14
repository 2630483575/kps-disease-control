"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import RoleInfo from "./RoleInfo";
import MenuPermission from "./MenuPermission";
import DataPermission from "./DataPermission";
import RelatedUser from "./RelatedUser";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import { usePathname } from "next/navigation";
import { useSideStore } from "@/app/store/useSideStore";
import { IloginUSer } from "@/app/types/log";
import { IsideMenu } from "@/app/types/side";
interface PermissionTab {
  key: string;
  label: string;
  children?: React.ReactNode;
}
const allTabItems: PermissionTab[] = [
  {
    key: "RoleInfo",
    label: "角色信息",
    children: <RoleInfo />,
  },
  {
    key: "MenuPermission",
    label: "菜单权限",
    children: <MenuPermission />,
  },
  {
    key: "DataPermission",
    label: "数据权限",
    children: <DataPermission />,
  },
  {
    key: "RelatedUser",
    label: "关联用户",
    children: <RelatedUser />,
  },
];
const getPermTabs = (allTabs: PermissionTab[]): PermissionTab[] => {
  // 1. 安全获取sessionStorage数据
  const savedTabs = sessionStorage.getItem("permTabs");
  if (!savedTabs) return [];
  const tabOptions: { key: string; label: string }[] = JSON.parse(savedTabs);
  if (!Array.isArray(tabOptions)) return [];
  const permittedKeys = new Set(
    tabOptions
      .filter((opt) => opt?.key && typeof opt.key === "string")
      .map((opt) => opt.key)
  );
  return allTabs.filter((item) => permittedKeys.has(item.key));
};
export default function PermissionComponent() {
  const [tabItems, setTabItems] = useState<PermissionTab[]>([]);
  useEffect(() => {
    const tabs = getPermTabs(allTabItems);
    setTabItems(tabs);
  }, []);

  const setTabSelected = useRoleLeftMenuStore((state) => state.setTabSelected);

  const onChange = (key: string) => {
    setTabSelected(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      items={tabItems}
      onChange={onChange}
      className="h-full"
    />
  );
}
