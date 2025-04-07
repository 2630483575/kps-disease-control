"use client";
import React, { useState } from "react";
import { Input, Button, Space, Table, Modal } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddTag from "./AddTag";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

interface DataType {
  key: number;
  tagName: string;
  tagSign: string;
  updateTime: string;
  tagNum: string;
}
// 列的定义
const columns: TableProps<DataType>["columns"] = [
  {
    title: "序号",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "标签名称",
    dataIndex: "tagName",
    key: "tagName",
  },
  {
    title: "标签代号",
    dataIndex: "tagSign",
    key: "tagSign",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
  },
  {
    title: "编号",
    dataIndex: "tagNum",
    key: "tagNum",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

// table的数据
const data = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i + 1,
  tagName: "irelia",
  tagSign: "16677788888",
  updateTime: "2024-9-5 11:12:36",
  tagNum: "fwff5554",
}));

export default function LabelInfo() {
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const addModalClassNames = {
    header: styles["add-modal-header"],
    content: styles["add-modal-content"],
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };
  const showAddTagModal = () => {
    setIsAddTagModalOpen(true);
  };
  const handleOk = () => {
    setIsAddTagModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddTagModalOpen(false);
  };
  return (
    <>
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Search
            placeholder="请输入标签名称"
            onSearch={onSearch}
            size="large"
            prefix={<label>标签名称:</label>}
          />
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={showAddTagModal}
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
        title="添加标签"
        open={isAddTagModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddTag />
      </Modal>
    </>
  );
}
