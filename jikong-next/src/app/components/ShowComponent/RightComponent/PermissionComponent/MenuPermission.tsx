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
  { title: "菜单权限", key: "0-" },
];
let data = [
  {
    id: 1,
    label: "菜单权限",
    isSelected: 0,
    children: [{ id: 20, label: "系统管理", isSelected: 1 }],
  },
  {
    id: 2,
    label: "数据权限",
    isSelected: 0,
    children: [{ id: 21, label: "普通管理", isSelected: 1 }],
  },
];
let keysArray = [];
// 根据接口数据转换成tree展示的数据格式generateKeys(data,'0')
const generateKeys: Function = (items: any[], parentKey: string) => {
  return items.map((item, index) => {
    const key = parentKey ? `${parentKey}-${index}` : `${index}`;
    if (item.isSelected === 1) {
      keysArray.push(key);
    }
    let children = null;

    if (item.children) {
      children = generateKeys(item.children, key);
    }
    return {
      title: item.label,
      disabled: item.isSelected === -1 ? true : false,
      key: key,
      children: children,
    };
  });
};
// 根据tree展示调用接口 mapKeysArrayToOriginalData(["0-0"], data);
const mapKeysArrayToOriginalData = (keysArray: string[], items: any) => {
  for (const key of keysArray) {
    let currentLevel = items;
    let currentItem;
    const originKey = key.replace("0-", "");
    const keyParts = originKey.split("-");

    for (const part of keyParts) {
      const index = parseInt(part);
      currentItem = currentLevel[index];

      if (!currentItem) {
        console.log("Invalid key");
        return;
      }

      currentLevel = currentItem.children || [];
    }

    if (currentItem) {
      currentItem.isSelected = 1;
    }
  }
};

export default function MenuPermission() {
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  const onClick = () => {};

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
        <Button type="primary" className="w-[400px]" onClick={onClick}>
          保存修改
        </Button>
      </div>
    </>
  );
}
