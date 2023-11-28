import { StaticImageData } from "next/image";

export type TDisplayIcon = {
    value: TDisplayValue;
    imgSrc: string | StaticImageData;
    imgAlt: string;
};

export type TDisplayValue = string | number;
