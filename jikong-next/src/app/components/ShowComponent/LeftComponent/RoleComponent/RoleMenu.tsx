import React, { useState } from "react";
import { Menu, Button, Modal } from "antd";
import type { MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import AddRole from "./AddRole";
import { leftRoleMenu } from "@/app/types/role";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
interface roleProps {
  menuItems: leftRoleMenu[];
  getRoleList: (depName: string) => void;
}
const addModalClassNames = {
  header: styles["add-modal-header"],
  content: styles["add-modal-content"],
};
export default function RoleMenu({ menuItems, getRoleList }: roleProps) {
  const setRoleLeftSelected = useRoleLeftMenuStore(
    (state) => state.setRoleLeftSelected
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setRoleLeftSelected(Number(e.key));
  };
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const showAddRoleModal = () => {
    setIsAddRoleModalOpen(true);
  };

  const handleCancel = () => {
    setIsAddRoleModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsAddRoleModalOpen(false);
    getRoleList("");
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
        <AddRole closeModal={handleCloseModal} cancelModal={handleCancel} />
      </Modal>
    </>
  );
}
