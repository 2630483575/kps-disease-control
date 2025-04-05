import { Form, Input, Select, Radio } from "antd";
const { TextArea } = Input;
export default function AddUser() {
  return (
    <>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 24 }}
        layout="inline"
        style={{ maxWidth: 600, marginTop: "20px" }}
      >
        <div className="flex flex-wrap w-full ">
          <div className="flex-1">
            <Form.Item label="机构" layout="vertical">
              <Input placeholder="请输入机构名称" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item label="部门" layout="vertical">
              <Input placeholder="请输入部门名称" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item label="用户姓名" layout="vertical">
              <Input placeholder="请输入用户姓名" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item label="手机号" layout="vertical">
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item label="邮箱" layout="vertical">
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item label="角色" layout="vertical">
              <Select placeholder="请选择角色">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-wrap w-full mt-[10px]">
          <div className="flex-1">
            <Form.Item label="性别" layout="vertical">
              <Select placeholder="请选择性别">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex-1">
            <Form.Item label="用户密码" layout="vertical">
              <Input placeholder="请输入用户密码" />
            </Form.Item>
          </div>
        </div>
        <div className="w-full mt-[10px]">
          <Form.Item label="状态" layout="vertical">
            <Radio.Group>
              <Radio value="1"> 正常 </Radio>
              <Radio value="2"> 停用 </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="w-full mt-[10px]">
          <Form.Item label="备注" layout="vertical">
            <TextArea rows={4} />
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
