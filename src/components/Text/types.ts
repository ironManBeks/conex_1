import { CSSProperties, ReactNode, RefObject } from "react";

export interface ITitlesProps {
    ref?: RefObject<HTMLHeadingElement>;
    dangerouslySetInnerHTML?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface ITextProps {
    ref?: RefObject<HTMLParagraphElement>;
    dangerouslySetInnerHTML?: string;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
