import TitleComponent from "../TitleComponent";
import LeftComponent from "../LeftComponent";
import RightComponent from "../RightComponent";

export default function DictManage() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleComponent type={"tagManage"} />
      <div className="w-full h-full flex-1 flex overflow-hidden">
        <LeftComponent type={"tagManage"} />
        <RightComponent type={"tagManage"} />
      </div>
    </div>
  );
}
