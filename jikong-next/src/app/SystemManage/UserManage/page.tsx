import TitleComponent from "../../components/ShowComponent/TitleComponent";
import LeftComponent from "../../components/ShowComponent/LeftComponent";
import RightComponent from "../../components/ShowComponent/RightComponent";
export default function UserManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"UserManage"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent type={"UserManage"} />
        <RightComponent type={"UserManage"} />
      </div>
    </div>
  );
}
