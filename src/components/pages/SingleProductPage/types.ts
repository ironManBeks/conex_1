import { TAdditionalProduct, TSingleProduct } from "@store/products/types";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TStore } from "@globalTypes/storeTypes";
import { EButtonSize } from "@components/buttons/types";

export type TAdditionalProductsCarousel = TAdditionalProduct[];

export type TSingleProductInnerProps = {
    singleProduct: TSingleProduct;
} & TSectionTypes;

export type TSingleProductCarouselProps = {
    images: TSingleProduct["images"];
} & TSectionTypes;

export type TSingleProductDescriptionProps = {
    description: TSingleProduct["description"];
} & TSectionTypes;

export type TSingleProductCharacteristicsProps = {
    characteristics: TSingleProduct["characteristics"];
} & TSectionTypes;

export type TSingleProductDetailsProps = TSingleProduct & TSectionTypes;

export type TSingleProductOptionsProps = {
    options: TSingleProductDetailsProps["options"];
} & TSectionTypes;

export type TSingleProductHeaderProps = {
    title: TSingleProduct["title"];
    price: TSingleProduct["price"];
    priceOld: TSingleProduct["priceOld"];
    priceDiscount: TSingleProduct["priceDiscount"];
    isAvailable: TSingleProduct["isAvailable"];
    images: TSingleProduct["images"];
} & TSectionTypes;

export type TSingleProductPriceProps = {
    price: TSingleProduct["price"];
    priceOld: TSingleProduct["priceOld"];
    priceDiscount: TSingleProduct["priceDiscount"];
    isAvailable: TSingleProduct["isAvailable"];
    changeHeaderVisible?: boolean;
    wrapperClassName?: string;
    mainButtonSize?: EButtonSize;
} & TSectionTypes;

export type TSingleProductActionsProps = {
    isAvailable: TSingleProduct["isAvailable"];
    changeHeaderVisible?: boolean;
    mainButtonSize?: EButtonSize;
} & TStore;

export type TSingleProductOrderInfoProps = {
    delivery: TSingleProduct["delivery"];
    payment: TSingleProduct["payment"];
} & TSectionTypes;
