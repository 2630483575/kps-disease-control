"use client";
import { DataType } from "@/app/types/user";
import fetchApi from "@/lib/fetchApi";
import { Form, Input, Button, message } from "antd";
import type { FormProps } from "antd";

interface ResetProps {
  closeModal: () => void;
  editData: DataType;
}

type FieldType = { oldPwd?: string; newPwd?: string };

export default function ResetPassword({ closeModal, editData }: ResetProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const resetSuccess = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const resetError = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    fetchApi
      .post("/system/user/resetPwd", {
        userId: editData.userId,
        oldPwd: values.oldPwd,
        newPwd: values.newPwd,
      })
      .then((res) => {
        if (res.code === 200) {
          form.resetFields();
          closeModal();
          resetSuccess(res.msg);
        } else {
          resetError(res.msg);
        }
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        style={{ maxWidth: 600, marginTop: "20px" }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="旧密码"
          name="oldPwd"
          rules={[{ required: true, message: "请输入旧密码" }]}
        >
          <Input placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item<FieldType>
          label="新密码"
          name="newPwd"
          rules={[{ required: true, message: "请输入新密码" }]}
        >
          <Input placeholder="请输入新密码" />
        </Form.Item>
        <div className="flex justify-end gap-4">
          <Button onClick={closeModal}>取消</Button>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </div>
      </Form>
    </>
  );
}
