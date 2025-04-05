import { Tree, Button } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
const treeData: TreeDataNode[] = [
  {
    title: "市疾控中心",
    key: "0-0",
    children: [
      {
        title: "疫情科",
        key: "0-0-0",
      },
      {
        title: "疫情科",
        key: "0-0-1",
      },
    ],
  },
  {
    title: "市公共卫生临床中心",
    key: "0-2",
  },
  {
    title: "市卫生监督所",
    key: "0-3",
  },
  {
    title: "卫健委",
    key: "0-4",
  },
];
export default function DataPermission() {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  return (
    <>
      <Tree
        checkable
        defaultExpandedKeys={["0-0-0", "0-0-1"]}
        defaultSelectedKeys={["0-0-1"]}
        defaultCheckedKeys={["0-0-0", "0-0-1"]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
      <div className=" flex justify-center ">
        <Button type="primary" className="w-[400px]">
          保存修改
        </Button>
      </div>
    </>
  );
}
