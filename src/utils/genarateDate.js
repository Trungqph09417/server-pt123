import moment from "moment";
const formatDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
  let date = `${timeObj.getDate()}/${
    timeObj.getMonth() + 1
  }/${timeObj.getFullYear()}`;
  let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;
  return `${day}, ${time} ${date}`;
};
const genarateDate = () => {
  let gapExprire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let exprireDay = moment(today).add(gapExprire, "d").toDate();
  return {
    today: formatDate(today),
    exprireDay: formatDate(exprireDay),
  };
};

export default genarateDate;
