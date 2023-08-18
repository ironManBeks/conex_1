import { TProductCartData, TProductDoorData } from "@store/products/types";
import { ReactNode } from "react";
import { TStore } from "@globalTypes/storeTypes";

export type TProductSearchCard = {
    className?: string;
} & TProductDoorData;

export type TProductCartCard = {
    className?: string;
} & TProductCartData &
    TStore;

export type TProductInfoListItem = {
    label: string;
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
