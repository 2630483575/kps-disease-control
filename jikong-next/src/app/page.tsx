"use client";
import "@ant-design/v5-patch-for-react-19";
import Nav from "./components/NavComponent";
import Side from "./components/SideComponent";
import ShowComponent from "./components/ShowComponent";

function App() {
  return (
    <div className="h-full w-full bg-inherit flex flex-col">
      <Nav />
      <div className="flex-1 flex overflow-y-hidden">
        <Side />
        <ShowComponent type={"permissionManage"} />
      </div>
    </div>
  );
}
export default App;
