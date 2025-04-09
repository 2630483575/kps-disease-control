"use client";
import TitleComponent from "../../components/ShowComponent/TitleComponent";
import LeftComponent from "../../components/ShowComponent/LeftComponent";
import RightComponent from "../../components/ShowComponent/RightComponent";
export default function PermissionManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"PermissionManage"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent type={"PermissionManage"} />
        <RightComponent type={"PermissionManage"} />
      </div>
    </div>
  );
}
