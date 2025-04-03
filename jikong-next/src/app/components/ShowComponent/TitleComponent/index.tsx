// 内容标题部分组件 名字根据传入展示
export default function TitleComponent() {
  return (
    <div className="w-full h-[80px] bg-[#fff] flex flex-col">
      <div className="h-[50px] flex flex-col justify-start">
        <span className="text-[24px] font-semibold">系统管理</span>
      </div>
      <div className="flex-1 flex flex-col justify-start">
        <span className="text-slate-500">掌管系统管理权限</span>
      </div>
    </div>
  );
}
