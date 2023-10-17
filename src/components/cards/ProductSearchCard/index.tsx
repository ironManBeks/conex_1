import { FC } from "react";
import cn from "classnames";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5, P } from "@components/Text";
import { IconBox } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardList from "../components/ProductCardList";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { TProductSearchCard } from "../types";
import { notImplemented } from "@helpers/notImplemented";
import { useMediaQuery } from "react-responsive";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";

const ProductSearchCard: FC<TProductSearchCard> = ({
    className,
    title,
    priceNew,
    src,
    deliveryStatus,
    options,
}) => {
    const classPrefix = "product-search-card";

    const isMobile = useMediaQuery({
        minWidth: mediaBreakpoints.xsMedia,
        maxWidth: mediaBreakpoints.smMediaEnd,
    });

    const titleContent = <ProductCardTitle title={title} letterLimit={40} />;

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
                />
                {!isMobile && (
                    <div className={`${classPrefix}_details__wrapper`}>
                        {titleContent}
                        <ProductCardList optionsList={options} />
                    </div>
                )}
                <div className={`${classPrefix}_actions__wrapper`}>
                    {priceNew && <H5>${priceNew}</H5>}
                    {isMobile && titleContent}
                    {deliveryStatus && (
                        <P>
                            <IconBox opacity="0.36" />
                            <span>{deliveryStatus}</span>
                        </P>
                    )}
                    <div className={`${classPrefix}_actions__btns`}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            size={EButtonSize.sm}
                            onClick={() => notImplemented()}
                        >
                            Add to cart
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSearchCard;
