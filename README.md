# 멍 마을의 냥 (Mung & Nyang)

## 멍 & 냥 소개 영상 및 시나리오

- [홍보용 UCC 링크](https://www.youtube.com/watch?v=OB3aP5_KCRA)
- [게임 규칙 UCC 링크](https://www.youtube.com/watch?v=8tiCJVqR1Gk)

시연 시나리오는 [여기](https://lab.ssafy.com/s09-webmobile1-sub2/S09P12C209/-/blob/develop/exec/4.%20%EC%8B%9C%EC%97%B0%20%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4.md)에서 더 자세히 보실 수 있습니다.

## 기획 배경

신입사원 연수, 팀 프로젝트 등 팀워크가 필요한 활동에서 아이스 브레이킹을 진행해야하는 상황이 자주 생깁니다.<br>
아이스 브레이킹을 위해서는 주로 게임을 하는데 게임을 진행하기 위해서는 사회자 역할을 맡을 사람이 필요합니다.<br>
이 때, 사회자를 맡은 인원은 게임에 참여하지 못하기 때문에 아쉬움과 소외감 등을 느낄 수 있고, 사회자마다 진행에 차이가 있기 때문에 재미가 반감될 가능성이 있습니다.<br>
게다가 오프라인일 경우 Webex와 같은 화상채팅 앱이 있지만, 아이스 브레이킹을 위한 게임을 진행하기 힘들다는 단점이 있습니다.

그래서 사회자의 역할을 서비스에서 제공함으로써 소외되는 인원 없이, 모든 참가자가 온라인에서도 오프라인처럼 다른 사람의 얼굴을 보고 친해질 수 있는 재밌는 게임을 만들었습니다.


### 프로젝트 기간 - 2023.07.10 ~ 2021.08.18

## 서비스 화면 소개

### 메인 화면

<img src="./exec/gif/메인화면%20방생성.gif" width="640" height="360"/>

### 테스트 화면

<img src="./exec/gif/테스트화면.gif" width="640" height="360"/>

### 대기 화면

<img src="./exec/gif/대기방화면.gif" width="640" height="360"/>

### 게임 시작 투표 화면

<img src="./exec/gif/게임시작투표.gif" width="640" height="360"/>

### 정답자 투표 화면

<img src="./exec/gif/정답자투표.gif)" width="640" height="360"/>

### 카테고리 선택 화면 - 탐정 강아지

<img src="./exec/gif/카테고리선택1.gif" width="640" height="360"/>

### 제시어 설명 단계 - 시작 전 모달

<img src="./exec/gif/제시어설명직전.gif" width="640" height="360"/>

### 제시어 설명 단계 - 탐정 강아지

<img src="./exec/gif/제시어설명.gif" width="640" height="360"/>

### 비상 정답 기능

<img src="./exec/gif/비상정답.gif" width="640" height="360"/>

### 정답자 질문 화면

<img src="./exec/gif/정답자질문.gif" width="640" height="360"/>

### 최종정답 단계 - 탐정 강아지

<img src="./exec/gif/정답자%20최종정답.gif" width="640" height="360"/>

### 최종정답 단계 - 탐정 강아지가 아닌 사람들

<img src="./exec/gif/FinAnsOtherView.gif" width="640" height="360"/>

### 라이어 투표

<img src="./exec/gif/라이어투표.gif" width="640" height="360"/>

### 지목된 사람이 제시어를 고르는 화면

<img src="./exec/gif/라이어가정답고르는중.gif" width="640" height="360"/>

### 라이어 공개

<img src="./exec/gif/라이어%20공개.gif" width="640" height="360"/>

### 점수 집계

<img src="./exec/gif/점수집계.gif" width="640" height="360"/>

### 벌칙 화면

<img src="./exec/gif/Dance.gif" width="640" height="360"/>

## 주요 기능

- 서비스 설명 : 모두가 함께 참여할 수 있는 화상 심리 게임 서비스
- 주요 기능 :
  - webRTC를 통한 실시간 화상 채팅 게임
  - openvidu서비스를 이용해 게임 로직에 대한 signal 통신
  - 게임 단계 중 필요하다면 음성을 차단시키고, 특정 사운드를 출력
  - 사회자역할이 사라짐으로써 모두가 함께 즐길 수 있음.

### 🖥️ 개발 환경

---

🖱 **Backend**

- openjdk:11
  - 11.0.20+8 Azul Zulu: 11.66.15
- Spring Boot v2.7.14
- MariaDB v10.5.21
- Spring Data JPA
- Querydsl

🖱 **Frontend**

- React.js v18.2.0
- Redux v8.1.1
- reduxjs-toolkit v1.9.5
- Styled-Component v6.0.5
- WebRTC - OpenVidu v2.28.0
- node v16.20.1
- Kakao Message API

🖱 **IDE**

- IntelliJ v2023.1.3
- VSCode
- HeidiSQL

🖱 **Web RTC**

- openvidu 2.19.0

🖱 **Infra**

- AWS EC2
- Docker v24.0.5
- Nginx

### 서비스 아키텍처

---

![서비스 아키텍처](/exec/img/공통아키텍쳐C209.png)

### 게임 기대효과

---

- **팀워크향상**
  (no사회자)
  : 사회자의 역할 게임으로 제공
  소외되는 인원 x
- **어색한 분위기 x**
  : 재미있는 게임 + 행동표현
- **사용자 거리 해소**
  : 심리적, 물리적 거리 해소

### 기술 특이점

---

- **재미있는** 게임을 위한 데이터 관리

  - 카테고리별 제시어 구분, 중복된 의미의 단어 제거, 일반적인 사용자를 고려한 단어(어휘) 선택
    소중한 추억 제공 - 벌칙수행 영상 저장. 재미있는 순간 공유, 링크를 통해 손쉽게 접근 가능
    ![dbImg](/exec/img/dbdbimg.png)

- 소중한 **추억** 제공

  - 벌칙을 수행하는 영상을 저장해 플레이 도중에 있었던 재미있는 순간을 링크를 통해 손쉽게 공유

- WebRTC (Openvidu) **Signal**

  - Openvidu로만 할 수 있는 기능 뿐만이 아니라 웹소켓 기반인 signal 통신기능을 적극 활용하여 게임 로직을 개발했습니다. 또한, 방장만 게임을 시작할 수 있는 버튼을 부여하였고 누른다면 Signal 통신을 통해 찬반투표를 진행하고, 모두의 찬성을 받게된다면 게임의 진행을 시작하여 필요한 데이터에 대한 백과의 통신을 최소화하는 등 다양한 websocket통신 signal으로 게임 로직이 순차적으로 진행되도록 했습니다.
  - ![signals](/exec/img/openviduSignal.png)
  - 위 다양한 시그널들을 게임의 흐름에 걸맞게 통신해줌으로써 사용자가 느낄 수 있는 로딩이나 딜레이를 최소화시키고, 게임의 진행에 답답함이 느껴지지 않도록 api통신을 최소화할 수 있었습니다.

- **redux**-toolkit

  - 프론트엔드 구현시 단계별 컴포넌트 내부에서 sessio상태를 관리하기 위해서 redux와 redux-toolkit을 이용하여 openvidu를 이용한 게임방 세션에 관한 데이터 상태관리를 전역으로 수행하였고, 진행되는 게임에 대한 정보 또한 컴포넌트가 아닌 game slice를 따로 구성하여 필요한 데이터를 업데이트 및 초기화하였습니다.

- **배포** : 배포에 관한 상세 정보는 [여기](/exec/1.%20배포%20정리.md)에 있습니다.

### 👨‍👩‍👧 협업 툴

---

- Git
  ![gitImgMR](/exec/img/gitImgMR.png)
- Jira
  ![jiraImg](/exec/img/jiraimg.png)
- Figma
  ![figmaImg](/exec/img/figmaimg.png)
- Notion
  ![notionImg](/exec/img/notionimg.png)
- Mattermost

### 💭 요구사항 정의서

---

[요구사항 정의서](https://www.notion.so/01614f3d880441f98d5bf0badbfe62d2?pvs=21)

## ✨컨벤션

### git

```bash
커밋 타입: 내용 자세히 적어주기

→ git commit -m “Feat : 회원 가입 기능 추가”
```

ex) feat, bug … label

- **Feat** : 새로운 기능 추가
- **Fix** : 오류에 대한 문제 해결
- **Patch** : 기능 개선
- **Docs** : 문서 작업
- **Style** : 간단한 코드 작업
- **Merge** : develop머지 충돌시 수정후 커밋

### 💡 Git Flow 브랜치 전략

---

- Git Flow model을 사용하고, Git 기본 명령어 사용한다.

- Git Flow 사용 브랜치

  - feature - 기능
  - develop - 개발 및 배포 테스트
  - master - 배포

- Git Flow 진행 방식

  1. feature 브랜치가 완성되면 develop 브랜치로 merge request를 통해 merge

     ⇒ merge request가 요청되면, 선정한 리뷰어와 함께 코드 리뷰를 하여 안전하게 merge

  2. 브랜치를 세분화해서 작업함으로써 충돌을 최소화

- feature 브랜치 이름 명명 규칙

  - [FE or BE]\_feature/[기능 이름]

```bash
BE_feature/room-create
FE_feature/button
```

### Jira

---

프로젝트 진행을 위한 일정 및 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 회의를 통해 한 주 동안 진행되어야 할 주 단위의 스프린트 계획을 짜고, 진행할 이슈들을 등록했습니다.

- 에픽(Epic) : 요구사항 정의서의 대분류 기능
- 작업(Task) : 해당 기능에 필요한 상세 기능
- 월요일마다 스프린트 시작
- 그 주에 할일 이슈들로 정리 → 진행중에는 되도록 하나의 태스크만.
- Story - 게임의 흐름단계에 따라 나눔

이 외에, 협업 메신저(Mattermost)에 알람을 등록하여 작업 상황을 실시간으로 확인할 수 있도록 했습니다.

### Notion

---

모두가 봐야할 공지, 함께 공부해야 할 링크 등을 모아두고 찾아보기 쉽게 정리하였습니다. 또한, 모든 회의 및 피드백은 기록으로 남겨두어서 잘 반영할 수 있도록 하였습니다. 컨벤션 규칙, API명세서 등도 노션에 기록하여 모두가 상시 확인할 수 있도록 관리했습니다.

### Scrum

---

매일 아침 9시에 어제 했던 일, 오늘 할 일을 각자 정리해서 5~10분 동안 서로 공유하는 시간을 가졌습니다. Scrum을 통해 팀원들의 현재 상황을 공유하여 프로젝트에 대한 전체적 흐름을 모두가 파악할 수 있었습니다.

### Front-end

- 색상 컬러 코드
- 폰트 종류 및 사이즈
- **변수와 메서드의 네이밍 규칙**
- 줄바꿈, 인덴팅 규칙
- **state, props 순서 및 네이밍?**

### 폴더구조

```
├─public - 손안대도됨
└─src
├─api
├─assets 이미지, 영상들
├─components - 컴포넌트들
 └─style - GlobalStyle.js : 전역 css설정해주는 컴포넌트
    │
    |
    ├─css - App.css
    |  └— style - 컴포넌트에 css파일 import가 필요한 경우 사용
    └─views - 페이지 파일들
    └- game
    └- home
    └- …
```

- 컴포넌트의 확장자는 .jsx확장자로 통일 하되 이외의 js파일들은 .js로

- styled-component 쓸때 유의할점 - 함수안에 넣으면 노란색 에러뜸

  [styled-components: Basics](https://styled-components.com/docs/basics#passed-props)

- 컴포넌트 내부 컨벤션

  - 위에서부터 props → redux변수 → state순으로 나열.
  - 함수는 useEffect문 → 이동및 변수변환로직 → api관련 로직

### ✨ ER Diagram

---

![erd](/exec/img/mungnyangERD.png)

### ✨ EC2 포트 정리

---

| **PORT** |                        **이름**                         |
| :------: | :-----------------------------------------------------: |
|   443    |                          HTTPS                          |
|    80    | HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트) |
|   5443   |                        Openvidu                         |
|   3000   |                          React                          |
|   3306   |                          MySQL                          |
|   5442   |              Spring boot Docker Container               |

### 😃 팀원 역할

### 회고
