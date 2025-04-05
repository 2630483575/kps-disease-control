import { Form, Input, Radio } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";

const { TextArea } = Input;
export default function AddRole() {
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
        <Form.Item label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="排序">
          <InputNumber
            defaultValue={1}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="状态">
          <Radio.Group>
            <Radio value="1"> 正常 </Radio>
            <Radio value="2"> 停用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="备注">
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </>
  );
}
