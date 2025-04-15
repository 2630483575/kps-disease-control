"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input, Menu, Table, List, Button, message } from "antd";
import type { GetProps, MenuProps, TransferProps } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import fetchApi from "@/lib/fetchApi";
import { depColumnConvert } from "@/app/utils/dataToTree";
import { leftDepMenu } from "@/app/types/dep";
import type { TablePaginationConfig } from "antd/es/table";
import {
  SearchOutlined,
  CloseOutlined,
  MessageTwoTone,
} from "@ant-design/icons";
import { DataType } from "@/app/types/user";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
interface PaginationState extends TablePaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

const tableColumns: TableColumnsType<DataType> = [
  {
    title: "用户名称",
    dataIndex: "userName",
    align: "center",
    render: (text: string) => <a>{text}</a>,
  },
];
interface addProps {
  closeModal: () => void;
  isAddUserModalOpen: boolean;
}

const AddRelatedUser = forwardRef(
  ({ closeModal, isAddUserModalOpen }: addProps, ref) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [userData, setUserData] = useState<DataType[]>([]);
    const [depMenu, setDepMenu] = useState<leftDepMenu[]>([]);
    const [activeMenu, setActiveMenu] = useState<number>(0);
    const [depInput, setDepInput] = useState("");
    const [userInput, setUserInput] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedUserList, setSelectedUserList] = useState<DataType[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const roleLeftSelected = useRoleLeftMenuStore(
      (state) => state.roleLeftSelected
    );

    const [userPagination, setUserPagination] = useState<PaginationState>({
      current: 1,
      pageSize: 50,
      total: 0,
      showSizeChanger: true,
      showTotal: (total) => `共 ${total} 条`,
    });
    const onSelectChange = (
      newSelectedRowKeys: React.Key[],
      selectedRows: DataType[]
    ) => {
      const updateUserList = [...selectedUserList, ...selectedRows];
      setSelectedUserList(updateUserList);
      setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection: TableRowSelection<DataType> = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const searchDepMenu = () => {
      getDepMenu(depInput);
    };
    const searchUserMenu = () => {
      getUserList(userInput, userPagination.current, userPagination.pageSize);
    };

    const onClickMenu: MenuProps["onClick"] = (e) => {
      setActiveMenu(Number(e.key));
    };
    // 获取部门列表
    const getDepMenu = (depName: string) => {
      if (depName) {
        fetchApi
          .get("/cdc/dept/simpleTree", { deptName: depName })
          .then((res) => {
            if (res.code === 200) {
              const leftDepListByName = depColumnConvert(res.data);
              setDepMenu(leftDepListByName);
            }
          });
      } else {
        fetchApi.get("/cdc/dept/list").then((res) => {
          if (res.code === 200) {
            const leftColumnList = depColumnConvert(res.data);
            setDepMenu(leftColumnList);
          }
        });
      }
    };
    useImperativeHandle(ref, () => ({
      closeAdd: closeAddModal,
    }));
    const getUserList = (
      username: string,
      page: number = 1,
      pageSize: number = 50
    ) => {
      fetchApi
        .post("/system/user/selectUsers", {
          phoneNumber: "",
          deptId: activeMenu,
          username: username,
          pageNo: page ?? userPagination.current,
          pageSize: pageSize ?? userPagination.pageSize,
          orderBy: "user_id",
        })
        .then((res) => {
          setUserPagination({
            current: res.data.currentPage,
            pageSize: res.data.pageSize,
            total: res.data.total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          });
          setUserData(res.data.userList);
        });
    };
    const handleUserTableChange = (newPagination: TablePaginationConfig) => {
      getUserList(userInput, newPagination.current, newPagination.pageSize);
    };
    useEffect(() => {
      if (isAddUserModalOpen) {
        getDepMenu("");
      }
    }, [isAddUserModalOpen]);
    useEffect(() => {
      if (activeMenu) {
        getUserList(userInput, userPagination.current, userPagination.pageSize);
      }
    }, [activeMenu]);
    const clearAllSelectUser = () => {
      setSelectedRowKeys([]);
      setSelectedUserList([]);
    };
    const handleRemoveUser = (userId: number | undefined) => {
      const newSelectionKeysArr = selectedRowKeys.filter(
        (item) => item !== userId
      );
      const newSelectionArr = selectedUserList.filter(
        (item) => item.userId !== userId
      );
      setSelectedRowKeys(newSelectionKeysArr);
      setSelectedUserList(newSelectionArr);
    };
    const closeAddModal = () => {
      clearAllSelectUser();
      setUserData([]);
      setDepInput("");
      setUserInput("");
      closeModal();
      setActiveMenu(0);
      setOpenKeys([]);
    };
    const submit = () => {
      if (!roleLeftSelected) {
        messageApi.error("请选择角色");
      }
      const userIdList = selectedUserList.map((opt) => opt.userId);
      fetchApi
        .post("/system/user/insertUserIdAndRoleId", {
          roleId: roleLeftSelected,
          userIds: userIdList,
        })
        .then((res) => {
          if (res.code === 200) {
            messageApi.success(res.msg);
            closeAddModal();
          } else {
            messageApi.error(res.msg);
          }
        });
    };

    return (
      <>
        {contextHolder}
        <div className="flex gap-4 mt-[10px] h-[800px]">
          <div className="w-[300px] h-full border-r-[1px] border-slate-300 overflow-auto">
            <div className="w-full flex flex-col gap-4 overflow-auto">
              <Input
                placeholder="请输入部门名称"
                prefix={<label>部门名称:</label>}
                suffix={
                  <SearchOutlined
                    onClick={() => {
                      searchDepMenu();
                    }}
                  />
                }
                value={depInput}
                onChange={(e) => {
                  setDepInput(e.target.value);
                }}
              ></Input>
              <Menu
                onClick={onClickMenu}
                className="w-full flex-1"
                mode="inline"
                items={depMenu}
                selectedKeys={[String(activeMenu)]}
                openKeys={openKeys}
                onOpenChange={(keys) => setOpenKeys(keys as string[])}
              />
            </div>
          </div>
          <div className="w-[300px] h-full border-r-[1px] border-slate-300 overflow-auto">
            <div className="w-full flex flex-col gap-4 ">
              <Input
                placeholder="请输入用户名称"
                prefix={<label>用户名称:</label>}
                suffix={
                  <SearchOutlined
                    onClick={() => {
                      searchUserMenu();
                    }}
                  />
                }
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              ></Input>
              <Table<DataType>
                rowSelection={rowSelection}
                columns={tableColumns}
                dataSource={userData}
                rowKey={"userId"}
                pagination={userPagination}
                onChange={handleUserTableChange}
              />
            </div>
          </div>
          <div className="flex-1 h-full overflow-hidden">
            <div className="w-full flex flex-col gap-4">
              <div className="h-[32px] flex justify-between">
                <div>
                  <span>已选{selectedRowKeys.length}人</span>
                </div>
                <div>
                  <span
                    className="cursor-pointer text-blue-500"
                    onClick={() => {
                      clearAllSelectUser();
                    }}
                  >
                    清除
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <List
                  pagination={{ position: "bottom", align: "end" }}
                  dataSource={selectedUserList}
                  renderItem={(item, index) => (
                    <List.Item>
                      <div className="flex justify-between w-full">
                        <div>
                          <span>{item.userName}</span>
                        </div>
                        <div>
                          <CloseOutlined
                            style={{ color: "#777777" }}
                            onClick={() => handleRemoveUser(item.userId)}
                          />
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={closeAddModal}>取消</Button>
          <Button onClick={submit} type="primary">
            确认
          </Button>
        </div>
      </>
    );
  }
);

export default AddRelatedUser;
