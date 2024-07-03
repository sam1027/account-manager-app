import { ICard } from "../types/cardType";

export const getCardList = async () => {
    const list = await fetch(`${process.env.REACT_APP_SERVER_URL}/card/list`);
    return list.json();
}

export const insertCard = async (obj: ICard) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/card`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            card_type_cd: obj.card_type_cd,
            card_corp_cd: obj.card_corp_cd,
            card_nm: obj.card_nm,
            card_pay_dt: obj.card_pay_dt,
            acnt_id: obj.acnt_id,
        })
    });
}

export const deleteCard = async (selectedRows: string[]) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/card`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            selectedRows
        })
    });
}