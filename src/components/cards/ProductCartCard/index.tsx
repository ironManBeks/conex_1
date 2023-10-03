import { FC } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5 } from "@components/Text";
import { IconTrash, IconEdit } from "@components/Icons";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardDescription from "../components/ProductCardDescription";
import ProductCardList from "../components/ProductCardList";
import FormFieldInputNumber from "@components/form/formFields/FormFieldInputNumber";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { cutText } from "@helpers/textHelpers";
import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { TProductCartCard, TProductInfoListItem } from "../types";
import { notImplemented } from "@helpers/notImplemented";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { useMediaQuery } from "react-responsive";
import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";

const ProductCartCard: FC<TProductCartCard> = inject("store")(
    observer(
        ({
            store,
            className,
            title,
            material,
            size,
            color,
            description,
            priceOld,
            priceNew,
            src,
            quantity,
        }) => {
            const classPrefix = "product-cart-card";
            const { commonStore } = store as IRoot;

            const isMobile = useMediaQuery({
                minWidth: mediaBreakpoints.xsMedia,
                maxWidth: mediaBreakpoints.smMediaEnd,
            });

            const optionsList: TProductInfoListItem[] = [
                { label: "Material", value: cutText(material, 20) },
                { label: "Size", value: cutText(size, 20) },
                { label: "Color", value: cutText(color, 20) },
            ];

            const handleQuantityChange = (val: number | string | null) => {
                console.log("handleQuantityChange", val);
            };

            const quantityContent = (
                <div className={`${classPrefix}_quantity__wrapper`}>
                    <div className={`${classPrefix}_quantity__inner-wrapper`}>
                        Quantity:
                        <FormFieldInputNumber
                            name="quantity"
                            min={1}
                            max={99}
                            defaultValue={quantity}
                            onChange={(val) => handleQuantityChange(val)}
                            parser={(value) =>
                                value ? Number(value.replace(".", "")) : ""
                            }
                            errorMessage={undefined}
                        />
                    </div>
                </div>
            );

            const priceContent = (
                <div className={`${classPrefix}_price__wrapper`}>
                    <H5>${priceNew}</H5>
                    {priceOld && <H5 className="_old">${priceOld}</H5>}
                </div>
            );

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
                            <ImgWrapper src={src} alt="Product image" />
                            <div className={`${classPrefix}_info__details`}>
                                <ProductCardTitle title={title} />
                                <ProductCardList optionsList={optionsList} />
                                <ProductCardDescription
                                    description={description}
                                />
                            </div>
                        </div>
                        {isMobile ? (
                            <div className={`${classPrefix}_sub-info__wrapper`}>
                                {priceContent}
                                {quantityContent}
                            </div>
                        ) : (
                            <>
                                {priceContent}
                                {quantityContent}
                            </>
                        )}
                        <div className={`${classPrefix}_actions__wrapper`}>
                            <ButtonPrimary
                                onClick={() => notImplemented()}
                                color={EButtonColor.transparent}
                                className="_edit"
                            >
                                <IconEdit color="#A4A3A3" />
                            </ButtonPrimary>
                            <ButtonPrimary
                                onClick={() =>
                                    commonStore.setModalConfirmVisible(true)
                                }
                                color={EButtonColor.transparent}
                                className="_delete"
                            >
                                <IconTrash color="#A4A3A3" />
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            );
        },
    ),
);

export default ProductCartCard;
