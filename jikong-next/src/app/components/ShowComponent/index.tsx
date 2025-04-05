// 整个大的内容页面 根据左边选择展示不同组件
import UserManage from "./UserManage";
import DictManage from "./DictManage";
import PermissionManage from "./PermissionManage";
export default function ShowComponent(props: any) {
  return (
    <div className="flex-1 overflow-auto p-[24px] bg-background">
      <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
        {props.type === "userManage" && <UserManage />}
        {props.type === "dictManage" && <DictManage />}
        {props.type === "permissionManage" && <PermissionManage />}
      </div>
    </div>
  );
}
