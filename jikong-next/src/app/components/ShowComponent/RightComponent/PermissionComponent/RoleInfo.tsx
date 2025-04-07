import { Form, Input, Radio, Button, InputNumber } from "antd";
import type { InputNumberProps, FormProps } from "antd";
type FieldType = {
  roleName?: string;
  order?: string;
  status?: string;
  text?: string;
};

const { TextArea } = Input;
export default function RoleInfo() {
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      labelAlign="left"
      style={{ maxWidth: 800, marginTop: "20px" }}
      initialValues={{ order: 1 }}
    >
      <Form.Item<FieldType>
        name="roleName"
        label="角色名称"
        rules={[{ required: true, message: "请输入角色名称" }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item<FieldType>
        name="order"
        label="排序"
        rules={[{ required: true, message: "请选择排序" }]}
      >
        <InputNumber onChange={onChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<FieldType> label="状态">
        <Radio.Group>
          <Radio value="1"> 正常 </Radio>
          <Radio value="2"> 停用 </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item<FieldType> label="创建人员">
        <span>Irelia</span>
      </Form.Item>
      <Form.Item<FieldType> label="创建时间">
        <span>2024-10-11 10:23:32</span>
      </Form.Item>
      <Form.Item<FieldType> label="备注">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item<FieldType> label={null}>
        <Button type="primary" htmlType="submit" className="w-[400px]">
          确认修改
        </Button>
      </Form.Item>
    </Form>
  );
}
