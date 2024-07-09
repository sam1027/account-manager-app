import { ICat } from "../types/catType";

export const getCatList = async ():Promise<ICat[]> => {
    const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/cat`);
    return data.json();
}

export const getSubCatList = async (catId:string) => {
    if(!catId) return ;
    const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/cat/sub/${catId}`);
    return data.json();
}

export const changeSubCatUseYn = async (cat_id:string, sub_cat_id:string, use_yn:string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/cat/sub/useyn`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cat_id,
            sub_cat_id,
            use_yn,
        }),
    });
}

export const deleteSubCat = async (cat_id:string, sub_cat_id:string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/cat/sub`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cat_id,
            sub_cat_id,
        }),
    });
}
 
export const insertSubCat = async (cat_id:string, sub_cat_nm: string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/cat/sub`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cat_id,
            sub_cat_nm,
        }),
    });
}
