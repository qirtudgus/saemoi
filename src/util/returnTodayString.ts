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
//글 작성이 지금으로부터 몇시간 경과했는지
// https://gurtn.tistory.com/166
export function elapsedTime(date: any) {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜
  //ts2363 해결
  //http://ccambo.github.io/Dev/Typescript/1.typescript-problem-solving-and-tips/
  const diff = +end - +start; // 경과 시간

  const times = [
    { time: '초', milliSeconds: 1000 },
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  // 모든 단위가 맞지 않을 시
  return '방금 전';
}
