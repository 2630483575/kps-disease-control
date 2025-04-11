"use client";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";
import fetchApi from "@/lib/fetchApi";
import { Form, Input, Radio, Button, InputNumber, message } from "antd";
import type { FormProps } from "antd";
import { useEffect } from "react";
type FieldType = {
  roleName?: string;
  roleSort?: string;
  status?: string;
  remark?: string;
  createBy?: string;
  createTime?: string;
};

const { TextArea } = Input;
export default function RoleInfo() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const tabSelected = useRoleLeftMenuStore((state) => state.tabSelected);
  const roleLeftSelected = useRoleLeftMenuStore(
    (state) => state.roleLeftSelected
  );
  useEffect(() => {
    if (roleLeftSelected && tabSelected === "roleInfo") {
      fetchApi
        .get("/system/role/getRoleById", { roleId: roleLeftSelected })
        .then((res) => {
          if (res.code === 200) {
            form.setFieldsValue({ ...res.data });
          } else {
            messageApi.error(res.msg);
          }
        });
    }
  }, [roleLeftSelected]);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {};
  return (
    <>
      {contextHolder}
      <div>
        {/* TODO 这里要写一个空白页面 */}
        {roleLeftSelected ? (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            labelAlign="left"
            style={{ maxWidth: 800, marginTop: "20px" }}
            form={form}
          >
            <Form.Item<FieldType>
              name="roleName"
              label="角色名称"
              rules={[{ required: true, message: "请输入角色名称" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
            <Form.Item<FieldType>
              name="roleSort"
              label="排序"
              rules={[{ required: true, message: "请选择排序" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item<FieldType> label="状态" name="status">
              <Radio.Group>
                <Radio value="0"> 正常 </Radio>
                <Radio value="1"> 停用 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item<FieldType> label="创建人员" name="createBy">
              <div>{form.getFieldValue("createBy")}</div>
            </Form.Item>
            <Form.Item<FieldType> label="创建时间" name="createTime">
              <div>{form.getFieldValue("createTime")}</div>
            </Form.Item>
            <Form.Item<FieldType> label="备注" name="remark">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item<FieldType> label={null}>
              <Button type="primary" htmlType="submit" className="w-[400px]">
                确认修改
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
