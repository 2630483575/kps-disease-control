"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Space, Table, Tag } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
import AddUser from "./AddUser";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

interface DataType {
  key: number;
  userName: string;
  phone: string;
  email: string;
  roleName: string;
  createTime: string;
  status: number;
}
// 列的定义
const columns: TableProps<DataType>["columns"] = [
  {
    title: "序号",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
    key: "userName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "手机号",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "角色",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = status === 1 ? "volcano" : "green";
      let statusName = status === 1 ? "停用" : "正常";
      return (
        <Tag color={color} key={statusName}>
          {statusName}
        </Tag>
      );
    },
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>重置密码</a>
        <a>删除</a>
      </Space>
    ),
  },
];
// table的数据
const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i + 1,
  userName: "irelia",
  phone: "16677788888",
  email: "idydjusys@163.com",
  roleName: "数据分析师",
  createTime: "2024-9-5 11:12:36",
  status: 1,
}));

export default function UserInfo() {
  const addModalClassNames = {
    header: styles["add-modal-header"],
    content: styles["add-modal-content"],
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const showAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };
  const handleOk = () => {
    setIsAddUserModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddUserModalOpen(false);
  };
  const userLeftMenu = useUserLeftMenuStore((state) => state.userLeftSelected);
  useEffect(() => {
    // 调接口,根据选中的部门获取用户列表数据
  }, [userLeftMenu]);
  return (
    <>
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Search
            placeholder="请输入手机号"
            onSearch={onSearch}
            size="large"
            prefix={<label>手机号:</label>}
          />
        </div>
        <div className="w-[300px]">
          <Search
            placeholder="请输入用户姓名"
            onSearch={onSearch}
            size="large"
            prefix={<label>用户姓名:</label>}
          />
        </div>
        <div>
          <Button
            color="blue"
            variant="filled"
            size="large"
            className="w-[100px]"
          >
            查询
          </Button>
        </div>
        <div>
          <Button size="large" className="w-[100px]">
            重置
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={showAddUserModal}
          >
            添加用户
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full overflow-auto">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          className="h-full"
        />
      </div>
      <Modal
        title="添加用户"
        open={isAddUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddUser />
      </Modal>
    </>
  );
}
