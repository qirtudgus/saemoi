import moment from 'moment';
import 'moment/locale/ko';
export const returnTodayString = () => {
  // let today = new Date();
  // let year = today.getFullYear();
  // let month = ('0' + (today.getMonth() + 1)).slice(-2);
  // let day = ('0' + today.getDate()).slice(-2);
  // let dateString = year + '.' + month + '.' + day;
  // let hours = ('0' + today.getHours()).slice(-2);
  // let minutes = ('0' + today.getMinutes()).slice(-2);

  // let timeString = hours + ':' + minutes;
  // let date = dateString + ' ' + timeString;
  //0000.00.00 00:00

  // return date;
  // return '2022/12/05 01:10:00';
  return moment().format('YYYY/MM/DD HH:mm:ss');
};

export const returnTodayString180s = () => {
  let seconds = 180;
  //현재시간으로부터 180초 더 한 시간을 리턴
  //  let now = moment().format('YYYY/MM/DD HH:mm:ss');
  let add = moment().add(seconds, 's').format('HH:mm:ss');
  return add;
};

export const returnTodayString180sMMSS = () => {
  let seconds = 10;
  //현재시간으로부터 180초 더 한 시간을 리턴
  //  let now = moment().format('YYYY/MM/DD HH:mm:ss');
  let add = moment().add(seconds, 's').format('HH:mm:ss');
  return add;
};

//삭제시간이 몇 초 남았는지 현재 시간 - 과거 시간
export const returnDeleteTime = (date: any) => {
  //화면에는 1초가 바로 깎여보이기때문에 +1 해주자.
  //현재시간으로부터 180초 더 한 시간을 리턴
  let 삭제예정시간 = date;
  let add = moment().diff(삭제예정시간, 'seconds');
  return Math.abs(add) + 1;
};

//과거로부터 현재까지 얼마나 경과했는지
export const returnDiffTime = (date: any) => {
  return moment(date).fromNow();
};

//글 작성이 지금으로부터 몇시간 경과했는지
// https://gurtn.tistory.com/166
// export function elapsedTime(date: any) {
//   const start = new Date(date);
//   const end = new Date(); // 현재 날짜
//   //ts2363 해결
//   //http://ccambo.github.io/Dev/Typescript/1.typescript-problem-solving-and-tips/
//   const diff = +end - +start; // 경과 시간

//   const times = [
//     { time: '초', milliSeconds: 1000 },
//     { time: '분', milliSeconds: 1000 * 60 },
//     { time: '시간', milliSeconds: 1000 * 60 * 60 },
//     { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
//     { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
//     { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
//   ].reverse();

//   // 년 단위부터 알맞는 단위 찾기
//   for (const value of times) {
//     const betweenTime = Math.floor(diff / value.milliSeconds);

//     // 큰 단위는 0보다 작은 소수 단위 나옴
//     if (betweenTime > 0) {
//       return `${betweenTime}${value.time} 전`;
//     }
//   }

//   // 모든 단위가 맞지 않을 시
//   return '방금 전';
// }
