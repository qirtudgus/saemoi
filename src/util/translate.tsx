export const translate = (e: string) => {
  console.log(e);

  let arr = e.split('');
  console.log(arr);

  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    switch (arr[i]) {
      case 'ㅂ':
        return 'Q';
      case 'ㅃ':
        return 'Q';
      case 'ㅈ':
        return 'W';
      case 'ㅉ':
        return 'W';
      case 'ㄷ':
        return 'E';
      case 'ㄸ':
        return 'E';
      case 'ㄱ':
        return 'R';
      case 'ㄲ':
        return 'R';
      case 'ㅅ':
        return 'T';
      case 'ㅆ':
        return 'T';
      case 'ㅛ':
        return 'Y';
      case 'ㅕ':
        return 'U';
      case 'ㅑ':
        return 'I';
      case 'ㅐ':
        return 'O';
      case 'ㅒ':
        return 'O';
      case 'ㅔ':
        return 'P';
      case 'ㅖ':
        return 'P';
      case 'ㅁ':
        return 'A';
      case 'ㄴ':
        return 'S';
      case 'ㅇ':
        return 'D';
      case 'ㄹ':
        return 'F';
      case 'ㅎ':
        return 'G';
      case 'ㅗ':
        return 'H';
      case 'ㅓ':
        return 'J';
      case 'ㅏ':
        return 'K';
      case 'ㅣ':
        return 'L';
      case 'ㅋ':
        return 'Z';
      case 'ㅌ':
        return 'X';
      case 'ㅊ':
        return 'C';
      case 'ㅍ':
        return 'V';
      case 'ㅠ':
        return 'B';
      case 'ㅜ':
        return 'N';
      case 'ㅡ':
        return 'M';

      default:
        return e;
    }
  }
};
