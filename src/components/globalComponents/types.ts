import { ReactNode, MouseEvent } from "react";
import { ImageProps } from "next/image";
import { ProgressProps } from "antd/lib/progress/progress";
import { SegmentedLabeledOption, SegmentedProps } from "antd/lib/segmented";
import { SegmentedRawOption } from "rc-segmented";
import { TooltipProps } from "antd/lib/tooltip";
import {
    TFlexAlignItems,
    TFlexDirection,
    TFlexJustifyContent,
    TFlexWrap,
} from "@globalTypes/stylesTypes";

export type TContainer = {
    children: ReactNode;
    className?: string;
    innerIndent?: boolean;
    flexWrap?: TFlexWrap;
    flexDirection?: TFlexDirection;
    flexJustifyContent?: TFlexJustifyContent;
    flexAlignItems?: TFlexAlignItems;
};

export type TImgWrapper = {
    onWrapperClick?: (e: MouseEvent<HTMLDivElement>) => void;
    imageClassName?: string;
    wrapperClassName?: string;
} & ImageProps;

export type TProgressWrapper = { wrapperClassPrefix?: string } & ProgressProps;

export type TSegmented = {
    options: (SegmentedRawOption | SegmentedLabeledOption)[];
    className?: string;
} & SegmentedProps;

export type TCopyText = {
    text: string;
    className?: string;
    onCopy?(text: string, result: boolean): void;
};

export type TTooltip = TooltipProps;
