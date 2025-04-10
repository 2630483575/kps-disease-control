"use client";
import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Space, Table, Tag } from "antd";
import type { GetProps, TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
import AddUser from "./AddUser";
import { DataType, roleDataType, userResType } from "@/app/types/user";
import fetchApi from "@/lib/fetchApi";
import type { TablePaginationConfig } from "antd/es/table";
import { optionType } from "@/app/types/select";
import ResetPassword from "./ResetPassword";

interface PaginationState extends TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
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
          <a onClick={() => resetPassword(record)}>重置密码</a>
          <a onClick={() => deleteUser(record)}>删除</a>
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
  const [isShowPasswordModal, setIsShowPasswordModal] = useState(false);
  const [isShowDelModal, setIsShowDelModal] = useState(false);
  const [delUserId, setDelUserId] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const groupSelected = useUserLeftMenuStore(
    (state) => state.userLeftGroupSelected
  );
  // 获取用户列表
  const getUserList = (page = 1, pageSize = 10) => {
    fetchApi
      .post("/system/user/selectUsers", {
        phoneNumber: phoneNumber,
        deptId: groupSelected,
        username: username,
        pageNo: page ?? pagination.current,
        pageSize: pageSize ?? pagination.pageSize,
        orderBy: "user_id",
      })
      .then((res) => {
        if (res.code === 200) {
          setPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
          });
          const allUsers = res.data.userList;
          const newAllCoulumUser = allUsers.map((user: userResType) => {
            let roleName = user.roleNames?.join() ?? "";
            return { ...user, roleName: roleName };
          });
          setTableData(newAllCoulumUser);
        }
      });
  };
  // 重置
  const reset = () => {
    fetchApi
      .post("/system/user/selectUsers", {
        phoneNumber: "",
        deptId: groupSelected,
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
            total: res.data.total,
          });
          const allUsers = JSON.parse(JSON.stringify(res.data.userList));

          const newAllCoulumUser = allUsers.map((user: userResType) => {
            const roleName = user.roleNames.concat() ?? "";
            return { ...user, roleName: roleName };
          });

          setTableData(newAllCoulumUser);
          setUserName("");
          setPhoneNumber("");
        }
      });
  };
  // 左边选中的menuItem改变就重新获取数据
  useEffect(() => {
    getUserList();
  }, [groupSelected]);
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    getUserList(newPagination.current, newPagination.pageSize);
  };
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const showAddModal = () => {
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
    getUserList();
  };
  const handleUserAdd = () => {
    setModalMode("add");
    showAddModal();
  };
  const handleUserEdit = (record: DataType) => {
    setModalMode("edit");
    setEditData(record);
    showAddModal();
  };
  const handleCloseModal = () => {
    setIsAddUserModalOpen(false);
    setEditData({});
    getUserList();
  };
  const resetPassword = (record: DataType) => {
    setEditData(record);
    setIsShowPasswordModal(true);
  };
  const handleClosePasswordModal = () => {
    setIsShowPasswordModal(false);
    getUserList();
  };
  const handleCloseDelModal = () => {
    setIsShowDelModal(false);
  };
  const deleteUser = (record: DataType) => {
    setDelUserId(record.userId ?? 0);
    setIsShowDelModal(true);
  };
  const delUser = () => {
    fetchApi
      .post("/system/user/deleteUserById", { userId: delUserId })
      .then((res) => {
        if (res.code === 200) {
          setIsShowDelModal(false);
          getUserList();
        }
      });
  };

  return (
    <>
      <div className="h-[100px] flex gap-4 flex-wrap">
        <div className="w-[300px]">
          <Input
            placeholder="请输入手机号"
            size="large"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            prefix={<label>手机号:</label>}
          />
        </div>
        <div className="w-[300px]">
          <Input
            placeholder="请输入用户姓名"
            value={username}
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
            onClick={handleUserAdd}
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
        title={`${modalMode === "add" ? "添加" : "编辑"}用户`}
        open={isAddUserModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddUser
          closeModal={handleCloseModal}
          roleList={allRoleInfo}
          mode={modalMode}
          editData={editData}
        />
      </Modal>
      <Modal
        title="重置密码"
        open={isShowPasswordModal}
        footer={null}
        onCancel={handleClosePasswordModal}
        width={600}
        classNames={addModalClassNames}
      >
        <ResetPassword
          closeModal={handleClosePasswordModal}
          editData={editData}
        />
      </Modal>
      <Modal
        title="删除用户"
        open={isShowDelModal}
        onCancel={handleCloseDelModal}
        onOk={delUser}
        width={600}
        classNames={addModalClassNames}
      >
        确定要删除该用户么?
      </Modal>
    </>
  );
}
