import { CSSProperties, ReactNode } from "react";

export type TModalLayout = {
    title?: string;
    subTitle?: string;
    headContent?: ReactNode;
    headClassName?: string;
    bodyContent?: ReactNode;
    bodyClassName?: string;
    footerContent?: ReactNode;
    footerClassName?: string;
    handleCancel: () => void;
    modalVisible: boolean;
    isCloseBtn?: boolean;
    forceRender?: boolean;
    maskZIndex?: number;
} & IModalProps;

export interface IModalProps {
    modalSize?: EModalSize;
    wrapperClassName?: string;
    maskStyle?: CSSProperties;
    wrapperStyles?: CSSProperties;
}

export enum EModalSize {
    sm = "size-sm",
    md = "size-md",
    lg = "size-lg",
    xl = "size-xl",
    full = "size-full",
}
