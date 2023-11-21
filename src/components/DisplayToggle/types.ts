import { StaticImageData } from "next/image";

export type TDisplayIcon = {
    value: string | number;
    imgSrc: string | StaticImageData;
    imgAlt: string;
};
