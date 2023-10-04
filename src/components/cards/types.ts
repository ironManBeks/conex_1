import { ReactNode } from "react";
import { TNullable } from "@globalTypes/commonTypes";
import { TProductDoorData } from "@store/products/types";

export type TProductSearchCard = {
    className?: string;
} & TProductDoorData;

export type TProductCartCard = {
    className?: string;
    id: string;
    title: string;
    price: number;
    priceCurrency: string;
    material: string;
    size: string;
    color: string;
    imageSrc: TNullable<string> | undefined;
    deliveryStatus: string;
    select?: {
        isSelect: boolean;
        onSelectChange: (id: string, value: boolean) => void;
    };
};

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
