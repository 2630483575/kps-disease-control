// 内容标题部分组件 名字根据传入展示
export default function TitleComponent(props: any) {
  return (
    <div className="w-full h-[80px] bg-[#fff] flex flex-col">
      {props.type === "UserManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">系统管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管系统管理权限</span>
          </div>
        </>
      )}
      {props.type === "tagManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">标签管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管标签管理权限</span>
          </div>
        </>
      )}
      {props.type === "permissionManage" && (
        <>
          <div className="h-[50px] flex flex-col justify-start">
            <span className="text-[24px] font-semibold">权限管理</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-slate-500">掌管系统角色和权限</span>
          </div>
        </>
      )}
    </div>
  );
}
