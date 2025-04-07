import Nav from "../components/NavComponent";
import Side from "../components/SideComponent";
import ShowComponent from "../components/ShowComponent";
export default function SystemManage() {
  return (
    <div className="h-full w-full bg-inherit flex flex-col">
      <Nav />
      <div className="flex-1 flex overflow-y-hidden">
        <Side />
        <ShowComponent />
      </div>
    </div>
  );
}
