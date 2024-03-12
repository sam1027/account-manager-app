export const _cycleCode = [
    { value: '1', label: '매년' },
    { value: '2', label: '매달' },
    { value: '3', label: '매일' },
];
export const _monthCode = Array.from({ length: 12 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));
export const _dateCode = Array.from({ length: 31 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));
export const _incomeSourceCode = [
    { value: '1', label: '월급' },
    { value: '2', label: '불로소득' },
    { value: '3', label: '부업' },
    { value: '4', label: '알바비' },
];
export const _financeCode = [
    { value: '1', label: '국민은행' },
    { value: '2', label: '우리은행' },
    { value: '3', label: '현금' },
    { value: '4', label: '알바비' },
];