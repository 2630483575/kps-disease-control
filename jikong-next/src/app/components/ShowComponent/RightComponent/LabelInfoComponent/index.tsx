"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Space, Table, Modal, message } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddTag from "./AddTag";
import { useDictLeftMenuStore } from "@/app/store/useDictStore";
import fetchApi from "@/lib/fetchApi";
import type { TablePaginationConfig } from "antd/es/table";
import { tagDataType } from "@/app/types/dict";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const addModalClassNames = {
  header: styles["add-modal-header"],
  content: styles["add-modal-content"],
};
interface PaginationState extends TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

export default function LabelInfo() {
  const columns: TableProps<tagDataType>["columns"] = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "标签名称",
      dataIndex: "tagName",
      key: "tagName",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "编号",
      dataIndex: "tagId",
      key: "tagId",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleEditTag(record);
            }}
          >
            编辑
          </a>
          <a onClick={() => handleDeleteTag(record)}>删除</a>
        </Space>
      ),
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const dictLeftSelected = useDictLeftMenuStore(
    (state) => state.dictLeftSelected
  );
  const [tagName, setTagName] = useState("");
  const [tableData, setTableData] = useState<tagDataType[]>([]);
  const [editData, setEditData] = useState<tagDataType>({});
  const [delTagId, setDelTagId] = useState(0);
  const [isShowDelModal, setIsShowDelModal] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [modalMode, setModalMode] = useState("add");
  // 左边选中的menuItem改变就重新获取数据
  useEffect(() => {
    getTagList();
  }, [dictLeftSelected]);
  const getTagList = (page = 1, pageSize = 10) => {
    fetchApi
      .post("/cdc/tag/get", {
        tagName: tagName,
        categoryId: dictLeftSelected,
        pageNo: page ?? pagination.current,
        pageSize: pageSize ?? pagination.pageSize,
      })
      .then((res) => {
        if (res.code === 200) {
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
          });
          let data = res.data.userList;
          let tableData = data.map((opt: tagDataType) => ({
            id: opt.index,
            tagName: opt.tagName,
            updateTime: opt.updateTime,
            tagId: opt.tagId,
            rank: opt.rank,
          }));
          setTableData(tableData);
        }
      });
  };
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getTagList(newPagination.current, newPagination.pageSize);
  };
  const reset = () => {
    fetchApi
      .post("/cdc/tag/get", {
        tagName: "",
        categoryId: dictLeftSelected,
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      })
      .then((res) => {
        if (res.code === 200) {
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
          });
          let data = res.data.userList;
          let tableData = data.map((opt: tagDataType) => ({
            id: opt.index,
            tagName: opt.tagName,
            updateTime: opt.updateTime,
            tagId: opt.tagId,
            rank: opt.rank,
          }));
          setTableData(tableData);
          setTagName("");
        }
      });
  };
  const handleAddTag = () => {
    setModalMode("add");
    setIsAddTagModalOpen(true);
  };
  const handleEditTag = (record: tagDataType) => {
    setModalMode("edit");
    setEditData({ ...record });
    setIsAddTagModalOpen(true);
  };
  const handleCancel = () => {
    setIsAddTagModalOpen(false);
    getTagList();
  };
  const handleCloseDelModal = () => {
    setIsShowDelModal(false);
  };
  const handleDeleteTag = (record: tagDataType) => {
    setDelTagId(record.tagId ?? 0);
    setIsShowDelModal(true);
  };
  const delTag = () => {
    fetchApi.post("/cdc/tag/deleteTagById", { tagId: delTagId }).then((res) => {
      if (res.code === 200) {
        setIsShowDelModal(false);
        messageApi.success(res.msg);
        getTagList();
      } else {
        messageApi.error(res.msg);
      }
    });
  };
  return (
    <>
      {contextHolder}
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Input
            placeholder="请输入标签名称"
            size="large"
            value={tagName}
            onChange={(e) => {
              setTagName(e.target.value);
            }}
            prefix={<label>标签名称:</label>}
          />
        </div>
        <div>
          <Button
            color="blue"
            variant="filled"
            size="large"
            className="w-[100px]"
            onClick={() => {
              getTagList();
            }}
          >
            查询
          </Button>
        </div>
        <div>
          <Button
            size="large"
            className="w-[100px]"
            onClick={() => {
              reset();
            }}
          >
            重置
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddTag}
          >
            添加标签
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full overflow-auto">
        <Table<tagDataType>
          columns={columns}
          dataSource={tableData}
          className="h-full"
          pagination={pagination}
          rowKey={"id"}
          onChange={handleTableChange}
        />
      </div>
      <Modal
        title={`${modalMode === "add" ? "添加" : "编辑"}标签`}
        open={isAddTagModalOpen}
        onCancel={handleCancel}
        width={600}
        footer={null}
        classNames={addModalClassNames}
      >
        <AddTag
          mode={modalMode}
          closeModal={handleCancel}
          editData={editData}
        />
      </Modal>
      <Modal
        title="删除标签"
        open={isShowDelModal}
        onCancel={handleCloseDelModal}
        onOk={delTag}
        width={600}
        classNames={addModalClassNames}
      >
        确定要删除该标签么?
      </Modal>
    </>
  );
}
