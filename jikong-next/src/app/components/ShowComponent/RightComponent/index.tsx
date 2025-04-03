// 内容左侧部分组件 内容根据传入页面类型展示
import UserInfo from "../UserInfoComponent";
export default function RightComponent() {
  return (
    <div className="flex-1 flex flex-col p-[16px] gap-4">
      <UserInfo />
    </div>
  );
}
