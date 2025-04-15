"use client";
import React, { Children, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import fetchApi from "@/lib/fetchApi";
import { useLoginUserStore } from "@/app/store/useLoginStore";
import { convertSideMenu, getPermTabs } from "@/app/utils/sideData";
import { useSideStore } from "@/app/store/useSideStore";
import { useRoleLeftMenuStore } from "@/app/store/useRoleStore";

type logType = { username: string; password: string };

export default function Login() {
  const setLoginUserInfo = useLoginUserStore((state) => state.setLoginUserInfo);
  const [messageApi, contextHolder] = message.useMessage();
  // const setUserToken = useUserTokenStore((state) => state.setUserToken);
  const setSideMenu = useSideStore((state) => state.setSideMenu);
  const router = useRouter();
  const userLogin = async (logInfo: logType) => {
    fetchApi.post("/login", { ...logInfo }).then((res) => {
      if (res.code === 200) {
        sessionStorage.setItem("tokenName", res.data.tokenInfo.tokenName);
        sessionStorage.setItem("tokenValue", res.data.tokenInfo.tokenValue);
        const menuList = convertSideMenu(res.data.menus);
        setSideMenu(menuList);
        const permTabs = getPermTabs(res.data.menus);
        sessionStorage.setItem("permTabs", JSON.stringify(permTabs));

        sessionStorage.setItem("menuList", JSON.stringify(menuList));
        sessionStorage.setItem("originMenu", JSON.stringify(res.data.menus));
        localStorage.setItem("userInfo", JSON.stringify(logInfo));
        setLoginUserInfo({ ...logInfo, loginId: res.data.tokenInfo.loginId });
        router.push("/System");
      } else {
        messageApi.error("登陆失败");
      }
    });
  };
  const onFinish = (values: logType) => {
    userLogin({ ...values });
  };
  return (
    <>
      {contextHolder}
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
    </>
  );
}
