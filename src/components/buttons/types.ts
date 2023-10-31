import { Url } from "next/dist/shared/lib/router/router";
import { CSSProperties, MouseEvent, ReactNode, RefObject } from "react";

export type TButtonCommon = {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    color?: EButtonColor;
    size?: EButtonSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    isLoading?: boolean;
    tooltipText?: string;
    tooltipClassName?: string;
    value?: string;
    style?: CSSProperties;
    changeSizeOnMobile?: boolean;
    isOpacity?: boolean;
    id?: string;
};

export type TButtonTypes = {
    type?: "button" | "submit" | "reset";
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
    ref?: RefObject<HTMLButtonElement>;
};

export enum EButtonColor {
    default = "default",
    primary = "primary",
    secondary = "secondary",
    success = "success",
    danger = "danger",
    transparent = "transparent",
}

export enum EButtonSize {
    sm = "small",
    md = "medium",
    lg = "large",
}

export type TButtonPrimary = TButtonCommon & TButtonTypes;

export type TButtonLink = {
    href: Url;
    target?: "_blank" | "_self" | "_parent" | "_top";
    style?: CSSProperties;
    isLinkSimple?: boolean;
} & TButtonCommon;
