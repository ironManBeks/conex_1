import { ReactNode, MouseEvent, JSX } from "react";
import { ImageProps } from "next/image";
import { ProgressProps } from "antd/lib/progress/progress";
import { TooltipProps } from "antd/lib/tooltip";
import { SegmentedLabeledOption, SegmentedProps } from "antd/lib/segmented";
import { SegmentedRawOption } from "rc-segmented";
import { SwiperProps } from "swiper/swiper-react";
import { BreadcrumbProps } from "antd/es/breadcrumb/Breadcrumb";

import {
    TFlexAlignItems,
    TFlexDirection,
    TFlexJustifyContent,
    TFlexWrap,
} from "@globalTypes/stylesTypes";
import { TFormItemLabel } from "@components/form/FormItemWrapper/types";
import { TStore } from "@globalTypes/storeTypes";
import { TAdditionalProductsCarousel } from "@components/pages/SingleProductPage/types";
import { IIcon } from "@components/Icons/types";

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
    objectFit?:
        | "fill"
        | "contain"
        | "cover"
        | "none"
        | "scale-down"
        | "initial";
} & ImageProps;

export type TProgressWrapper = { wrapperClassPrefix?: string } & ProgressProps;

export type TSegmented = {
    options: (SegmentedRawOption | SegmentedLabeledOption)[];
    viewStyle?: "default" | "block";
} & SegmentedProps;

export type TCopyText = {
    text: string;
    className?: string;
    iconProps?: IIcon;
    onCopy?(text: string, result: boolean): void;
};

export type TTooltip = TooltipProps;

export type TAdditionalServicesOption = { label: string; value: ReactNode };

export type TAdditionalServices = {
    className?: string;
    options: TAdditionalServicesOption[];
    totalOption?: TAdditionalServicesOption;
};

export type TAddressSelection = {
    className?: string;
    onValueChange?: (value: string) => void;
    name?: string;
} & TFormItemLabel;

export type TOptionsListItem =
    | { label: string; value: string | number }
    | undefined;

export type TAddedOptionsListItem = {
    title?: string;
    list: TOptionsListItem[];
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

export type TPickupPoint = {
    id: string;
    title: string;
    description: string;
    deliveryDate: string;
    deliveryTimeFrom: string;
    deliveryTimeTo: string;
};

export type TPaymentCard = {
    id: string;
    cvv: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

export type TCarousel = {
    wrapperClassName?: string;
} & SwiperProps;

export type TProductsCarousel = {
    title: string;
    wrapperClassName?: string;
    list: TAdditionalProductsCarousel;
};

export type TBreadcrumbProps = BreadcrumbProps;

export type TRowInfoProps = {
    wrapperClassName?: string;
    label: ReactNode;
    value: ReactNode;
    isBottomLine?: boolean;
};

export type TCollapsibleBlockWithTitleProps = {
    expandTitle: string;
    closeTitle?: string;
    titlePosition?: "top" | "bottom";
    wrapperClassName?: string;
    defaultOpen?: boolean;
    titleContentClassName?: string;
    onOpenChange?: (value: boolean) => void;
};

export type TPaymentIconProps = {
    wrapperClassName?: string;
    title: string;
    src: string;
    alt: string;
};

export type TNewsSubscriptionProps = {
    wrapperClassName?: string;
} & TStore;
