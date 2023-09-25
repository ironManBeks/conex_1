import { ReactNode } from "react";
import { DrawerProps } from "antd/lib/drawer";

export type TDrawerLayout = {
    title?: string;
    subTitle?: string;
    headContent?: ReactNode;
    headClassName?: string;
    bodyContent?: ReactNode;
    bodyClassName?: string;
    footerContent?: ReactNode;
    footerClassName?: string;
    isCloseBtn?: boolean;
    maskZIndex?: number;
    open: boolean;
    wrapperClassName?: string;
    closeOnChangePath?: boolean;
} & DrawerProps;
