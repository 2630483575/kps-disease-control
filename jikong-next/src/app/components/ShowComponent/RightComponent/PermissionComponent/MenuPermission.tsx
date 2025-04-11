"use client";
import React, { useEffect, useState } from "react";
import { Tree, Button, message } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import fetchApi from "@/lib/fetchApi";
import { generateKeys } from "@/app/utils/dataToTree";
import { treeSingleType } from "@/app/types/role";

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

export default function MenuPermission() {
  const [messageApi, contextHolder] = message.useMessage();
  const tabSelected = useRoleLeftMenuStore((state) => state.tabSelected);
  const [menuPermissionList, setMenuPermissionList] = useState([]);
  const [treeData, setTreeData] = useState<treeSingleType[]>([]);
  const roleLeftSelected = useRoleLeftMenuStore(
    (state) => state.roleLeftSelected
  );
  useEffect(() => {
    if (roleLeftSelected && tabSelected === "menuPermission") {
      fetchApi
        .get("/system/menu/select", { roleId: roleLeftSelected })
        .then((res) => {
          if (res.code === 200) {
            setMenuPermissionList(res.menuList);
            const defaultKeysArray: string[] = [];
            const initPernmissionData = generateKeys(res.menuList, "0");
            console.log(initPernmissionData);

            setTreeData(initPernmissionData.treeData);
          } else {
            messageApi.error(res.msg);
          }
        });
    }
  }, [roleLeftSelected]);
  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  const onClick = () => {};

  return (
    <>
      <Tree checkable onCheck={onCheck} treeData={treeData} />
      <div className="flex justify-center mt-auto">
        <Button type="primary" className="w-[400px]" onClick={onClick}>
          保存修改
        </Button>
      </div>
    </>
  );
}
