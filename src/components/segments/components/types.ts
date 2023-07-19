import { ReactNode } from "react";

export type TNavTypes = {
    wrapperClassPrefix: string;
};

export interface TNavLinkItem {
    href: string;
    title: ReactNode;
    classPrefix: string;
    className?: string;
}
