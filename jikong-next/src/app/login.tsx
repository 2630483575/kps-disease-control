"use client";
import React, { Children, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { userLogin } from "./service/loginService";
import { log } from "console";

export default function Login() {
  const router = useRouter();
  const login = async () => {
    // const data = await userLogin({ userName: "ppp" });
  };
  const onFinish = (values: any) => {
    login();
    router.push("/SystemManage");
  };
  return (
    <div className="flex h-full w-full">
      <div className="leftBg"></div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[400px] h-[400px]  flex flex-col gap-4">
          <div className="h-[80px] w-full bg-[#fff] flex flex-col">
            <div className="h-[50px] flex  justify-center">
              <span className="text-[24px] font-semibold">用户登录</span>
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-slate-500">
                上海市公共卫生语料库管理平台
              </span>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
            <Form name="login" style={{ maxWidth: 600 }} onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入用户名称" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="用户名"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="密码"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit" size="large">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
