export const getAllUser = async () => {
    const data = await fetch("http://localhost:3030/user/all");
    return data.json();
}