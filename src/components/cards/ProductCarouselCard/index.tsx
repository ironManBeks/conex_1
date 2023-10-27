import { FC } from "react";
import cn from "classnames";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5, P } from "@components/Text";
import { IconBox } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ProductCardTitle from "../components/ProductCardTitle";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { EButtonColor } from "@components/buttons/types";
import { TProductCarouselCard } from "../types";
import { notImplemented } from "@helpers/notImplemented";

const ProductCarouselCard: FC<TProductCarouselCard> = ({
    className,
    title,
    price,
    src,
    deliveryStatus,
}) => {
    const classPrefix = "product-carousel-card";

    return (
        <div
            className={cn(
                `${classPrefix}_wrapper`,
                PRODUCT_CARD_CLASSNAME,
                className,
            )}
        >
            <div className={`${classPrefix}_inner-wrapper`}>
                <ImgWrapper
                    src={src}
                    wrapperClassName={`${classPrefix}_image__wrapper`}
                    alt="Product image"
                    title={title}
                />
                <div className={`${classPrefix}_details__wrapper`}>
                    {price && <H5>${price}</H5>}
                    {<ProductCardTitle title={title} letterLimit={35} />}
                    <div className={`${classPrefix}_actions__btns`}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => notImplemented()}
                        >
                            Add to cart
                        </ButtonPrimary>
                    </div>
                    {deliveryStatus && (
                        <P>
                            <IconBox opacity="0.36" />
                            <span>{deliveryStatus}</span>
                        </P>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCarouselCard;
