import { CSSProperties, MouseEvent, ReactNode, RefObject } from "react";

export interface ITitlesProps {
    ref?: RefObject<HTMLHeadingElement>;
    dangerouslySetInnerHTML?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: (e?: MouseEvent<HTMLHeadingElement> | undefined) => void;
}

export interface ITextProps {
    ref?: RefObject<HTMLParagraphElement>;
    dangerouslySetInnerHTML?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
