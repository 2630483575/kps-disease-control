import React, { useState } from "react";
import { Menu, Button, Modal } from "antd";
import type { MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddRole from "./AddRole";
import { leftRoleMenu } from "@/app/types/role";
interface roleProps {
  menuItems: leftRoleMenu[];
}
const addModalClassNames = {
  header: styles["add-modal-header"],
  content: styles["add-modal-content"],
};
export default function RoleMenu({ menuItems }: roleProps) {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const showAddRoleModal = () => {
    setIsAddRoleModalOpen(true);
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
        mode="inline"
        items={menuItems}
      />
      <Modal
        title="添加角色"
        open={isAddRoleModalOpen}
        footer={null}
        onCancel={handleCancel}
        width={600}
        classNames={addModalClassNames}
      >
        <AddRole />
      </Modal>
    </>
  );
}
