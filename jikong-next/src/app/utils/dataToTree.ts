import { IdeplistData } from "../types/dep";
import { treeSingleType } from "../types/role";
import type { TreeDataNode, TreeProps } from "antd";

// 菜单权限根据接口数据转换成tree展示的数据格式generateKeys(data,'0')
export const generateKeys: Function = (items: any[], parentKey: string) => {
  let defaultKeysArray: string[] = [];
  const generate = (items: any[], parentKey: string): any[] => {
    return items.length === 0
      ? []
      : items.map((item, index) => {
          const key = parentKey ? `${parentKey}-${index}` : `${index}`;
          if (item.isSelected === 1) {
            defaultKeysArray.push(key);
          }
          let children = null;

          if (item.children && item.children.length > 0) {
            children = generate(item.children, key);
          }
          return {
            title: item.menuName,
            disabled: item.isSelected === -1 ? true : false,
            key: key,
            children: children,
          };
        });
  };
  const treeData = generate(items, parentKey);

  return { treeData, defaultKeysArray };
};

// 菜单权限根据tree展示调用接口 mapKeysArrayToOriginalData(["0-0"], data);
export const mapKeysArrayToOriginalData = (
  infoArray: TreeDataNode[],
  items: any
) => {
  const options = JSON.parse(JSON.stringify(items));
  const nameList = infoArray.map((opt) => opt.title);
  const updateSelected = (menuItems: any) => {
    return menuItems.map((opt: any) => {
      const ifSelected = nameList.includes(opt.menuName);
      const updateItem = { ...opt, isSelected: ifSelected ? 1 : 0 };
      if (opt.children) {
        updateItem.children = updateSelected(opt.children);
      }

      return updateItem;
    });
  };
  const reqData = updateSelected(options);
  return reqData;
};

// 用户管理部门列表根据接口返回数据转换成menu的格式
export const depColumnConvert: Function = (depList: IdeplistData[]) => {
  return depList.map((dep, i) => {
    let children = null;

    if (dep.children) {
      children = depColumnConvert(dep.children);
    }

    return {
      key: dep.id,
      label: dep.label,
      children: children,
    };
  });
};
