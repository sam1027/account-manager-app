import { IAccount } from "../types/accountType";
import { strToNum } from "../utils/common";

export const getAccountList = async () => {
    const list = await fetch("http://localhost:3030/account");
    return list.json();
}

export const insertAccount = async (obj:IAccount) => {
    await fetch("http://localhost:3030/account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            acnt_id: obj.acnt_id,
            bk_id: obj.bk_id,
            acnt_nm: obj.acnt_nm,
            acnt_no: obj.acnt_no,
            acnt_owner: obj.acnt_owner,
            acnt_init_money: strToNum(obj.acnt_init_money),
        })
    });
}