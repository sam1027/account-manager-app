export const getAccountList = async () => {
    const list = await fetch("http://localhost:3030/account");
    return list.json();
}

export const insertAccount = async () => {
    await fetch("http://localhost:3030/account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            
        })
    });
}