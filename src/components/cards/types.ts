import { ReactNode } from "react";

import { TProductDoorData } from "@store/products/types";
import { TUserCartItem } from "@store/auth/types";

export type TProductSearchCard = {
    className?: string;
} & TProductDoorData;

export type TProductCartCard = {
    className?: string;
    select?: {
        isSelect: boolean;
        onSelectChange: (id: string, value: boolean) => void;
    };
    onDeleteClick?: () => void;
    onCountChange?: (value: number) => void;
} & TUserCartItem;

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
