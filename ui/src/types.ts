
export interface Advertisement {
    title: string,
    id: string,
    desc: string,
    ship: string,
    date: string,
    images: string[],
    price: string,
    forward: boolean,
    isFavorited: boolean,
};

export type Favorite = string;

export interface Notification {
    ship: string,
    text: string,
    date: string,
    advertisementId: string,
};

export enum NotificationMessages {
    newForwardedAd = 'Forwarded an ad to you.',
    newMessage = 'Sent you a message.'
};

export enum TabContent {
    ads,
    myads,
    chat,
    newAd,
};

export interface Mutual {
    ship: string,
    forwardedAdsId: string[],
};
