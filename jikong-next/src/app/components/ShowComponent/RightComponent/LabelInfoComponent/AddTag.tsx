import { useDictLeftMenuStore } from "@/app/store/useDictStore";
import { tagDataType } from "@/app/types/dict";
import fetchApi from "@/lib/fetchApi";
import { Form, Input, Button, message } from "antd";
import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";
import type { FormProps } from "antd";
import { useEffect } from "react";
interface dictProps {
  mode: string;
  closeModal: () => void;
  editData: tagDataType;
}
type FieldType = {
  tagName?: string;
  rank?: string;
};
export default function AddTag({ mode, closeModal, editData }: dictProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const dictLeftSelected = useDictLeftMenuStore(
    (state) => state.dictLeftSelected
  );
  const [form] = Form.useForm();
  useEffect(() => {
    if (mode === "edit") {
      const initData = {
        tagName: editData.tagName,
        rank: editData.rank,
      };
      form.setFieldsValue(initData);
    } else {
      form.resetFields();
    }
  }, [mode, editData]);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (mode === "add") {
      fetchApi
        .post("/cdc/tag/insert", {
          tagName: values.tagName,
          rank: values.rank,
          categoryId: dictLeftSelected,
        })
        .then((res) => {
          if (res.code === 200) {
            messageApi.success(res.msg);
            closeModal();
          } else {
            messageApi.error(res.msg);
          }
        });
    } else {
      fetchApi
        .post("/cdc/tag/update", {
          tagName: values.tagName,
          rank: values.rank,
          tagId: editData.tagId,
          categoryId: dictLeftSelected,
        })
        .then((res) => {
          if (res.code === 200) {
            messageApi.success(res.msg);
            closeModal();
          } else {
            messageApi.error(res.msg);
          }
        });
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        style={{ maxWidth: 600, marginTop: "20px" }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<FieldType>
          label="标签名称"
          name="tagName"
          rules={[{ required: true, message: "请输入标签名称" }]}
        >
          <Input placeholder="请输入标签名称" />
        </Form.Item>

        <Form.Item<FieldType>
          label="排序"
          name="rank"
          rules={[{ required: true, message: "请输入排序" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="请输入排序" />
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
