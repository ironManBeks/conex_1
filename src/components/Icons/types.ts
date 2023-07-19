export interface IIcon {
    color?: string;
    secondColor?: string;
    className?: string;
    width?: number;
    height?: number;
    opacity?: string;
    onClick?: () => void;
}

export type TIconArrow = {
    direction: EArrowDirection;
} & IIcon;

export enum EArrowDirection {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left",
}
