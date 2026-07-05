const customerData = Object.freeze([
  {
    name: "삼성카드 고객센터",
    category: "카드",
    phone: "1588-8700",
    ars_path: "",
    tip: "내가 직접 전화를 걸어봤는데 디지털 ARS나 말하는 ARS를 거치는 것보다 일반 누르는 ARS를 선택해 0번을 누르는 게 제일 빨라요.",
    description: "삼성카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.samsungcard.com"
  },
  {
    name: "신한카드 고객센터",
    category: "카드",
    phone: "1544-7000",
    ars_path: "",
    tip: "내가 상담원 연결을 시도해 봤더니 AI 상담은 이해를 못 할 때가 많아 바로 누르는 ARS 3번을 선택하는 것이 정답이었습니다.",
    description: "신한카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.shinhancard.com"
  },
  {
    name: "KB국민카드 고객센터",
    category: "카드",
    phone: "1588-1688",
    ars_path: "",
    tip: "저는 보이는 ARS 화면이 뜨면 오히려 헷갈려서 2번 음성 ARS로 들어가 0번을 누르고 본인 확인을 마친 뒤 상담사를 연결해요.",
    description: "KB국민카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "현대카드 고객센터",
    category: "카드",
    phone: "1577-6000",
    ars_path: "",
    tip: "제 경험상 스마트폰 앱에 로그인한 상태에서 전화를 걸면 불필요한 카드번호 입력 없이 상담사와 바로 매핑되어 시간 절약에 좋습니다.",
    description: "현대카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hyundaicard.com"
  },
  {
    name: "롯데카드 고객센터",
    category: "카드",
    phone: "1588-8100",
    ars_path: "",
    tip: "저는 매달 결제일 23일 전에는 통화량이 엄청나서 일부러 결제일이 한참 남은 주 초반 아침 9시 직후에 연락을 취하고 있어요.",
    description: "롯데카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.lottecard.co.kr"
  },
  {
    name: "우리카드 고객센터",
    category: "카드",
    phone: "1588-9955",
    ars_path: "",
    tip: "내가 상담을 받아봤는데 디지털 ARS 문자가 오면 화면에서 원하는 메뉴를 터치해 직접 처리하는 게 가장 막힘없이 편리했습니다.",
    description: "우리카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "하나카드 고객센터",
    category: "카드",
    phone: "1800-1111",
    ars_path: "",
    tip: "제 경험상 하나페이 앱에서 챗봇 '고객센터'를 먼저 이용하고, 해결이 안 될 때 전화 버튼을 누르면 이력 추적이 되어 처리가 훨씬 빨라요.",
    description: "하나카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hanacard.co.kr"
  },
  {
    name: "NH농협카드 고객센터",
    category: "카드",
    phone: "1644-4000",
    ars_path: "",
    tip: "내가 전화를 걸 때 농협은행 영업 지점 마감 시간인 오후 3시 반 이후에는 대기가 수십 명에 달하니 가급적 오전 11시 전에 전화하는 걸 추천해요.",
    description: "NH농협카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.nonghyup.com"
  },
  {
    name: "BC카드 고객센터",
    category: "카드",
    phone: "1588-4000",
    ars_path: "",
    tip: "제 경우에는 카드를 발급한 은행(예: 우리, 농협, 기업 등)의 고객센터에 먼저 확인해야 할 일인지 알아보고 문의하는 편이 확실했습니다.",
    description: "BC카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.bccard.com"
  },
  {
    name: "현대캐피탈 고객센터",
    category: "카드",
    phone: "1588-2114",
    ars_path: "",
    tip: "제가 주로 이용해 보니 중도상환 수수료나 계약 해지 서류가 필요할 때 미리 상담원을 지정해 통화하면 팩스 발송까지 한 번에 끝나요.",
    description: "현대캐피탈 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hyundaicapital.com"
  },
  {
    name: "엘포인트 (롯데멤버스) 고객센터",
    category: "카드",
    phone: "1899-8900",
    ars_path: "",
    tip: "내가 실제로 엘포인트 통합 조회를 할 때, 롯데멤버스 제휴사 포인트 합산 한도를 늘리고 싶다면 실시간 전화 상담이 가장 매끄럽습니다.",
    description: "엘포인트 (롯데멤버스) 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.lpoint.com"
  },
  {
    name: "아메리칸 익스프레스 고객센터",
    category: "카드",
    phone: "1811-7437",
    ars_path: "",
    tip: "제가 국내 공항 라운지를 무료로 이용하고 싶은데 혜택 확인이 긴가민가할 때, 더라운지 전담 센터에 전화해서 소지 카드를 말씀드리니 즉시 해결됐습니다.",
    description: "아메리칸 익스프레스 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.americanexpress.com/ko-kr"
  },
  {
    name: "온누리상품권 고객센터",
    category: "카드",
    phone: "1670-1600",
    ars_path: "",
    tip: "내가 충전식 카드형 온누리상품권을 앱에 등록하는 과정에서 오류가 났을 때, 전용 1357 번호로 전화하면 원격으로 깔끔하게 조치해 줍니다.",
    description: "온누리상품권 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.sbiz.or.kr"
  },
  {
    name: "페이북 (BC카드) 고객센터",
    category: "카드",
    phone: "1899-7771",
    ars_path: "",
    tip: "저는 오프라인 편의점 등에서 페이북 바코드가 리더기에 안 읽히는 현상이 지속될 때 전용 전화로 실시간 카드 재매핑 지침을 얻어 해결했습니다.",
    description: "페이북 (BC카드) 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://paybooc.co.kr"
  },
  {
    name: "문화누리카드 고객센터",
    category: "카드",
    phone: "1544-3412",
    ars_path: "",
    tip: "내가 단순하게 지원금의 잔액 조회만 하고 싶다면 내선 번호 2번을 눌러 카드번호와 생년월일만 뚝딱 입력하는 게 최고로 빨라요.",
    description: "문화누리카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.mnuri.kr"
  },
  {
    name: "농협상품권 통합관리센터 고객센터",
    category: "카드",
    phone: "02-2080-4949",
    ars_path: "",
    tip: "내가 하나로마트에서 농촌사랑상품권 잔액(60% 이상 사용 필수) 환불이 거부당했을 때 해당 통합센터에 전화하면 본사가 해당 지점에 직통 조치를 해 줘요.",
    description: "농협상품권 통합관리센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.nonghyup.com"
  },
  {
    name: "한국통신선불카드 고객센터 고객센터",
    category: "카드",
    phone: "080-2580-721",
    ars_path: "",
    tip: "저는 선불 공중전화 카드가 단말기에서 긁히지 않아 당황했을 때 수신자부담 080 번호로 전화해 실시간 교환 발송을 받았습니다.",
    description: "한국통신선불카드 고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.kt.com"
  },
  {
    name: "신한카드 분실 및 승인센터 고객센터",
    category: "카드",
    phone: "1544-7200",
    ars_path: "",
    tip: "내가 지갑을 잃어버렸을 때 대표 종합콜센터로 걸면 통화 대기가 걸려 위험하니 꼭 분실 및 승인 1544-7200 직통 번호로 거시는 게 최선입니다.",
    description: "신한카드 분실 및 승인센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.shinhancard.com"
  },
  {
    name: "신한카드 단장기 카드대출 고객센터",
    category: "카드",
    phone: "1588-0303",
    ars_path: "",
    tip: "저는 카드론을 받기 전에 우대 이율 쿠폰이 적용되었는지 확인하기 위해 상담사와 직접 유선 대화를 하여 최종 이율 조정을 받아봅니다.",
    description: "신한카드 단장기 카드대출 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.shinhancard.com"
  },
  {
    name: "신한카드 할부금융센터 고객센터",
    category: "카드",
    phone: "1544-7100",
    ars_path: "",
    tip: "내가 수입차 구매를 하려는데 신한카드의 오토캐시백 한도가 부족할 때, 이곳에 연락하면 즉석에서 심사원 배정 후 증액 서류를 접수해 줍니다.",
    description: "신한카드 할부금융센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.shinhancard.com"
  },
  {
    name: "신한카드 외국인전용 데스크 고객센터",
    category: "카드",
    phone: "1544-7300",
    ars_path: "",
    tip: "제 외국인 지인이 국내 계좌 연동 과정에서 오류가 나 통화할 때, 이곳으로 연결하면 영어와 중국어로 귀찮은 검증을 능숙하게 이끌어 줍니다.",
    description: "신한카드 외국인전용 데스크 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.shinhancard.com"
  },
  {
    name: "우리카드 종합고객센터 고객센터",
    category: "카드",
    phone: "1588-9955",
    ars_path: "",
    tip: "저는 우리카드 앱을 통해 통화 연결 전에 '보이는 디지털 ARS'를 활용하면 굳이 말을 하지 않고 터치만으로 90%의 업무를 먼저 단축해요.",
    description: "우리카드 종합고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "우리카드 분실신고 ARS 고객센터",
    category: "카드",
    phone: "1588-5300",
    ars_path: "",
    tip: "내가 해외 여행 도중 우리체크카드를 유실했을 때에는 해외 로밍 직통 전용 라인보다는 1588-5300 전용 정지 전화를 하면 일괄 정지가 즉시 보장됩니다.",
    description: "우리카드 분실신고 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "우리카드 카드전화신청 센터 고객센터",
    category: "카드",
    phone: "1599-0200",
    ars_path: "",
    tip: "저는 모바일 웹 카드 가입 양식이 너무 길어서 귀찮을 때 1599-0200 발급 데스크로 다이렉트 전화를 걸어 말로 신속히 발급받습니다.",
    description: "우리카드 카드전화신청 센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "우리카드 금융서비스 ARS 고객센터",
    category: "카드",
    phone: "1577-9000",
    ars_path: "",
    tip: "내가 갑자기 당일 결제가 밀려 현금서비스를 받아야 할 때 이 번호로 본인 확인을 마친 뒤 즉시 출금 정리를 마쳐요.",
    description: "우리카드 금융서비스 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "우리카드 자동차할부금융 고객센터",
    category: "카드",
    phone: "1544-9800",
    ars_path: "",
    tip: "제 경험상 자동차 매매 계약 시 우리오토 다이렉트 할부의 추가 우대 할인 한도와 금리를 이곳에서 실시간 조율할 때 혜택이 제일 컸습니다.",
    description: "우리카드 자동차할부금융 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "KB국민카드 단장기 카드대출 고객센터",
    category: "카드",
    phone: "1588-2788",
    ars_path: "",
    tip: "저는 신용 등급이 상향되었을 때 곧바로 이 대출 콜센터에 전화하여 금리 인하 요구권을 행사해 이자를 확 낮춥니다.",
    description: "KB국민카드 단장기 카드대출 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 분실 및 승인센터 고객센터",
    category: "카드",
    phone: "1588-1788",
    ars_path: "",
    tip: "내가 해외 직구 결제 후 원화 승인 차단으로 거절이 났을 때, 이곳에 전화하면 24시간 즉시 보류를 해제해 성공적인 직구가 가능해요.",
    description: "KB국민카드 분실 및 승인센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 간편전화신청 고객센터",
    category: "카드",
    phone: "1800-6293",
    ars_path: "",
    tip: "내가 웹사이트에서 마음에 드는 카드를 골랐는데 모바일 인증 오류로 먹통이 될 때, 이 1800 번호로 걸어 서류를 구두 접수하면 아주 말끔합니다.",
    description: "KB국민카드 간편전화신청 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 결제 및 제신고 고객센터",
    category: "카드",
    phone: "1899-0800",
    ars_path: "",
    tip: "저는 이사로 인해 주민등록지와 청구서 수령 주소를 일괄 변경해야 할 때, 복잡한 종합콜 대신 이곳 결제전용 직통선으로 바로 바꿉니다.",
    description: "KB국민카드 결제 및 제신고 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 자동납부제휴카드 고객센터",
    category: "카드",
    phone: "1577-9900",
    ars_path: "",
    tip: "내가 새로 분양받은 아파트 관리비를 카드로 자동이체 전환할 때, 종합콜센터 대기를 건너뛰고 1577-9900 제휴 납부 라인으로 거니 바로 승인되었어요.",
    description: "KB국민카드 자동납부제휴카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 KB Pay 전용라인 고객센터",
    category: "카드",
    phone: "1644-9311",
    ars_path: "",
    tip: "제 경험상 KB Pay 포인트리가 정상 적립되지 않거나 타인명의 기기 등록 해제가 긴급할 때 이 전문부서로 걸면 본인인증 후 원스톱으로 리셋해 줍니다.",
    description: "KB국민카드 KB Pay 전용라인 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 자동차구매 특별한도 고객센터",
    category: "카드",
    phone: "1599-0036",
    ars_path: "",
    tip: "내가 국산 신차를 KB국민카드로 일시불 결제하여 오토캐시백을 최대화하고 싶다면 딜러 옆에서 바로 이 라인으로 전화해 즉시 특별한도를 받으세요.",
    description: "KB국민카드 자동차구매 특별한도 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 외국인 전용데스크 고객센터",
    category: "카드",
    phone: "1644-9993",
    ars_path: "",
    tip: "제 회사 동료인 외국인의 계좌 등록 및 서류 제출을 조력할 때, 영어 전용 1번을 누르고 전화를 거는 편이 대화 오해 없이 정확한 심사를 해줍니다.",
    description: "KB국민카드 외국인 전용데스크 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 점자카드 신청데스크 고객센터",
    category: "카드",
    phone: "1670-9090",
    ars_path: "",
    tip: "저는 저시력 가족을 위한 점자 카드 실물 배송이 완료되었을 때, 이 다이렉트 전화를 통해 안전 수령 등록을 차분하게 마쳤습니다.",
    description: "KB국민카드 점자카드 신청데스크 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "KB국민카드 디지털ARS 서비스 고객센터",
    category: "카드",
    phone: "1644-7946",
    ars_path: "",
    tip: "내가 통화 중에 대기 음악을 수십 분 동안 듣기 싫을 때, 1644-7946 번호로 걸어 모바일 화면을 띄운 뒤 즉시 선결제를 마치면 너무 간편해요.",
    description: "KB국민카드 디지털ARS 서비스 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.kbcard.com"
  },
  {
    name: "비씨카드 VIP서비스 전용데스크 고객센터",
    category: "카드",
    phone: "1566-7890",
    ars_path: "",
    tip: "제가 VIP 연회비 기프트인 프리미엄 식사권이나 호텔 숙박권을 예약해야 할 때 이 직통 VIP 라인으로 신청하면 특급 처리를 해줍니다.",
    description: "비씨카드 VIP서비스 전용데스크 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.bccard.com"
  },
  {
    name: "비씨카드 가맹점거래승인 ARS 고객센터",
    category: "카드",
    phone: "1588-4500",
    ars_path: "",
    tip: "내가 가계 점포에서 카드 결제기가 고장 났는데 손님이 바빠서 가셔야 할 때, 손님의 비씨카드를 수동으로 즉석 유선 승인 처리하여 무사히 정산받았습니다.",
    description: "비씨카드 가맹점거래승인 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.bccard.com"
  },
  {
    name: "비씨카드 단기카드대출 ARS 고객센터",
    category: "카드",
    phone: "1566-7777",
    ars_path: "",
    tip: "저는 신용 한도를 미리 체크하지 못했을 때 이 전용 번호로 전화해 즉시 가능한 소액 대출 한도를 눈으로 확인하듯 음성 안내로 실시간 파악해요.",
    description: "비씨카드 단기카드대출 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.bccard.com"
  },
  {
    name: "비씨카드 분실신고 ARS 고객센터",
    category: "카드",
    phone: "1588-4515",
    ars_path: "",
    tip: "내가 지방 출장지나 혹은 지하철에서 지갑을 분실했을 때, 1588-4515 직통 도난 분실 번호를 사용하면 신속하고 완벽히 가맹점 승인을 묶을 수 있어요.",
    description: "비씨카드 분실신고 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.bccard.com"
  },
  {
    name: "비씨카드 부가서비스 SMS센터 고객센터",
    category: "카드",
    phone: "1588-4466",
    ars_path: "",
    tip: "저는 휴대폰 번호이동 후에 결제 완료 문자 수신이 끊겼을 때, 이곳에 연락해 SMS 유료 문자 알림을 정비하고 즉시 테스트 수신을 마칩니다.",
    description: "비씨카드 부가서비스 SMS센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.bccard.com"
  },
  {
    name: "하나카드 대표고객센터 고객센터",
    category: "카드",
    phone: "1800-1111",
    ars_path: "",
    tip: "상담원 대기가 길어질 때 저는 귀찮은 기계음 ARS 대신 즉시 하나페이 모바일 앱을 띄워 챗봇 '하나'를 이용해 5분 만에 일을 끝내요.",
    description: "하나카드 대표고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hanacard.co.kr"
  },
  {
    name: "현대카드 가맹점승인 ARS 고객센터",
    category: "카드",
    phone: "1577-6200",
    ars_path: "",
    tip: "내가 가맹점에 포스기를 새로 들였는데 현대카드 결제만 에러가 날 때, 이 번호에 문의하면 신규 포스 단말기의 보안 가상 번호를 실시간 매핑해 줍니다.",
    description: "현대카드 가맹점승인 ARS 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hyundaicard.com"
  },
  {
    name: "하나카드 가맹점케어센터 고객센터",
    category: "카드",
    phone: "1800-1111",
    ars_path: "",
    tip: "연말 부가세 매입 자료 준비 시에 하나카드 가맹점 케어센터에 가맹점 번호만 팩스로 통보하면 즉시 세무용 엑셀 파일을 이메일로 보내줍니다.",
    description: "하나카드 가맹점케어센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hanacard.co.kr"
  },
  {
    name: "NH농협카드 가맹점지원콜 고객센터",
    category: "카드",
    phone: "1588-1600",
    ars_path: "",
    tip: "저는 거래 정산 일자가 일요일과 겹쳐 월요일로 대금 지급이 밀렸는지 긴가민가할 때, 가맹점 전용 회선으로 연결해 입금 예정 상세 보고서를 유선 확인해요.",
    description: "NH농협카드 가맹점지원콜 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://card.nonghyup.com"
  },
  {
    name: "S-OIL 보너스카드 고객센터 고객센터",
    category: "카드",
    phone: "1588-5151",
    ars_path: "",
    tip: "내가 S-OIL 주유소 주유 후 깜빡 잊고 실물 보너스카드를 안 냈을 때, 당일 영수증 지참 후 이 고객센터로 전화하면 1분 만에 포인트를 넣어줍니다.",
    description: "S-OIL 보너스카드 고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.s-oilbonus.com"
  },
  {
    name: "SK 보너스카드 고객센터 고객센터",
    category: "카드",
    phone: "1599-5120",
    ars_path: "",
    tip: "저는 SK 엔크린 보너스카드를 수년간 쓰다가 비밀번호 5회 오류로 잠겼을 때, 본 직통 데스크에서 휴대폰 실명 확인 후 30초 만에 비밀번호를 초기화했습니다.",
    description: "SK 보너스카드 고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.enclean.com"
  },
  {
    name: "GS칼텍스 보너스카드 센터 고객센터",
    category: "카드",
    phone: "1544-5151",
    ars_path: "",
    tip: "내가 GS칼텍스 제휴 보너스카드에 적립된 포인트를 계좌로 캐시백 입금받고 싶다면, 상담원 검증 단계를 거치면 영업일 기준 바로 계좌로 쏴줍니다.",
    description: "GS칼텍스 보너스카드 센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.gscaltex.com"
  },
  {
    name: "캐시비 통합고객센터 고객센터",
    category: "카드",
    phone: "1644-0006",
    ars_path: "",
    tip: "캐시비가 '이즐'로 완전히 새 단장했습니다! 저는 고장 난 예전 캐시비 카드를 발견했을 때, 이즐 통합 번호로 전화해 잔액 전체를 계좌로 돌려받았어요.",
    description: "캐시비 통합고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.cashbee.co.kr"
  },
  {
    name: "카카오페이 대표고객센터 고객센터",
    category: "카드",
    phone: "1644-7405",
    ars_path: "",
    tip: "내가 갑자기 모르는 번호로 40만 원 상당의 카카오페이 오결제 승인 문자를 받았다면 대표번호 대신 사고센터 1833-7483으로 즉각 조치해야 합니다.",
    description: "카카오페이 대표고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.kakaopay.com"
  },
  {
    name: "토스 지원고객센터 고객센터",
    category: "카드",
    phone: "1599-4905",
    ars_path: "",
    tip: "저는 토스유스카드나 토스페이 가맹점 결제 먹통을 겪을 때, 토스 앱 내 채팅보다 유선전화 1599-4905로 걸면 대기 없이 빠른 원격 정정을 해줍니다.",
    description: "토스 지원고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://toss.im"
  },
  {
    name: "페이코 지원고객센터 고객센터",
    category: "카드",
    phone: "1544-6891",
    ars_path: "",
    tip: "내가 결제 비밀번호 5회 에러로 페이코포인트카드가 완전히 먹통이 되었을 때, 이 번호로 본인 확인을 거쳐서 10초 만에 에러를 초기화해 주었습니다.",
    description: "페이코 지원고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.payco.com"
  },
  {
    name: "KB손해보험 청각장애인 문자접수 고객센터",
    category: "카드",
    phone: "010-5563-0114",
    ars_path: "",
    tip: "청각이나 언어 소통이 서툰 분들은 1544 대표번호 대신에 010-5563-0114 번호로 사고 상황과 도로명을 전송하시면 즉시 출동을 진행해 줍니다.",
    description: "KB손해보험 청각장애인 문자접수 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.kbinsure.co.kr"
  },
  {
    name: "카카오페이손해보험 고객센터 고객센터",
    category: "카드",
    phone: "1544-0022",
    ars_path: "",
    tip: "해외여행자보험 비행기 지연 보상 청구는 서류 제출 과정에서 누락이 잦으니, 모바일 카톡 청구 후 이 유선 센터에 보완 확인 전화를 하면 정산이 빠릅니다.",
    description: "카카오페이손해보험 고객센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.kakaopayinsure.com"
  },
  {
    name: "한국스마트카드 고객케어콜 고객센터",
    category: "카드",
    phone: "1644-0088",
    ars_path: "",
    tip: "내가 기후동행카드 환불 이나 모바일 티머니 인식이 갑자기 먹통 되었을 때, 이 번호로 걸어 2*190 단축 키를 입력해 상담사에 바로 가요.",
    description: "한국스마트카드 고객케어콜 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.tmoney.co.kr"
  },
  {
    name: "롯데캐피탈 고객센터",
    category: "카드",
    phone: "1577-7700",
    ars_path: "",
    tip: "저는 신용 대출 상환금이 자동이체 오류로 이중 출금되었을 때, 지체 없이 1577-7700에 직접 접수하여 당일 오후 반환을 유선 조치 받았습니다.",
    description: "롯데캐피탈 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.lottecap.com"
  },
  {
    name: "우리금융캐피탈 고객센터",
    category: "카드",
    phone: "1544-8600",
    ars_path: "",
    tip: "아주캐피탈이 우리금융캐피탈로 전환되었습니다. 내가 자동차 담보대출을 원스톱으로 전액 상환하고 근저당을 풀 때는 유선 상담이 훨씬 유기적입니다.",
    description: "우리금융캐피탈 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.woorifcapital.com"
  },
  {
    name: "IBK기업은행 카드 고객센터",
    category: "카드",
    phone: "1566-2566",
    ars_path: "",
    tip: "내가 기업은행 체크카드를 이마트에서 사용할 수 없게 되었을 때, 1566-2566 전화를 걸고 1번과 0번을 순서대로 눌러 상담사에게 원격 정정을 받았어요.",
    description: "IBK기업은행 카드 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.ibk.co.kr"
  },
  {
    name: "다이너스클럽 고객센터",
    category: "카드",
    phone: "1577-6000",
    ars_path: "",
    tip: "다이너스클럽 카드는 이제 현대카드에서 전담 발급합니다. 내가 전 세계 공항 라운지 실시간 동반자 혜택 잔여 횟수를 알아볼 때 현대카드 센터로 문의하니 원활했습니다.",
    description: "다이너스클럽 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.hyundaicard.com"
  },
  {
    name: "삼성카드 분실신고 고객센터",
    category: "카드",
    phone: "1588-8900",
    ars_path: "",
    tip: "내가 택시나 식당에 삼성카드를 두고 내렸을 때 당황하지 말고 1588-8900 직통 정지 전화를 하면 단 30초 만에 부정 결제를 영구 차단할 수 있어요.",
    description: "삼성카드 분실신고 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.samsungcard.com"
  },
  {
    name: "농협카드 분실신고 고객센터",
    category: "카드",
    phone: "1644-4000",
    ars_path: "",
    tip: "내가 농협 체크카드를 분실했을 때 이 번호로 정지를 진행하며, 만약 다시 찾으셨다면 그 즉시 상담원 통화로 유선 정지 해제를 요청할 수 있습니다.",
    description: "농협카드 분실신고 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://card.nonghyup.com"
  },
  {
    name: "롯데카드 분실신고 고객센터",
    category: "카드",
    phone: "1588-8300",
    ars_path: "",
    tip: "저는 롯데카드를 분실 접수할 때, 통화량이 밀리면 디지로카 앱 내 마이메뉴의 분실/도난 탭을 활용해 터치 몇 번으로 10초 만에 셀프 정지를 걸어요.",
    description: "롯데카드 분실신고 고객센터 서비스 이용 및 고객지원 안내",
    hours: "24시간 운영",
    web_url: "https://www.lottecard.co.kr"
  },
  {
    name: "우리카드 상생금융지원 데스크 고객센터",
    category: "카드",
    phone: "1588-9955",
    ars_path: "상생금융 특별 신청 1588-9955 (내선 8)",
    tip: "제 경험상 가계대출이나 카드론 연체 금리 인하 또는 채무 감면을 위한 상생 지원 조치를 받으려면, 일반 수신 전화보다 '상생금융 전담 파트'를 구두로 특정해 직통 상담을 받아보는 것이 최종 이자 감면에 유리했습니다.",
    description: "우리카드 상생금융지원 데스크 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.wooricard.com"
  },
  {
    name: "현대오일뱅크 보너스센터 고객센터",
    category: "카드",
    phone: "1588-5189",
    ars_path: "보너스카드 등록 ARS 1588-5189",
    tip: "저는 주유소에서 지급받은 실물 보너스카드를 귀찮아서 방치하다가 포인트가 소멸할 뻔했는데, 모바일 앱 등록이 난해할 땐 1588-5189 유선으로 걸면 구두 확인만으로 10초 만에 카드 매핑과 비밀번호 세팅을 끝내줍니다.",
    description: "현대오일뱅크 보너스센터 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.oilbank.co.kr"
  },
  {
    name: "한국스마트카드 티머니콜 고객센터",
    category: "카드",
    phone: "1644-0088",
    ars_path: "티머니 카드 일반 상담 1644-0088",
    tip: "내가 기후동행카드 충전 도중 원인 모를 승인 오류가 나 카드 태그가 안 될 때, 지하철 역무실을 들르기 전에 이 케어콜에 전화해 고유 카드번호를 구두로 대조하면 가상 결제 상태를 원격 해제해 주어 속이 다 시원했습니다.",
    description: "한국스마트카드 티머니콜 고객센터 서비스 이용 및 고객지원 안내",
    hours: "평일 09:00 ~ 18:00",
    web_url: "https://www.tmoney.co.kr"
  }
];