import { ReactNode } from "react";
import { TStore } from "@globalTypes/storeTypes";

export type TNavTypes = {
    wrapperClassPrefix: string;
} & TStore;

export interface TNavLinkItem {
    href: string;
    title: ReactNode;
    classPrefix: string;
    className?: string;
}
