import { TStore } from "@globalTypes/storeTypes";
import { ReactNode } from "react";

export type TLayout = {
    children: ReactNode;
    pageClassPrefix: string;
    headerClassName?: string;
    layoutClassName?: string;
    footerClassName?: string;
} & TStore;
