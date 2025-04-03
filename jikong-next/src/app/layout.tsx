import type { Metadata } from "next";
import "./globals.css";
import theme from '@/lib/antdThemeConfig'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

export const metadata: Metadata = {
  title: "疾控",
  description: "疾控项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ConfigProvider theme={theme} locale={zhCN}>
          {children}
      </ConfigProvider>
      </body>
    </html>
  );
}
