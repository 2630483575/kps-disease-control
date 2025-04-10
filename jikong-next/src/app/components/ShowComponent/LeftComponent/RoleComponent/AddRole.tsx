import { Form, Input, Radio } from "antd";
import type { InputNumberProps, FormProps } from "antd";
import { InputNumber } from "antd";
type FieldType = {
  roleName?: string;
  order?: string;
  status?: string;
  text?: string;
};

const { TextArea } = Input;
export default function AddRole() {
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        style={{ maxWidth: 600, marginTop: "20px" }}
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
        <Form.Item<FieldType> name="status" label="状态">
          <Radio.Group>
            <Radio value="1"> 正常 </Radio>
            <Radio value="2"> 停用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType> name="text" label="备注">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
}
