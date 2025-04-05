"use client";
import { Tabs, Menu } from "antd";
import type { TabsProps } from "antd";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
// 写死的menu数据,后面调接口拿
const FileTypeItems: MenuItem[] = [
  {
    key: "sub1",
    label: "新政文件",
    children: [
      { key: "1", label: "政策文件" },
      { key: "2", label: "政策文件" },
      { key: "3", label: "政策文件" },
    ],
  },
  {
    key: "sub2",
    label: "科研文献",
    children: [
      { key: "4", label: "政策文件" },
      { key: "5", label: "政策文件" },
      { key: "6", label: "政策文件" },
    ],
  },
];
const BusiTypeItems: MenuItem[] = [
  {
    key: "sub1",
    label: "新政文件",
    children: [
      { key: "1", label: "政策文件" },
      { key: "2", label: "政策文件" },
      { key: "3", label: "政策文件" },
    ],
  },
  {
    key: "sub2",
    label: "科研文献",
    children: [
      { key: "4", label: "政策文件" },
      { key: "5", label: "政策文件" },
      { key: "6", label: "政策文件" },
    ],
  },
];

export default function FileBusiComponent() {
  // 点击文件类型事件
  const onClickFileType: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  //   点击业务类型事件
  const onClickBusiType: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  //   切换tab事件
  const onTabChange = (key: string) => {
    console.log(key);
  };

  // Tab标签配置
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "文件类型",
      children: (
        <>
          <Menu
            onClick={onClickFileType}
            className="w-full h-full"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={FileTypeItems}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "业务类型",
      children: (
        <>
          <Menu
            onClick={onClickBusiType}
            className="w-full h-full"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={BusiTypeItems}
          />
        </>
      ),
    },
  ];
  return (
    <div className="flex-1 w-full">
      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
    </div>
  );
}
