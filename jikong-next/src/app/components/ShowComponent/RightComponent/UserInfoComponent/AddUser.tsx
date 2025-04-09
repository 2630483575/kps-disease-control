import { roleDataType } from "@/app/types/role";
import { DataType } from "@/app/types/user";
import fetchApi from "@/lib/fetchApi";
import { Form, Input, Select, Radio, Button, message } from "antd";
import type { FormProps } from "antd";
import { useUserLeftMenuStore } from "@/app/store/useUserStore";
import { useState } from "react";
import { optionType } from "@/app/types/select";
type FieldType = {
  group?: string;
  depId?: string;
  userName?: string;
  phoneNumber?: string;
  email?: string;
  role?: string;
  sex?: string;
  password?: string;
  status?: string;
  remark?: string;
};

const { TextArea } = Input;
interface AddUserProps {
  closeModal: () => void;
  roleList: optionType[];
  mode: string;
  editData: DataType;
}

export default function AddUser({
  closeModal,
  roleList,
  mode,
  editData,
}: AddUserProps) {
  const depMenu = useUserLeftMenuStore((state) => state.userLeftMenu);
  const groupSelected = useUserLeftMenuStore((state) => state.userLeftSelected);
  const deptSelected = useUserLeftMenuStore(
    (state) => state.userLeftGroupSelected
  );
  const leftList: optionType[] = depMenu.map((opt) => ({
    value: opt.key,
    label: opt.label,
  }));
  const [groupList, setGroupList] = useState<optionType[]>(leftList);

  const [depList, setDepList] = useState<optionType[]>([]);
  const getDepList = (value: number) => {
    const rightListBase =
      depMenu.find((item) => item.key === value)?.children ?? [];
    const rightList = rightListBase?.map((opt) => ({
      value: opt.key,
      label: opt.label,
    }));
    setDepList(rightList);
  };
  const setInitialEditData = () => {
    const roleId = roleList.find(
      (item) => item.label === editData.roleName
    )?.value;
    return {
      group: groupSelected,
      deptId: deptSelected,
      userName: editData.userName,
      phoneNumber: editData.phoneNumber,
      email: editData.email,
      role: roleId,
      sex: editData.sex,
      password: editData.password,
      status: editData.status,
      remark: editData.remark,
    };
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    fetchApi
      .post("/system/user/insertUser", {
        deptId: values.depId,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        remark: values.remark,
        roleIds: [values.role],
        sex: Number(values.sex),
        status: Number(values.status),
        userName: values.userName,
      })
      .then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
        }
      });
    closeModal();
  };
  return (
    <>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        layout="inline"
        style={{ maxWidth: 600, marginTop: "20px" }}
        onFinish={onFinish}
      >
        <div className="flex flex-wrap w-full">
          <div className="flex-1">
            <Form.Item<FieldType> label="机构" name="group" layout="vertical">
              <Select
                placeholder="请选择机构名称"
                options={groupList}
                onChange={getDepList}
              ></Select>
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType> label="部门" name="depId" layout="vertical">
              <Select placeholder="请选择部门名称" options={depList}></Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item<FieldType>
              label="用户姓名"
              layout="vertical"
              name="userName"
              rules={[{ required: true, message: "请输入用户名称" }]}
            >
              <Input placeholder="请输入用户名称" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType>
              label="手机号"
              layout="vertical"
              name="phoneNumber"
              rules={[{ required: true, message: "请输入手机号" }]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item<FieldType> label="邮箱" name="email" layout="vertical">
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType> label="角色" name="role" layout="vertical">
              <Select placeholder="请选择角色" options={roleList}></Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item<FieldType> label="性别" name="sex" layout="vertical">
              <Select placeholder="请选择性别">
                <Select.Option value="0">Male</Select.Option>
                <Select.Option value="1">Female</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType>
              label="用户密码"
              layout="vertical"
              name="password"
              rules={[{ required: true, message: "请输入用户密码" }]}
            >
              <Input placeholder="请输入用户密码" />
            </Form.Item>
          </div>
        </div>
        <div className="w-full mt-[10px]">
          <Form.Item<FieldType> label="状态" name="status" layout="vertical">
            <Radio.Group>
              <Radio value="0"> 正常 </Radio>
              <Radio value="1"> 停用 </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="w-full mt-[10px]">
          <Form.Item<FieldType> label="备注" name="remark" layout="vertical">
            <TextArea rows={4} />
          </Form.Item>
        </div>
        <div className="ml-auto mt-[20px]">
          <Button className="mr-[10px]" onClick={closeModal}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </div>
      </Form>
    </>
  );
}
