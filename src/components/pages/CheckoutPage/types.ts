import { TSectionTypes } from "@globalTypes/sectionTypes";

export type TOrderSettings = {
    className?: string;
    placement: "cart" | "checkout";
} & TSectionTypes;
