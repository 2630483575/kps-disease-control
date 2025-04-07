"use client";
import React, { useState } from "react";
import { Input, Button, Space, Table, Modal, Tag } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddRelatedUser from "./AddRelatedUser";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

interface DataType {
  key: number;
  userName: string;
  phone: string;
  email: string;
  relatedTime: string;
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
    title: "关联时间",
    dataIndex: "relatedTime",
    key: "relatedTime",
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
];
// table的数据
const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i + 1,
  userName: "irelia",
  phone: "16677788888",
  email: "idydjusys@163.com",
  relatedTime: "2024-9-5 11:12:36",
  status: 0,
}));

export default function RelatedUser() {
  const addModalClassNames = {
    header: styles["add-modal-header"],
    content: styles["add-modal-content"],
  };
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };
  const showAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };
  const handleOk = () => {
    setIsAddUserModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddUserModalOpen(false);
  };
  return (
    <>
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Search
            placeholder="请输入用户名称"
            onSearch={onSearch}
            size="large"
            prefix={<label>用户名称:</label>}
          />
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={showAddUserModal}
          >
            添加标签
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
        title="添加关联用户"
        open={isAddUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        classNames={addModalClassNames}
      >
        <AddRelatedUser />
      </Modal>
    </>
  );
}
