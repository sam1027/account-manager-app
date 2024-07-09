// convert string to number(with remove comma)        
export const strToNum = function (str?:string) {
    if(!str) return 0;
    return Number(str.replace(/,/g, ""));
}

// 월(Month)
export const monthList = Array.from({ length: 12 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));

// 일(Date)
export const dateList = Array.from({ length: 31 }, (_, i) => ({ value: `${i+1}`, label: `${i+1}` }));