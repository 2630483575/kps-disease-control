// 内容左侧部分组件 内容根据传入页面类型展示
import UserInfo from "./UserInfoComponent";
import LabelInfo from "./LabelInfoComponent";
import PermissionComponent from "./PermissionComponent";
export default function RightComponent(props: any) {
  return (
    <div className="flex-1 flex flex-col p-[16px] overflow-auto">
      {props.type === "userManage" && <UserInfo />}
      {props.type === "tagManage" && <LabelInfo />}
      {props.type === "permissionManage" && <PermissionComponent />}
    </div>
  );
}
