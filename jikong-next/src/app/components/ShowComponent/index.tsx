"use client";
// 整个大的内容页面 根据左边选择展示不同组件
import UserManage from "./UserManage";
import DictManage from "./DictManage";
import PermissionManage from "./PermissionManage";
import { useSideStore } from "@/app/store/useSideStore";
export default function ShowComponent() {
  const activeSideMenu = useSideStore((state) => state.sideSelected);
  return (
    <div className="flex-1 overflow-auto p-[24px] bg-background">
      <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
        {activeSideMenu === "userManage" && <UserManage />}
        {activeSideMenu === "dictManage" && <DictManage />}
        {activeSideMenu === "permissionManage" && <PermissionManage />}
      </div>
    </div>
  );
}
