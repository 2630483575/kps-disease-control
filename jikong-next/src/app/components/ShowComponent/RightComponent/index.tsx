// 内容左侧部分组件 内容根据传入页面类型展示
import UserInfo from "./UserInfoComponent";
import LabelInfo from "./LabelInfoComponent";
export default function RightComponent(props: any) {
  return (
    <div className="flex-1 flex flex-col p-[16px] gap-4 ">
      {props.type === "userManage" && <UserInfo />}
      {props.type === "tagManage" && <LabelInfo />}
    </div>
  );
}
