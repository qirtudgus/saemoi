# 포레이드
포레이드는 포켓몬스터 스칼렛/바이올렛의 컨텐츠 중 하나인 테라레이드 배틀을
함께할 파티원을 모집하기위한 1인 개발 서비스입니다.

목차

1. [Stacks](#-stacks)
2. [진행 동기](#-진행-동기)
3. [프로젝트를 통해 경험한 것!](#-프로젝트를-통해-경험한-것)

## 🛠 Stacks
### Frontend
React / TypeScript / Styled-Components / Redux / Redux-Toolkit
### Backend
Node / MySQL
### Deploy
AWS-EC2-Linux /  Nginx / Git Actions


## 🚗 진행 동기
포켓몬스터 게임에는 ‘레이드’라는 컨텐츠가 있습니다.
레이드는 온라인을 통해 최대 4명의 사용자가 모여 힘을 합쳐, 강한 몬스터를 무찌르고 보상을 얻는
구조입니다. 하지만 같이 플레이할 사용자를 모으는 것이 쉽지 않았고,
이에 대한 접근성을 높여준다면 많은 사용자가 필요로 할거라 생각했습니다.
그리하여 사용자를 모집하고 레이드를 진행할 수 있게 해주는 서비스를 만들기로 결심했습니다.

## 🏆 프로젝트를 통해 경험한 것!
- #### 사용자에게 실제로 서비스를 제공하는 경험을 해보는 것이 목표였다.
목표를 위해 프로젝트를 온라인상에 홍보하였고,
구글 애널리틱스로 집계 해본 결과 일주일간 약 2600명의 방문자가 있었으며 최대 동시접속자는 140명정도까지
올라갔습니다. 온라인의 반응을 모니터링하며, 사용자들이 피드백 해준 사항들을 개선하기도 했습니다.

- #### Socket.IO를 통한 실시간 리스트 구현
사용자들에게 어떤 방식으로 서비스를 제공해야하는지 고민하는 과정에서 여러 착오가 있었습니다.
초기에는 일반적인 게시판 형식으로 구축하였습니다. 하지만 테스트 과정에서 사용자 친화적이지 않음을 느꼈고,
추가 http 요청없이 패킷으로 양방향 통신이 가능한 라이브러리 Socket.IO를 채택하였습니다.
이를 통해 실시간 게시물과 현재 접속자 수 등을 구현했습니다.

- #### 기기별 알람 기능 구현
포레이드는 새로운 게시물이 올라왔을때 연결된 사용자들에게 소리 또는 진동을 통해 알람을 보냅니다.
알람 기능은 사용자 편의성을 위해 뒤늦게 추가된 기능입니다.
Socekt.IO를 통해 실시간으로 게시물을 확인할 수 있지만, 이는 화면을 주시해야하고있는 문제로 직결되었습니다.
이를 해결하고자 **audio, Notification API, Vibration API**를 도입했습니다.

- #### node-schedule을 이용한 주기별 서버 데이터 정리
포레이드에서는 하루동안 몇개의 게시물이 올라왔는지 화면에 안내하고있습니다.
서버에서는 자정이 지날때마다 node-schedule을 통해 게시물 갯수를 초기화 해줍니다.
등록된 게시물은 3분 뒤에 자동으로 삭제되도록 구현했으며, DB에 저장합니다.

- #### Redux를 통해 서버에서 받은 실시간 게시물을 관리하고 렌더링
- #### socket ID로 사용자를 식별하여 자신이 올린 게시물을 삭제
- #### styled-components의 ThemeProvider를 통한 공통 스타일 관리
- #### pm2를 이용하여 서버 프로세스 관리
- #### new Date() 크로스 브라우징 이슈로 인해 moment 라이브러리 채택
- #### cookie와 jwt를 이용하여 로그인 기능 구현



