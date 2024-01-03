export const fnPrice = (number) => {
  if(!number)return
  var str = number.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
};

export const date = (date) => {
  var date = new Date(date);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0

  // Định dạng lại thành "dd/mm"
  var formattedTime = `${day}-${month}`;
  return formattedTime;
};
export const year = (date) => {
  var date = new Date(date);
  var year = date.getUTCFullYear(); // Lấy  năm
  return year;
};
export const random = (max) => {
  return Math.floor(Math.random() * max);
};
export const fncut = (text) => {
  return text.split('-')[1]
};
export const fnPercent = (number) => {
  return Math.round(number / 10000000 * 100)
};
export const fnCheckMail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const result = emailPattern.test(email)
  return result;
}

