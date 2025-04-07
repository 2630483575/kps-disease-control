import { Form, Input } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";
import type { FormProps } from "antd";
type FieldType = {
  tagName?: string;
  tagSign?: string;
  order?: string;
  level?: string;
};
export default function AddTag() {
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
          label="标签名称"
          name="tagName"
          rules={[{ required: true, message: "请输入标签名称" }]}
        >
          <Input placeholder="请输入标签名称" />
        </Form.Item>
        <Form.Item<FieldType>
          label="标签代号"
          name="tagSign"
          rules={[{ required: true, message: "请输入标签代号" }]}
        >
          <Input placeholder="请输入标签代号" />
        </Form.Item>
        <Form.Item<FieldType>
          label="排序"
          name="order"
          rules={[{ required: true, message: "请输入排序" }]}
        >
          <InputNumber
            defaultValue={1}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item<FieldType> name="level" label="所需层级">
          <Input placeholder="所需层级" />
        </Form.Item>
      </Form>
    </>
  );
}
