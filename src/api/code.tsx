export const getCodeGrpList = async () => {
    const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/code/grp/list`);
    return data.json();
}

export const getCodeList = async (codeGrpId?:string) => {
    if(!codeGrpId) return ;
    const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/code/${codeGrpId}`);
    return data.json();
}

export const changeCodeUseYn = async (codeGrpId:string, codeId:string, useYn:string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/code/useyn`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codeGrpId,
            codeId,
            useYn,
        }),
    });
}

export const deleteCode = async (codeGrpId:string, codeId:string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/code`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codeGrpId,
            codeId,
        }),
    });
}

export const insertCode = async (codeGrpId:string, codeId:string, codeName: string) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/code`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            codeGrpId,
            codeId,
            codeName,
        }),
    });
}
