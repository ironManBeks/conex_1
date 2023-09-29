import { ReactNode, MouseEvent, JSX } from "react";
import { ImageProps } from "next/image";
import { ProgressProps } from "antd/lib/progress/progress";
import { TooltipProps } from "antd/lib/tooltip";

import {
    TFlexAlignItems,
    TFlexDirection,
    TFlexJustifyContent,
    TFlexWrap,
} from "@globalTypes/stylesTypes";
import { TFormItemError } from "@components/form/FormItemError/types";
import { TFormItemLabel } from "@components/form/FormItemWrapper/types";
import { TStore } from "@globalTypes/storeTypes";
import { SegmentedLabeledOption, SegmentedProps } from "antd/lib/segmented";
import { SegmentedRawOption } from "rc-segmented";

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
    isTypeWebp?: boolean;
} & ImageProps;

export type TProgressWrapper = { wrapperClassPrefix?: string } & ProgressProps;

export type TSegmented = {
    options: (SegmentedRawOption | SegmentedLabeledOption)[];
    viewStyle?: "default" | "block";
} & SegmentedProps;

export type TCopyText = {
    text: string;
    className?: string;
    onCopy?(text: string, result: boolean): void;
};

export type TTooltip = TooltipProps;

export type TAdditionalServicesOption = { label: string; value: ReactNode };

export type TAdditionalServices = {
    className?: string;
    options: TAdditionalServicesOption[];
    totalOption?: TAdditionalServicesOption;
};

export type TChoiceMode = {
    className?: string;
    options: {
        label: string;
        value: string;
        isActive: boolean;
        onClick?: () => void;
    }[];
};

export type TAddressSelection = {
    className?: string;
    onValueChange?: (value: string) => void;
    name?: string;
} & TFormItemError &
    TFormItemLabel;

export type TAddedOptionsListItem = {
    title?: string;
    list: { label: string; value: string | number }[];
    onClick?: () => void;
    isActive?: boolean;
};

export type TAddedOptionsList = {
    optionsList: TAddedOptionsListItem[];
    className?: string;
};

export type TLogout = {
    component: JSX.Element;
    pageLink?: string;
} & TStore;
