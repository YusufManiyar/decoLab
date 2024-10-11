export const covertDateFromDBToRegularString = (date: string) => {
    const dd = date.split("T")[0];
    const tt = date.split("T")[1];
    return `${dd} ${tt.split(".")[0]}`;
}