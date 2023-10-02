import { FC } from "react";
import cn from "classnames";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5, P } from "@components/Text";
import { IconBox } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardList from "../components/ProductCardList";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { cutText } from "@helpers/textHelpers";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { TProductInfoListItem, TProductSearchCard } from "../types";
import { notImplemented } from "@helpers/notImplemented";
import { useMediaQuery } from "react-responsive";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const ProductSearchCard: FC<TProductSearchCard> = ({
    className,
    title,
    material,
    size,
    color,
    priceNew,
    src,
    deliveryStatus,
    priceCurrency,
}) => {
    const classPrefix = "product-search-card";

    const optionsList: TProductInfoListItem[] = [
        { label: "Material", value: cutText(material, 12) },
        { label: "Size", value: cutText(size, 12) },
        { label: "Color", value: cutText(color, 12) },
    ];

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
                    objectFit="contain"
                />
                {!isMobile && (
                    <div className={`${classPrefix}_details__wrapper`}>
                        {titleContent}
                        <ProductCardList optionsList={optionsList} />
                    </div>
                )}
                <div className={`${classPrefix}_actions__wrapper`}>
                    {priceNew && (
                        <H5>
                            {priceCurrency}
                            {priceNew}
                        </H5>
                    )}
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
