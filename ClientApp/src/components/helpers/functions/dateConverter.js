export default function convertDate(str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        seconds = ("0" + date.getSeconds()).slice(-2);

    let datePart = [ date.getFullYear(), mnth, day ].join("-");
    let timePart = [ hour, minute, seconds ].join(":")
    return datePart + ", " + timePart;
}

