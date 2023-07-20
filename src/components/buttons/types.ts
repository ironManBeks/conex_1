import { CSSProperties, MouseEvent, ReactNode } from "react";

export type TButtonCommon = {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    color?: EButtonColor;
    size?: EButtonSize;
    icon?: JSX.Element;
    iconPosition?: "left" | "right";
    isOutline?: boolean;
    isLoading?: boolean;
    tooltipText?: string;
    tooltipClassName?: string;
    withShadow?: boolean;
    value?: string;
};

export type TButtonTypes = {
    type?: "button" | "submit" | "reset";
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
};

export enum EButtonColor {
    primary = "primary",
    secondary = "secondary",
    default = "default",
    danger = "danger",
    orange = "orange",
    transparent = "transparent",
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
