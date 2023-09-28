import { ReactNode } from "react";

export enum ESegmentedOptionsNames {
    all = "all",
    transit = "transit",
    inProgress = "inProgress",
    completed = "completed",
}

export type TAccountMenuItem = {
    icon: ReactNode;
    title: string;
    tabName: string | null;
    pageClassPrefix: string;
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
};
