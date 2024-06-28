// convert string to number(with remove comma)        
export const strToNum = function (str?:string) {
    if(!str) return 0;
    return Number(str.replace(/,/g, ""));
}