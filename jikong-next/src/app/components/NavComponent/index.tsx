"use client";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import User from "./User";
import styles from "./index.module.css";
//TODO 标题要修改成图片
export default function Nav() {
  return (
    <div className="w-full h-[50px] flex items-center px-[10px] text-[16px] gap-4">
      <div>
        <span>上海市公共卫生语料库管理平台</span>
      </div>
      <div className="flex-1 h-full flex items-center"></div>
      <div className="flex items-center h-full w-[300px] gap-x-[48px]">
        <SearchOutlined className={styles.icon} />
        <BellOutlined className={styles.icon} />
        <User />
      </div>
    </div>
  );
}
