import { useLoginUserStore } from "@/app/store/useLoginStore";
import { timeFormat } from "@/app/utils/timeFormat";
import fetchApi from "@/lib/fetchApi";
import { Form, Input, Radio, Button, message } from "antd";
import type { InputNumberProps, FormProps } from "antd";
import { InputNumber } from "antd";
type FieldType = {
  roleName?: string;
  roleSort?: number;
  status?: string;
  remark?: string;
};
interface addRoleProps {
  closeModal: () => void;
  cancelModal: () => void;
}

const { TextArea } = Input;
export default function AddRole({ closeModal, cancelModal }: addRoleProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const loginUserInfo = useLoginUserStore((state) => state.loginUserInfo);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const userName =
      loginUserInfo.userName ??
      JSON.parse(localStorage.getItem("logInfo") || "{}").userName;
    fetchApi
      .post("/system/role/create", {
        ...values,
        createBy: userName,
        createTime: timeFormat(Date.now()),
      })
      .then((res) => {
        if (res.code === 200) {
          closeModal();
          form.resetFields();
          messageApi.success(res.msg);
        } else {
          messageApi.error(res.msg);
        }
      });
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
        form={form}
        onFinish={onFinish}
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
        <Form.Item<FieldType> name="status" label="状态">
          <Radio.Group>
            <Radio value="0"> 正常 </Radio>
            <Radio value="1"> 停用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType> name="remark" label="备注">
          <TextArea rows={4} />
        </Form.Item>
        <div className="flex justify-end gap-4">
          <Button onClick={cancelModal}>取消</Button>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </div>
      </Form>
    </>
  );
}
