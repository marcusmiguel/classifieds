
export interface Advertisement {
    title: string,
    desc: string,
    publisher: string,
    date: string,
    images: string[],
    price: number
};

export interface Notification {
    author: string,
    text: string,
    date: string,
    ad: Advertisement,
};

export enum NotificationMessages {
    newForwardedAd = 'Forwarded an ad to you.',
    newMessage = 'Sent you a message.'
};

export enum TabContent {
    theirAds,
    myads,
    chat,
    publishAd,
};


export interface Comment {
    author: string,
    text: string,
    date: string,
    replies: Reply[]
};

export interface Reply {
    author: string,
    text: string,
    date: string
};

export interface Mutual {
    ship: string,
    forwardedAds: Advertisement[]
};
