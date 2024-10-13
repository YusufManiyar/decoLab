export const covertDateFromDBToRegularString = (date: string) => {
    const dd = date.split("T")[0];
    const tt = date.split("T")[1].split(".")[0].split(":");
    return `${dd} (${tt[0]} : ${tt[1]})`;
}

export const convertTimeFromDB = (date: string): string => {
    const tt = date.split("T")[1].split(".")[0].split(":");
    return `${tt[0]} : ${tt[1]}`;
}