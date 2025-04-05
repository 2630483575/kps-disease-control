import React, { useState } from "react";
import { Menu, Button, Modal } from "antd";
import type { MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddRole from "./AddRole";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "sub1",
    label: "系统管理员",
  },
  {
    key: "sub2",
    label: "审计管理员",
  },
];
export default function RoleMenu() {
  const addModalClassNames = {
    header: styles["add-modal-header"],
    content: styles["add-modal-content"],
  };
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const showAddRoleModal = () => {
    setIsAddRoleModalOpen(true);
  };
  const handleOk = () => {
    setIsAddRoleModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddRoleModalOpen(false);
  };
  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showAddRoleModal}>
        添加角色
      </Button>
      <Menu
        onClick={onClick}
        className="w-full h-full"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <Modal
        title="添加角色"
        open={isAddRoleModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddRole />
      </Modal>
    </>
  );
}
