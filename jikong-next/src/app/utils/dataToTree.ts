// 根据接口数据转换成tree展示的数据格式generateKeys(data,'0')
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

// 根据tree展示调用接口 mapKeysArrayToOriginalData(["0-0"], data);
export const mapKeysArrayToOriginalData = (keysArray: string[], items: any) => {
  for (const key of keysArray) {
    let currentLevel = items;
    let currentItem;
    const originKey = key.replace("0-", "");
    const keyParts = originKey.split("-");

    for (const part of keyParts) {
      const index = parseInt(part);
      currentItem = currentLevel[index];

      if (!currentItem) {
        console.log("Invalid key");
        return;
      }

      currentLevel = currentItem.children || [];
    }

    if (currentItem) {
      currentItem.isSelected = 1;
    }
  }
};
