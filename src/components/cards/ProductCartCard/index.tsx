import { FC } from "react";
import cn from "classnames";
import { isEmpty } from "lodash";
import { useMediaQuery } from "react-responsive";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5, P } from "@components/Text";
import { IconBox } from "@components/Icons";
import FormFieldInputNumber from "@components/form/formFields/FormFieldInputNumber";
import FormFieldCheckbox from "@components/form/formFields/FormFieldCheckbox";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardList from "../components/ProductCardList";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { cutText } from "@helpers/textHelpers";
import { TProductInfoListItem, TProductCartCard } from "../types";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const ProductCartCard: FC<TProductCartCard> = ({
    id,
    className,
    title,
    price,
    priceCurrency,
    material,
    size,
    color,
    imageSrc,
    deliveryStatus,
    select,
}) => {
    const classPrefix = "product-cart-card";

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
                {!isEmpty(select) && (
                    <div className={`${classPrefix}_checkbox__wrapper`}>
                        <FormFieldCheckbox
                            name="select"
                            errorMessage={undefined}
                            className={`${classPrefix}_checkbox`}
                            checked={select?.isSelect}
                            onChange={(event) => {
                                const val = event.target.checked;
                                select?.onSelectChange(id, val);
                            }}
                        />
                    </div>
                )}
                {imageSrc && (
                    <ImgWrapper
                        src={imageSrc}
                        wrapperClassName={`${classPrefix}_image__wrapper`}
                        alt="Product image"
                    />
                )}
                {!isMobile && (
                    <div className={`${classPrefix}_details__wrapper`}>
                        {titleContent}
                        <ProductCardList optionsList={optionsList} />
                    </div>
                )}
                <div className={`${classPrefix}_actions__wrapper`}>
                    {price && (
                        <H5>
                            {priceCurrency}
                            {price}
                        </H5>
                    )}
                    {isMobile && titleContent}
                    {deliveryStatus && (
                        <P>
                            <IconBox opacity="0.36" />
                            <span>{deliveryStatus}</span>
                        </P>
                    )}
                    <FormFieldInputNumber
                        name={"count"}
                        errorMessage={undefined}
                        isFloatingLabel={false}
                        sideButtons={true}
                        min={1}
                        max={100}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCartCard;
