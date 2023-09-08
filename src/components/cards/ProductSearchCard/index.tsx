import { FC } from "react";
import cn from "classnames";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardDescription from "../components/ProductCardDescription";
import ProductCardList from "../components/ProductCardList";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { notImplemented } from "@helpers/notImplemented";
import { cutText } from "@helpers/textHelpers";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { TProductInfoListItem, TProductSearchCard } from "../types";

const ProductSearchCard: FC<TProductSearchCard> = ({
    className,
    title,
    material,
    size,
    color,
    description,
    priceNew,
    src,
}) => {
    const classPrefix = "product-search-card";

    const optionsList: TProductInfoListItem[] = [
        { label: "Material", value: cutText(material, 20) },
        { label: "Size", value: cutText(size, 20) },
        { label: "Color", value: cutText(color, 20) },
    ];

    return (
        <div
            className={cn(
                `${classPrefix}_wrapper`,
                PRODUCT_CARD_CLASSNAME,
                className,
            )}
        >
            <div className={`${classPrefix}_inner-wrapper`}>
                <div className={`${classPrefix}_info__wrapper`}>
                    <ImgWrapper src={src} />
                    <div className={`${classPrefix}_info__details`}>
                        <ProductCardTitle title={title} />
                        <ProductCardList optionsList={optionsList} />
                        <ProductCardDescription description={description} />
                    </div>
                </div>
                <div className={`${classPrefix}_actions__wrapper`}>
                    <H5>${priceNew}</H5>
                    <div className={`${classPrefix}_actions__btns`}>
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            size={EButtonSize.sm}
                            onClick={() => notImplemented()}
                            className="_add"
                        >
                            Add to cart
                        </ButtonPrimary>
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            size={EButtonSize.sm}
                            onClick={() => notImplemented()}
                        >
                            Buy Now
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSearchCard;
