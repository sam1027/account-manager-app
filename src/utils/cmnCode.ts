// 결재 수단
export const _expdWayCode = [
    { value: 'card', label: '카드' },
    { value: 'account', label: '계좌이체' },
    { value: 'cash', label: '현금' },
];

// 정기 수입/지출 주기
export const _cycleCode = [
    { value: '1', label: '매년' },
    { value: '2', label: '매달' },
    { value: '3', label: '매일' },
];

// 월(Month)
export const _monthCode = Array.from({ length: 12 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));

// 일(Date)
export const _dateCode = Array.from({ length: 31 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));

// 소득원
export const _incomeSourceCode = [
    { value: '1', label: '월급' },
    { value: '2', label: '불로소득' },
    { value: '3', label: '부업' },
    { value: '4', label: '알바비' },
];

// 계좌 - 추후 계좌관리에서 데이터 Get!
export const _accountCode = [
    { value: '0', label: '현금' },
    { value: '1', label: '성은 용돈 계좌' },
    { value: '2', label: '생활비 계좌' },
    { value: '3', label: '외식비 계좌' },
];

// 금융기관
export const _bank = [
    { value: '0', label: '현금' },
    { value: '1', label: '국민은행' },
    { value: '2', label: '우리은행' },
    { value: '3', label: '농협' },
];

// 카드 구분
export const _cardType = [
    { value: 'credit', label: '신용카드' },
    { value: 'check', label: '체크카드' },
];

// 카드사
export const _cardCorp = [
    { value: '1', label: '롯데카드' },
    { value: '2', label: '삼성카드' },
    { value: '3', label: '현대카드' },
];

// 카드 - 추후 카드관리에서 데이터 Get!
export const _cardCode = [
    { value: '1', label: '생활비 카드' },
    { value: '2', label: '성은 현대 카드' },
    { value: '3', label: '종원 삼성 카드' },
];

// 지출 항목 
export const _expdItemCode = [
    { value: '1', label: '식비' },
    { value: '2', label: '관리비' },
    { value: '3', label: '경조사' },
    { value: '4', label: '문화생활' },
    { value: '5', label: '생필품' },
];

// 카테고리
export const _categoryCode = [
    { id: 'bank', label: '금융기관'},
    { id: 'cardCorp', label: '카드사'},
    { id: 'incomeSource', label: '소득원'},
    { id: 'expdItem', label: '지출항목'},
];