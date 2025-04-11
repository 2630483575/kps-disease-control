import { IsideMenu } from "../types/side";

interface IresMenuData {
  path: string;
  menuName: string;
  children: IresMenuData[];
}

export const convertSideMenu: Function = (
  menuList: IresMenuData[]
): IsideMenu[] => {
  return menuList.map((item, i) => {
    let children = null;

    if (item.children) {
      children = convertSideMenu(item.children);
    }

    return {
      key: item.path,
      label: item.menuName,
      children: children,
    };
  });
};
