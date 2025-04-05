import React, { useState, useEffect } from "react";
import { Input, Menu, Switch, Transfer } from "antd";
import type { GetProps, MenuProps, TransferProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

type MenuItem = Required<MenuProps>["items"][number];
const menuItems: MenuItem[] = [
  {
    key: "sub1",
    label: "市控中心",
    children: [
      { key: "1", label: "疫情科" },
      { key: "2", label: "疫情科" },
      { key: "3", label: "疫情科" },
    ],
  },
  {
    key: "sub2",
    label: "市卫建委",
    children: [
      { key: "4", label: "疫情科" },
      { key: "5", label: "疫情科" },
      { key: "6", label: "疫情科" },
    ],
  },
];

interface UserInfoType {
  key: number;
  userName: string;
  chosen: boolean;
}
export default function AddRelatedUser() {
  const [allUserData, setAllUserData] = useState<UserInfoType[]>([]);
  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const [oneWay, setOneWay] = useState(false);
  useEffect(() => {
    const newTargetKeys = [];
    const newMockData = [];
    for (let i = 0; i < 2000; i++) {
      const data = {
        key: i,
        userName: `content${i + 1}`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        newTargetKeys.push(data.key);
      }
      newMockData.push(data);
    }

    setTargetKeys(newTargetKeys);
    setAllUserData(newMockData);
  }, []);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const onChange: TransferProps["onChange"] = (
    newTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };
  return (
    <>
      <div className="h-[50px] flex gap-4 flex-wrap ">
        <div className="w-[320px]">
          <Search
            placeholder="请输入部门名称"
            onSearch={onSearch}
            prefix={<label>部门名称:</label>}
          />
        </div>
        <div className="w-[320px]">
          <Search
            placeholder="请输入用户名称"
            onSearch={onSearch}
            prefix={<label>用户名称:</label>}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-200px">
          <Menu
            onClick={onClick}
            className="w-full h-full"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={menuItems}
          />
        </div>
        <div className="flex-1 flex">
          <Transfer
            dataSource={allUserData}
            targetKeys={targetKeys}
            onChange={onChange}
            render={(item) => item.userName}
            oneWay={oneWay}
            pagination
          />
        </div>
      </div>
    </>
  );
}
