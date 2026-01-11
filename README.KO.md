## 한국어 (Korean)

# IdeaBridge Korea

IdeaBridge Korea는 비기술 사용자와 IT 전문가를 연결하여 실생활 문제를 검증된 디지털 제품으로 변환하는 디지털 플랫폼입니다. 한국 시장을 위한 구조화되고 안전하며 문화적으로 적절한 환경을 제공합니다.

## 🚀 기능

### 문제 제출자 (Problem Owners)
- 문제 제출 및 관리
- IT 전문가의 솔루션 제안 확인
- 솔루션 승인 및 협업

### IT 전문가 (IT Professionals)
- 문제 탐색 및 검색
- 솔루션 제안 제출
- 대시보드를 통한 솔루션 관리
- 프로필 관리

### 주요 기능
- ✅ 사용자 인증 시스템 (문제 제출자/IT 전문가)
- ✅ 문제 제출 및 목록 보기
- ✅ 문제 상세 보기 및 솔루션 제안
- ✅ IT 전문가 대시보드
- ✅ 프로필 관리
- ✅ 한국어 및 영어 UI 지원
- ✅ 반응형 디자인

## 🛠️ 기술 스택

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Storage**: LocalStorage (MVP용)

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
- 브라우저에서 http://localhost:3000을 열어 확인하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```
## 📁 프로젝트 구조
```bash
ideabridge-korea/
├── src/
│   ├── app/                 # Next.js App Router 페이지
│   │   ├── dashboard/       # IT 전문가 대시보드
│   │   ├── login/           # 로그인 페이지
│   │   ├── register/        # 회원가입 페이지
│   │   ├── problems/        # 문제 관련 페이지
│   │   │   ├── [id]/        # 문제 상세 페이지
│   │   │   └── new/         # 새 문제 제출 페이지
│   │   ├── profile/         # 프로필 페이지
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈 페이지
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Navbar.tsx       # 네비게이션 바
│   │   └── Footer.tsx       # 푸터
│   ├── lib/                 # 유틸리티 함수
│   │   └── auth.ts          # 인증 및 데이터 관리
│   └── types/               # TypeScript 타입 정의
│       └── index.ts
├── public/                  # 정적 파일
└── package.json
```
## 🔐 인증 (MVP)
```bash
현재 MVP 버전에서는 LocalStorage를 사용한 간단한 인증 시스템을 사용합니다.

데모 계정
문제 제출자: owner@example.com / 비밀번호: password (6자 이상)
IT 전문가: pro@example.com / 비밀번호: password (6자 이상)
또는 새로운 계정을 등록할 수 있습니다.
```
## 🎯 주요 페이지
```bash
홈 페이지 (/)
플랫폼 소개
주요 기능 안내
회원가입/로그인 링크
문제 목록 (/problems)
모든 공개된 문제 목록
검색 및 필터링 기능
문제 제출 버튼 (문제 제출자용)
문제 제출 (/problems/new)
문제 상세 정보 입력
카테고리, 긴급도, 예산 등 설정
문제 상세 (/problems/[id])
문제 상세 정보
솔루션 제안 폼 (IT 전문가용)
제안된 솔루션 목록
IT 전문가 대시보드 (/dashboard)
통계 정보
최근 문제 목록
내 솔루션 관리
프로필 (/profile)
사용자 정보 수정
기술 스택 관리 (IT 전문가용)
자기소개 업데이트
```
## 🌐 한국어 지원
플랫폼은 한국어 (한국어) 와 영어 (English) 를 완벽하게 지원하며, 네비게이션 바의 언어 선택 메뉴를 통해 언어를 전환할 수 있습니다. 모든 UI 텍스트와 디자인은 한국 문화와 비즈니스 관행을 따릅니다.

지원 언어

- 🇰🇷 한국어 (한국어) - 완벽 구현됨
- 🇬🇧 영어 (English) - 완벽 구현됨

브라우저 설정에 따른 자동 언어 감지도 사용 가능합니다.

## 🔄 향후 개발 계획
 - 실제 데이터베이스 통합 (현재 LocalStorage 사용)
 - 실제 인증 시스템 (JWT, OAuth 등)
 - 파일 업로드 기능
 - 실시간 알림 시스템
 - 채팅/메시징 기능
 - 결제 시스템 통합
 - 리뷰 및 평가 시스템
 - 관리자 대시보드

## 📝 라이선스
이 프로젝트는 MVP 버전입니다.

## 🤝 기여
이 프로젝트에 기여하고 싶으시다면, 이슈를 등록하거나 풀 리퀘스트를 제출해주세요.

## 📧 문의
프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

IdeaBridge Korea - 문제와 해결책을 연결하는 플랫폼
