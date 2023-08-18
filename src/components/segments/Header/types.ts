import { TStore } from "@globalTypes/storeTypes";

export type THeader = {
    pageClassPrefix: string;
    className?: string;
} & TStore;
