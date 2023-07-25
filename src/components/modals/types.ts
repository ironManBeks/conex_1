import { CSSProperties } from "react";

export type TModalLayout = {
    title?: string;
    subTitle?: string;
    headContent?: JSX.Element;
    headClassName?: string;
    bodyContent?: JSX.Element;
    bodyClassName?: string;
    footerContent?: JSX.Element;
    footerClassName?: string;
    handleCancel: () => void;
    modalVisible: boolean;
    isCloseBtn?: boolean;
    forceRender?: boolean;
    maskZIndex?: number;
    isSticky?: boolean;
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
}
