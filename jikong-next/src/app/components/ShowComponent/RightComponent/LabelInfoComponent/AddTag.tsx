import { Form, Input } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";
export default function AddTag() {
  const onChange: InputNumberProps["onChange"] = (value) => {
    console.log("changed", value);
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
        <Form.Item label="标签名称">
          <Input placeholder="请输入标签名称" />
        </Form.Item>
        <Form.Item label="标签代号">
          <Input placeholder="请输入标签代号" />
        </Form.Item>
        <Form.Item label="排序">
          <InputNumber
            defaultValue={1}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="所需等级">
          <Input placeholder="所需等级" />
        </Form.Item>
      </Form>
    </>
  );
}
