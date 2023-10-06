import { CSSProperties, MouseEvent, ReactNode } from "react";

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
};

export type TButtonTypes = {
    type?: "button" | "submit" | "reset";
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

export enum EButtonColor {
    default = "default",
    primary = "primary",
    secondary = "secondary",
    success = "success",
    danger = "danger",
    transparent = "transparent",
    orange = "orange",
}

export enum EButtonSize {
    sm = "small",
    md = "medium",
    lg = "large",
}

export type TButtonPrimary = TButtonCommon & TButtonTypes;

export type TButtonLink = {
    href: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    style?: CSSProperties;
    isLinkSimple?: boolean;
} & TButtonCommon;
