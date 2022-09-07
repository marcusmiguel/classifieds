import moment from "moment";

export const daToDate = da => {
    const time = da.slice(1).split(".")!;
    const year = time[0];
    const month = time[1]
    const day = time[2];
    const hour = time[4];
    const min = time[5];
    const sec = time[6]

    return moment.utc(year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec);
};