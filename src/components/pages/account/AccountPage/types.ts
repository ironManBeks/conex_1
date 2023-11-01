import { ReactNode } from "react";
import { TOrderStatusTimelapse } from "@store/auth/types";

export enum ESegmentedOptionsNames {
    all = "all",
    transit = "transit",
    inProgress = "inProgress",
    completed = "completed",
}

export enum EAccountTabsPaths {
    account = "account",
    orders = "orders",
    paymentMethods = "paymentMethods",
}

export type TStepsStatus = "wait" | "process" | "finish" | "error";

export type TAccountMenuItem = {
    icon: ReactNode;
    title: string;
    tabName: string | null;
    pageClassPrefix: string;
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
};

export type TAccountOrderStatus = {
    wrapperClassName?: string;
    statusTimelapse: TOrderStatusTimelapse[];
    onOpenChange?: (value: boolean) => void;
};
