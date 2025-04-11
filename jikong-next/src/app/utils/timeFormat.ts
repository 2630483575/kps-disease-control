import moment from "moment";

export const timeFormat = (time: number) => {
  moment(time).format("YYYY/MM/DD hh:mm:ss");
};
