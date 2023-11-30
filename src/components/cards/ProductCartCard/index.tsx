import { FC } from "react";
import cn from "classnames";
import { isEmpty, isFunction } from "lodash";
import { useMediaQuery } from "react-responsive";

import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H5 } from "@components/Text";
import { IconTrash } from "@components/Icons";
import FormFieldInputNumber from "@components/form/formFields/FormFieldInputNumber";
import FormFieldCheckbox from "@components/form/formFields/FormFieldCheckbox";
import ProductCardTitle from "../components/ProductCardTitle";
import ProductCardList from "../components/ProductCardList";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { TProductCartCard } from "../types";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import CollapsibleBlockWithTitle from "@components/globalComponents/CollapsibleBlockWithTitle";

const ProductCartCard: FC<TProductCartCard> = ({
    id,
    className,
    title,
    price,
    img,
    select,
    onDeleteClick,
    options,
    count,
    onCountChange,
    isAdded,
    btnText = "Add to card",
    onBtnClick,
}) => {
    const classPrefix = "product-cart-card";

    const isMobile = useMediaQuery({
        minWidth: mediaBreakpoints.xsMedia,
        maxWidth: mediaBreakpoints.xsMediaEnd,
    });

    const titleContent = <ProductCardTitle title={title} letterLimit={40} />;

    const detailsActionsContent = isFunction(onDeleteClick) && (
        <div className={`${classPrefix}_details__actions`}>
            <ButtonPrimary
                leftIcon={
                    <IconTrash
                        width={isMobile ? 24 : undefined}
                        height={isMobile ? 24 : undefined}
                    />
                }
                color={EButtonColor.transparent}
                onClick={onDeleteClick}
                isOpacity={true}
            >
                {!isMobile && "Delete"}
            </ButtonPrimary>
        </div>
    );

    const countFieldContent = (
        <FormFieldInputNumber
            name={"count"}
            errorMessage={undefined}
            isFloatingLabel={false}
            sideButtons={true}
            onValueChange={(val) => {
                if (isFunction(onCountChange)) {
                    onCountChange(val);
                }
            }}
            className={`${classPrefix}__number-input`}
            defaultValue={count}
            min={1}
            max={100}
        />
    );

    const addButton = (
        <ButtonPrimary
            size={EButtonSize.sm}
            color={EButtonColor.primary}
            type="submit"
            className={`${classPrefix}__btn`}
            onClick={onBtnClick}
        >
            {btnText}
        </ButtonPrimary>
    );

    const btnOrCountContent = isAdded ? countFieldContent : addButton;

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
                {img && (
                    <ImgWrapper
                        src={img}
                        wrapperClassName={`${classPrefix}_image__wrapper`}
                        alt="Product image"
                    />
                )}
                <div className={`${classPrefix}_details__wrapper`}>
                    {titleContent}
                    {isMobile && price && <H5>${price}</H5>}
                    {!isMobile && (
                        <div>
                            <ProductCardList
                                optionsList={options.slice(0, 3)}
                            />
                            {options.length > 3 && (
                                <CollapsibleBlockWithTitle
                                    expandTitle="View more"
                                    closeTitle="View less"
                                    defaultOpen={false}
                                    wrapperClassName={"_list"}
                                    titlePosition={"bottom"}
                                >
                                    <ProductCardList
                                        optionsList={options.slice(
                                            3,
                                            options.length,
                                        )}
                                    />
                                </CollapsibleBlockWithTitle>
                            )}
                        </div>
                    )}
                    {!isMobile && detailsActionsContent}
                    {isMobile && btnOrCountContent}
                </div>
                <div className={`${classPrefix}_actions__wrapper`}>
                    {!isMobile && price && <H5>${price}</H5>}
                    {!isMobile && btnOrCountContent}
                    {isMobile && detailsActionsContent}
                </div>
            </div>
        </div>
    );
};

export default ProductCartCard;
