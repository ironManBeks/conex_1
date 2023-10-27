import { FC } from "react";

import Breadcrumb from "@components/globalComponents/Breadcrumb";
import SingleProductCarousel from "./SingleProductCarousel";
import SingleProductDescription from "./SingleProductDescription";
import SingleProductDetails from "./SingleProductDetails";
import SingleProductCharacteristics from "./SingleProductCharacteristics";

import { TSingleProductInnerProps } from "../types";

const SingleProductInner: FC<TSingleProductInnerProps> = ({
    pageClassPrefix,
    singleProduct,
}) => {
    const {
        images,
        description,
        characteristics,
        title,
        article,
        price,
        priceOld,
        priceDiscount,
        isAvailable,
        options,
    } = singleProduct;
    return (
        <div className={`${pageClassPrefix}_inner__wrapper`}>
            <Breadcrumb />
            <div className={`${pageClassPrefix}_main-info`}>
                <SingleProductCarousel
                    pageClassPrefix={pageClassPrefix}
                    images={images}
                />
                <SingleProductDetails
                    pageClassPrefix={pageClassPrefix}
                    title={title}
                    article={article}
                    price={price}
                    priceOld={priceOld}
                    priceDiscount={priceDiscount}
                    isAvailable={isAvailable}
                    options={options}
                />
            </div>
            <SingleProductDescription
                pageClassPrefix={pageClassPrefix}
                description={description}
            />
            <SingleProductCharacteristics
                pageClassPrefix={pageClassPrefix}
                characteristics={characteristics}
            />
        </div>
    );
};

export default SingleProductInner;
