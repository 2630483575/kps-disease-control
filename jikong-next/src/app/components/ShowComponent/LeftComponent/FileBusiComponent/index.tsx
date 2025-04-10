"use client";
import { useDictLeftMenuStore } from "@/app/store/useDictStore";
import { IDictListData, IDictTypeData, leftDictMenu } from "@/app/types/dict";
import fetchApi from "@/lib/fetchApi";
import { Tabs, Menu } from "antd";
import type { TabsProps } from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import FileMenu from "./FileMenu";
import BusiMenu from "./BusiMenu";

type MenuItem = Required<MenuProps>["items"][number];
// 根据接口返回数据转换成menu的格式
const dictColumnConvert: Function = (dictList: IDictListData[]) => {
  return dictList.map((dict, i) => {
    let children = null;

    if (dict.children.length > 0) {
      children = dictColumnConvert(dict.children);
    }

    return {
      key: dict.id,
      label: dict.name,
      children: children,
    };
  });
};

export default function FileBusiComponent() {
  const dictLeftMenu = useDictLeftMenuStore((state) => state.dictLeftMenu);
  const setDictLeftMenu = useDictLeftMenuStore(
    (state) => state.setDictLeftMenu
  );
  const [fileLeftMenu, setFileLeftMenu] = useState<leftDictMenu[]>([]);
  const [busiLeftMenu, setBusiLeftMenu] = useState<leftDictMenu[]>([]);

  //   点击业务类型事件
  const onClickBusiType: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  //   切换tab事件
  const onTabChange = (key: string) => {
    console.log(key);
  };
  // 初始化两个menu
  const initTypeList = async () => {
    fetchApi.get("/cdc/category/tree").then((res) => {
      if (res.code === 200) {
        const fileTypeData =
          res.data.find((item: IDictTypeData) => item.cateType === "1")
            .children ?? [];
        const fileTypeMenuItems = dictColumnConvert(fileTypeData);
        const BusiTypeData =
          res.data.find((item: IDictTypeData) => item.cateType === "2")
            .children ?? [];
        const busiTypeMenuItems = dictColumnConvert(BusiTypeData);
        setFileLeftMenu(fileTypeMenuItems);
        setBusiLeftMenu(busiTypeMenuItems);
      }
    });
  };
  useEffect(() => {
    initTypeList();
  }, []);

  // Tab标签配置
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "文件类型",
      children: <FileMenu menu={fileLeftMenu} />,
    },
    {
      key: "2",
      label: "业务类型",
      children: <BusiMenu menu={busiLeftMenu} />,
    },
  ];
  return (
    <div className="flex-1 w-full">
      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
    </div>
  );
}
