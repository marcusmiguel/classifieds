import moment from "moment";
import { useAppSelector } from "./redux/hooks/hooks";

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

export const getAdById = (id) => {
    const { ads, myads } = useAppSelector((state) => state.classifieds.data);

    let inAds = ads?.filter(x => x.id == id);
    if (inAds && inAds?.length > 0) {
        return inAds[0];
    }
    let inMyAds = myads?.filter(x => x.id == id);
    return (inMyAds && inMyAds.length > 0) ? inMyAds[0] : null;
};

export const scrollDetailsToTop = () => {
    let detailsBackground = document.getElementById("detailsBackground");
    if (detailsBackground) {
        detailsBackground.scrollTop = 0;
    }
};

export const scrollToTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
};