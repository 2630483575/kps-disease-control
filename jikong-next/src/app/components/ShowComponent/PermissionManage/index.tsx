import TitleComponent from "../TitleComponent";
import LeftComponent from "../LeftComponent";
import RightComponent from "../RightComponent";
export default function PermissionManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"permissionManage"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent type={"permissionManage"} />
        <RightComponent type={"permissionManage"} />
      </div>
    </div>
  );
}
