import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#52c41a",
  },
  components: {
    Menu: {
      itemSelectedBg: "rgb(22, 119, 255)",
      itemSelectedColor: "rgb(255, 255, 255)",
      colorPrimary: "rgb(0, 0, 0)",
      iconMarginInlineEnd: 20,
      activeBarBorderWidth: 0,
    },
  },
};

export default theme;
