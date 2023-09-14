import { ReactNode } from "react";

export enum EAccountOrderStatus {
    processed = "processed",
    delivered = "delivered",
}

export enum EAccountOrderMoneyStatus {
    processed = "processed",
    delivered = "delivered",
}

export enum EAccountOrderStatusTimelapse {
    done = "done",
    processed = "processed",
    feature = "feature",
    failure = "failure",
}

export type TOrderStatusTimelapse = {
    time: string;
    status: EAccountOrderStatusTimelapse;
    description?: string;
};

export type TAccountOrderItem = {
    id: string;
    orderNumber: string;
    dateOfOrder: string;
    orderAddress: string;
    orderStatus?: EAccountOrderStatus;
    moneyStatus?: EAccountOrderMoneyStatus;
    statusTimelapse: TOrderStatusTimelapse[];
};

export type TAccountMenuItem = {
    icon: ReactNode;
    title: string;
    tabName: string | null;
    pageClassPrefix: string;
    isActive?: boolean;
    className?: string;
};
