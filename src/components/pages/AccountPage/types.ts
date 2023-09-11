import { ReactNode } from "react";

export type TAccountOrderItem = {
    id: string;
    orderNumber: string;
    orderPlaced: string;
    orderProcessed: string;
    manufacturing: string;
    shipped: string;
    deliveryWillCompleted: string;
    address: string;
    status: string;
};

export type TAccountMenuItem = {
    icon: ReactNode;
    title: string;
    tabName: string | null;
    pageClassPrefix: string;
    isActive?: boolean;
    className?: string;
};
