"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Space, Table, Modal, Tag, message } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddRelatedUser from "./AddRelatedUser";
import { relatedUserType } from "@/app/types/role";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import type { TablePaginationConfig } from "antd/es/table";
import fetchApi from "@/lib/fetchApi";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const addModalClassNames = {
  header: styles["add-modal-header"],
  content: styles["add-modal-content"],
};

// 列的定义
const columns: TableProps<relatedUserType>["columns"] = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "手机号",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
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
interface PaginationState extends TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
export default function RelatedUser() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [tableData, setTableData] = useState<relatedUserType[]>([]);
  const tabSelected = useRoleLeftMenuStore((state) => state.tabSelected);
  const [userName, setUserName] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const roleLeftSelected = useRoleLeftMenuStore(
    (state) => state.roleLeftSelected
  );
  const getRelatedUserList = (page = 1, pageSize = 10) => {
    fetchApi
      .post("/system/user/selectUsersByRoleId", {
        id: roleLeftSelected,
        userName: userName,
        pageNo: page ?? pagination.current,
        pageSize: pageSize ?? pagination.pageSize,
      })
      .then((res) => {
        if (res.code === 200) {
          setTableData(res.data.userList);
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          });
        } else {
          messageApi.error(res.msg);
        }
      });
  };
  const reset = () => {
    fetchApi
      .post("/system/user/selectUsersByRoleId", {
        id: roleLeftSelected,
        userName: "",
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      })
      .then((res) => {
        if (res.code === 200) {
          setTableData(res.data.userList);
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          });
          setUserName("");
        } else {
          messageApi.error(res.msg);
        }
      });
  };
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getRelatedUserList(newPagination.current, newPagination.pageSize);
  };
  useEffect(() => {
    if (roleLeftSelected && tabSelected === "relatedUser") {
      getRelatedUserList();
    }
  }, [roleLeftSelected]);
  const showAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddUserModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddUserModalOpen(false);
    getRelatedUserList();
  };
  return (
    <>
      {contextHolder}
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Input
            placeholder="请输入用户名称"
            size="large"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            prefix={<label>用户名称:</label>}
          />
        </div>
        <div>
          <Button
            color="blue"
            variant="filled"
            size="large"
            className="w-[100px]"
            onClick={() => {
              getRelatedUserList();
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
            onClick={showAddUserModal}
          >
            添加关联用户
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full overflow-auto">
        <Table<relatedUserType>
          columns={columns}
          dataSource={tableData}
          className="h-full"
          rowKey={"userId"}
          onChange={handleTableChange}
          pagination={pagination}
        />
      </div>
      <Modal
        title="添加关联用户"
        open={isAddUserModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        classNames={addModalClassNames}
      >
        <AddRelatedUser closeModal={closeAddModal} />
      </Modal>
    </>
  );
}
