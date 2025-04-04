import TitleComponent from "../TitleComponent";
import LeftComponent from "../LeftComponent";
import RightComponent from "../RightComponent";
export default function UserManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent />
        <RightComponent />
      </div>
    </div>
  );
}
