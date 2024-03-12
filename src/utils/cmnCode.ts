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
    { value: '1', label: '성은 용돈 계좌' },
    { value: '2', label: '생활비 계좌' },
    { value: '3', label: '외식비 계좌' },
    { value: '4', label: '성은 비상금(현금)' },
];

// 금융기관
export const _bank = [
    { value: '1', label: '국민은행' },
    { value: '2', label: '우리은행' },
    { value: '3', label: '농협' },
    { value: '4', label: '현금' },
];