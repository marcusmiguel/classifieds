
export interface Advertisement {
    title: string,
    id: string,
    desc: string,
    ship: string,
    date: string,
    images: string[],
    price: string,
    forward: boolean,
};

export type Favorite = string;

export interface Chat {
    receiver: string,
    "advertisement-id": string,
    title?: string,
    msgs: Message[]
};

export interface Message {
    ship: string,
    date: string,
    text: string
}

export interface Notification {
    ship: string,
    text: string,
    date: string,
    "advertisement-id": string,
};

export enum NotificationMessages {
    newForwardedAd = 'Forwarded an ad to you.',
    newMessage = 'Sent you a message.'
};

export interface Mutual {
    ship: string,
    forwardedAdsId: string[],
};
