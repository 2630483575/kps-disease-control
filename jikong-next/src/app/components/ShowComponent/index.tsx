"use client";
// 基本没用了这个
// 整个大的内容页面 根据左边选择展示不同组件
import UserManage from "@/app/(commonLayout)/System/User/page";
import DictManage from "@/app/(commonLayout)/System/Dict/page";
import PermissionManage from "@/app/(commonLayout)/System/Perm/page";
import { useSideStore } from "@/app/store/useSideStore";
export default function ShowComponent() {
  const activeSideMenu = useSideStore((state) => state.sideSelected);
  return (
    <div className="flex-1 overflow-auto p-[24px] bg-background">
      <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
        {activeSideMenu === "UserManage" && <UserManage />}
        {activeSideMenu === "DictManage" && <DictManage />}
        {activeSideMenu === "PermissionManage" && <PermissionManage />}
      </div>
    </div>
  );
}
