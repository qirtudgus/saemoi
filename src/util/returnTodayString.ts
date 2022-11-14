export const returnTodayString = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let dateString = year + '.' + month + '.' + day;
  let hours = ('0' + today.getHours()).slice(-2);
  let minutes = ('0' + today.getMinutes()).slice(-2);

  let timeString = hours + ':' + minutes;
  let date = dateString + ' ' + timeString;
  //0000.00.00 00:00
  return date;
};
