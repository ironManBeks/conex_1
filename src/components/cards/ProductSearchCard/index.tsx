import { FC, ReactNode } from "react";
import cn from "classnames";
import { isNil } from "lodash";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H3, H5, P } from "@components/Text";

import { TProductSearchCard } from "../types";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { cutText } from "@helpers/textHelpers";

const ProductSearchCard: FC<TProductSearchCard> = ({
    className,
    id,
    title,
    material,
    size,
    color,
    description,
    priceNew,
    src,
}) => {
    const classPrefix = "product-search-card";

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <div className={`${classPrefix}_inner-wrapper`}>
                <div className={`${classPrefix}_info__wrapper`}>
                    <ImgWrapper src={src} />

                    <div className={`${classPrefix}_info__details`}>
                        <H3>{cutText(title, 25)}</H3>
                        <ul>
                            <ProductInfoListItem
                                label="Material"
                                value={cutText(material, 20)}
                            />
                            <ProductInfoListItem
                                label="Size"
                                value={cutText(size, 20)}
                            />
                            <ProductInfoListItem
                                label="Color"
                                value={cutText(color, 20)}
                            />
                        </ul>
                        {description && <P>{cutText(description, 80)}</P>}
                    </div>
                </div>
                <div className={`${classPrefix}_actions__wrapper`}>
                    <H5>${priceNew}</H5>
                    <div className={`${classPrefix}_actions__btns`}>
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            size={EButtonSize.sm}
                            onClick={() => notImplemented()}
                        >
                            Add to cart
                        </ButtonPrimary>
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            size={EButtonSize.sm}
                            onClick={() => notImplemented()}
                            isOutline={true}
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

const ProductInfoListItem = ({
    label,
    value,
}: {
    label: string;
    value: ReactNode;
}) => {
    if (isNil(value)) return <></>;
    return (
        <li>
            <span className="label">{label}:</span>
            <span className="value">{value}</span>
        </li>
    );
};
