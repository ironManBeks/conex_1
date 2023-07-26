import {
    TProductCartData,
    TProductDoorData,
} from "@store/stores/products/types";
import { ReactNode } from "react";

export type TProductSearchCard = {
    className?: string;
} & TProductDoorData;

export type TProductCartCard = {
    className?: string;
} & TProductCartData;

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
