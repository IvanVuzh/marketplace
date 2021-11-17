export const convertFromUTC = (_date) => {
    const utcTimestamp = Date.parse(_date);
    return new Date(utcTimestamp);
}