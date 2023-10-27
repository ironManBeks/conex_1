import { TAdditionalProduct, TSingleProduct } from "@store/products/types";
import { TSectionTypes } from "@globalTypes/sectionTypes";

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

export type TSingleProductDetailsProps = {
    title: TSingleProduct["title"];
    article: TSingleProduct["article"];
    price: TSingleProduct["price"];
    priceOld: TSingleProduct["priceOld"];
    priceDiscount: TSingleProduct["priceDiscount"];
    isAvailable: TSingleProduct["isAvailable"];
    options: TSingleProduct["options"];
} & TSectionTypes;

export type TSingleProductOptionsProps = {
    options: TSingleProductDetailsProps["options"];
} & TSectionTypes;
