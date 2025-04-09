"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Space, Table, Tag } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
import AddUser from "./AddUser";
import { DataType, userResType } from "@/app/types/user";
import fetchApi from "@/lib/fetchApi";
import type { TablePaginationConfig } from "antd/es/table";
import { roleDataType } from "@/app/types/role";
import { optionType } from "@/app/types/select";

interface PaginationState extends TablePaginationConfig {
  current: number;
  pageSize: number;
}

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const addModalClassNames = {
  header: styles["add-modal-header"],
  content: styles["add-modal-content"],
};
export default function UserInfo() {
  // 列的定义
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
      render: (text) => <a>{text}</a>,
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
          <a onClick={() => handleUserEdit(record)}>编辑</a>
          <a onClick={resetPassword}>重置密码</a>
          <a onClick={deleteUser}>删除</a>
        </Space>
      ),
    },
  ];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUserName] = useState("");
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [allRoleInfo, setAllRoleInfo] = useState<optionType[]>([]);
  const [modalMode, setModalMode] = useState("add");
  const [editData, setEditData] = useState<DataType>({});
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
  });
  const userLeftSelected = useUserLeftMenuStore(
    (state) => state.userLeftSelected
  );
  const getUserList = (page = 1, pageSize = 10) => {
    fetchApi
      .post("/system/user/selectUsers", {
        phoneNumber: phoneNumber,
        deptId: userLeftSelected,
        username: username,
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        orderBy: "user_id",
      })
      .then((res) => {
        if (res.code === 200) {
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
          });
          const allUsers = res.data.userList;
          allUsers.map((user: userResType) => {
            let roleName = user.roleNames?.join() ?? "";
            return { ...user, roleName: roleName };
          });
          setTableData(allUsers);
        }
      });
  };
  const reset = () => {
    fetchApi
      .post("/system/user/selectUsers", {
        phoneNumber: "",
        deptId: userLeftSelected,
        username: "",
        pageNo: 1,
        pageSize: 10,
        orderBy: "user_id",
      })
      .then((res) => {
        if (res.code === 200) {
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
          });
          const allUsers = res.data.userList;
          allUsers.map((user: userResType) => {
            let roleName = user.roleNames?.join() ?? "";
            return { ...user, roleName: roleName };
          });
          setTableData(allUsers);
        }
      });
  };
  // 左边选中的menuItem改变就重新获取数据
  useEffect(() => {
    getUserList();
  }, [userLeftSelected]);
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getUserList(newPagination.current, newPagination.pageSize);
  };
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const showAddUserModal = () => {
    fetchApi.get("/system/role/listRoleAll").then((res) => {
      if (res.code === 200) {
        const allData = JSON.parse(JSON.stringify(res.data));
        const roleSelectData = allData.map((opt: roleDataType) => ({
          value: opt.roleId,
          label: opt.roleName,
        }));

        setAllRoleInfo(roleSelectData);
      }
    });
    setIsAddUserModalOpen(true);
  };
  const handleCancel = () => {
    setIsAddUserModalOpen(false);
  };
  const handleUserEdit = (record: DataType) => {
    setIsAddUserModalOpen(true);
    setModalMode("edit");
    setEditData(record);
  };
  const resetPassword = () => {};
  const deleteUser = () => {};

  return (
    <>
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Input
            placeholder="请输入手机号"
            size="large"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            prefix={<label>手机号:</label>}
          />
        </div>
        <div className="w-[300px]">
          <Input
            placeholder="请输入用户姓名"
            size="large"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            prefix={<label>用户姓名:</label>}
          />
        </div>
        <div>
          <Button
            color="blue"
            variant="filled"
            size="large"
            className="w-[100px]"
            onClick={() => {
              getUserList();
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
            添加用户
          </Button>
        </div>
      </div>
      <div className="flex-1 h-full overflow-auto">
        <Table<DataType>
          columns={columns}
          dataSource={tableData}
          className="h-full"
          pagination={pagination}
          onChange={handleTableChange}
          rowKey={"id"}
        />
      </div>
      <Modal
        title="添加用户"
        open={isAddUserModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddUser
          closeModal={() => setIsAddUserModalOpen(false)}
          roleList={allRoleInfo}
          mode={modalMode}
          editData={editData}
        />
      </Modal>
    </>
  );
}
