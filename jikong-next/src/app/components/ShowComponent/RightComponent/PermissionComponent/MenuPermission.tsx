import React from "react";
import { Tree, Button } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
const treeData: TreeDataNode[] = [
  {
    title: "语料采集",
    key: "0-0",
    children: [
      {
        title: "语料上传",
        key: "0-0-0",
      },
      {
        title: "语料维护",
        key: "0-0-1",
      },
    ],
  },
  {
    title: "语料应用",
    key: "0-1",
    children: [
      {
        title: "语料上传",
        key: "0-1-0",
      },
      {
        title: "语料维护",
        key: "0-1-1",
      },
    ],
  },
  {
    title: "语料管理",
    key: "0-2",
    children: [
      {
        title: "语料上传",
        key: "0-2-0",
      },
      {
        title: "语料维护",
        key: "0-2-1",
      },
    ],
  },
];
export default function MenuPermission() {
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
