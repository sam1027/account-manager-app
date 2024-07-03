import { IAccount } from "../types/accountType";
import { strToNum } from "../utils/common";

export const getAccountList = async () => {
    const list = await fetch(`${process.env.REACT_APP_SERVER_URL}/account/list`);
    return list.json();
}

export const insertAccount = async (obj:IAccount) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
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

export const deleteAccount = async (selectedRows:string[]) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            selectedRows
        })
    });
}