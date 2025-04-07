import { Form, Input, Select, Radio } from "antd";
import type { FormProps } from "antd";
type FieldType = {
  group?: string;
  department?: string;
  userName?: string;
  phone?: string;
  email?: string;
  role?: string;
  gender?: string;
  password?: string;
  status?: string;
  text?: string;
};
const { TextArea } = Input;
export default function AddUser() {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        layout="inline"
        style={{ maxWidth: 600, marginTop: "20px" }}
      >
        <div className="flex flex-wrap w-full">
          <div className="flex-1">
            <Form.Item<FieldType> label="机构" name="group" layout="vertical">
              <Input placeholder="请输入机构名称" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType>
              label="部门"
              name="department"
              layout="vertical"
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item<FieldType>
              label="用户姓名"
              layout="vertical"
              name="userName"
              rules={[{ required: true, message: "请输入用户姓名" }]}
            >
              <Input placeholder="请输入用户姓名" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item<FieldType>
              label="手机号"
              layout="vertical"
              name="phone"
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
              <Select placeholder="请选择角色">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item<FieldType> label="性别" name="gender" layout="vertical">
              <Select placeholder="请选择性别">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
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
              <Radio value="1"> 正常 </Radio>
              <Radio value="2"> 停用 </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="w-full mt-[10px]">
          <Form.Item<FieldType> label="备注" name="text" layout="vertical">
            <TextArea rows={4} />
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
