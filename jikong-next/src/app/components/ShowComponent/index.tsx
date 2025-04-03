// 整个大的内容页面 根据左边选择展示不同组件
import UserManage from "./UserManage";
export default function ShowComponent() {
  return (
    <div className="flex-1 overflow-auto p-[24px] bg-background">
      <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
        <UserManage />
      </div>
    </div>
  );
}
