import { ReactNode } from "react";

import { TProductDoorData } from "@store/products/types";

export type TProductSearchCard = {
    className?: string;
} & TProductDoorData;

export type TProductCartCard = {
    className?: string;
    select?: {
        isSelect: boolean;
        onSelectChange: (id: number, value: boolean) => void;
    };
    onDeleteClick?: () => void;
    onCountChange?: (value: number) => void;
    id: number;
    title: string;
    price: number;
    img: string;
    options: { title: string; value: ReactNode }[];
    count: number;
};

export type TProductCarouselCard = {
    className?: string;
    id: number;
    title: string;
    price: number;
    onButtonClick?: () => void;
    src: string;
    deliveryStatus: string;
};

export type TProductInfoListItem = {
    title: string;
    value: ReactNode;
};

export type TProductCardTitle = {
    title: string;
    className?: string;
    letterLimit?: number;
};

export type TProductCardDescription = {
    description: string;
    className?: string;
    letterLimit?: number;
};

export type TProductCardList = {
    className?: string;
    optionsList: TProductInfoListItem[];
};
