export type TAdditionalProduct = {
    id: number;
    img: string;
    price: number;
    title: string;
    deliveryTime: string;
};

export type TAdditionalProductsCarousel = TAdditionalProduct[];

export type TCatalogInner = {
    pageClassPrefix: string;
};

export type TCatalogSingle = {
    images: string[];
};

export type TCatalogCarousel = {
    pageClassPrefix: string;
    images: TCatalogSingle["images"];
};
