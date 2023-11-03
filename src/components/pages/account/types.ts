import { ReactNode } from "react";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TOrderStatusTimelapse } from "@store/auth/types";

export type TAccountLayoutProps = TSectionTypes;

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
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
    href?: string;
};

export type TAccountOrderStatusProps = {
    wrapperClassName?: string;
    statusTimelapse: TOrderStatusTimelapse[];
    onOpenChange?: (value: boolean) => void;
};
