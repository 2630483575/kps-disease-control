"use client";
import React, { useEffect, useState } from "react";
import { Tree, Button, message } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import fetchApi from "@/lib/fetchApi";
import {
  generateKeys,
  mapKeysArrayToOriginalData,
} from "@/app/utils/dataToTree";
import { treeSingleType } from "@/app/types/role";

export default function MenuPermission() {
  const [messageApi, contextHolder] = message.useMessage();
  const tabSelected = useRoleLeftMenuStore((state) => state.tabSelected);
  const roleSelected = useRoleLeftMenuStore((state) => state.roleLeftSelected);
  const [treeData, setTreeData] = useState<treeSingleType[]>([]);
  const [originMenu, setOriginMenu] = useState([]);
  const [checkedInfo, setCheckedInfo] = useState<TreeDataNode[]>([]);
  const selectedRoledId = useRoleLeftMenuStore(
    (state) => state.roleLeftSelected
  );
  const [checkedKeys, setCheckedKeys] = useState<
    string[] | { checked: string[]; halfChecked: string[] }
  >([]);
  const roleLeftSelected = useRoleLeftMenuStore(
    (state) => state.roleLeftSelected
  );
  useEffect(() => {
    if (roleLeftSelected && tabSelected === "MenuPermission") {
      fetchApi
        .get("/system/menu/select", { roleId: roleSelected })
        .then((res) => {
          if (res.code === 200) {
            const initPernmissionData = generateKeys(res.menuList, "0");
            setOriginMenu(res.menuList);
            setCheckedKeys(initPernmissionData.defaultKeysArray);
            setTreeData(initPernmissionData.treeData);
          } else {
            messageApi.error(res.msg);
          }
        });
    }
  }, [roleLeftSelected, tabSelected]);
  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    const keys = Array.isArray(checkedKeys) ? checkedKeys : checkedKeys.checked;
    console.log(info);
    setCheckedInfo(info.checkedNodes || []);
    setCheckedKeys(keys.map(String));
  };
  const onClick = () => {
    const reqData = mapKeysArrayToOriginalData(checkedInfo, originMenu);
    fetchApi
      .post("/system/menu/updateSelected", {
        menuList: reqData,
        roleId: selectedRoledId,
      })
      .then((res) => {
        if (res.code === 200) {
          messageApi.success("编辑成功");
        } else {
          messageApi.error(res.msg);
        }
      });
  };

  return (
    <>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={treeData}
        checkedKeys={checkedKeys}
      />
      <div className="flex justify-center mt-auto">
        <Button type="primary" className="w-[400px]" onClick={onClick}>
          保存修改
        </Button>
      </div>
    </>
  );
}
