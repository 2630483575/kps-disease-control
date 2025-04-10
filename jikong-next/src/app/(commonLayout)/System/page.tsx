"use client";
import UserManage from "./User/page";
import { redirect } from "next/navigation";
export default function SystemManage() {
  redirect("/System/Dict");
}
