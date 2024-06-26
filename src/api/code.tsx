export const getCodeGrpList = async () => {
    const data = await fetch("http://localhost:3030/code/grp/list");
    return data.json();
}

export const getCodeList = async (codeGrpId?:string) => {
    if(!codeGrpId) return ;
    const data = await fetch(`http://localhost:3030/code/${codeGrpId}`);
    return data.json();
}

export const changeCodeUseYn = async (codeGrpId:string, codeId:string, useYn:string) => {
    await fetch(`http://localhost:3030/code/useyn`, {
        method: "PUT", //method PUT으로 변경
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
