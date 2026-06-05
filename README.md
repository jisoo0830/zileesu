# UPERMODE Fashion Archive Website

순수 HTML, CSS, JavaScript로 만든 패션 브랜드 아카이브/룩북 웹사이트입니다. 별도 빌드 과정 없이 GitHub Pages에 바로 배포할 수 있습니다.

## 구조

- `index.html`: 메인 비주얼, 룩북, 컬렉션, 프로젝트 프리뷰
- `collections/`: 컬렉션 목록과 시즌 상세 페이지
- `projects/`: 프로젝트 목록과 프로젝트 상세 페이지
- `about/`: 브랜드 소개와 연락처
- `assets/css/styles.css`: 컬러 시스템, 레이아웃, 반응형 스타일
- `assets/js/site.js`: 메뉴, 스크롤 리빌, 연도 표기
- `assets/brand/logo.svg`: 교체용 로고 파일
- `assets/images/`: 교체용 룩북/캠페인 이미지

## 교체 지점

브랜드 컬러는 `assets/css/styles.css` 상단의 `:root`에서 변경합니다.

```css
:root {
  --color-bg: #f4f7e9;
  --color-text: #172008;
  --color-accent: #849639;
  --image-filter: saturate(0.84) sepia(0.18) hue-rotate(34deg);
}
```

로고는 `assets/brand/logo.svg` 파일을 같은 이름으로 교체하거나, HTML의 `<img src="...">` 경로를 새 파일명으로 바꾸면 됩니다.

이미지는 `assets/images/` 안의 파일을 같은 이름으로 교체하면 가장 쉽습니다.

- `hero-01.jpg`: 메인 첫 화면
- `look-01.jpg`부터 `look-06.jpg`: 룩북 이미지
- `collection-ss26.jpg`, `collection-fw25.jpg`: 컬렉션 대표 이미지
- `project-archive.jpg`, `project-campaign.jpg`, `project-film.jpg`: 프로젝트 대표 이미지
- `about-studio.jpg`: 어바웃 페이지 이미지

권장 비율은 세로 이미지는 `4:5` 또는 `3:4`, 와이드 이미지는 `16:10`입니다.

## 새 시즌 또는 프로젝트 추가

1. `collections/ss26.html` 또는 `projects/archive.html`을 복사합니다.
2. 파일명과 내부 제목을 새 시즌/프로젝트명으로 바꿉니다.
3. 이미지 경로와 캡션을 교체합니다.
4. `collections/index.html` 또는 `projects/index.html`에 새 링크를 추가합니다.

## 배포

GitHub 저장소에 파일을 올린 뒤 Pages 설정에서 배포 브랜치를 선택하면 됩니다. 빌드 명령은 필요 없습니다.
