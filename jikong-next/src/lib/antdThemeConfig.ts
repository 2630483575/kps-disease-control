import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#52c41a",
  },
  components: {
    Menu: {
      itemSelectedBg: "rgb(22, 119, 255)",
      itemSelectedColor: "rgb(253, 250, 250)",
      colorPrimary: "rgb(0, 0, 0)",
      iconMarginInlineEnd: 20,
    },
  },
};

export default theme;
