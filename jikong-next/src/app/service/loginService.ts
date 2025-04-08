import { getAxios, postAxios } from "../utils/axios";

// 用户登录
export const userLogin = (data: object) => {
  return postAxios({ url: "/login", data });
};
