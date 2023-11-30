import { IconBox } from "@components/Icons";
import { P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import FormFieldInputNumber from "@components/form/formFields/FormFieldInputNumber";
import { isFunction } from "lodash";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface ProductGridCardProps {
    price: number;
    text: string;
    imageSrc: string | StaticImageData;
    count: number;
    isAdded?: boolean;
    imageAlt?: string;
    deliveryText?: string;
    btnText?: string;
    onBtnClick?: () => void;
    onCountChange?: (val: number) => void;
}

const ProductGridCard: FC<ProductGridCardProps> = ({
    price,
    text,
    imageSrc,
    count,
    isAdded,
    onBtnClick,
    onCountChange,
    imageAlt = "door",
    deliveryText = "Delivery tomorrow or later",
    btnText = "Add to card",
}) => {
    const classPrefix = "product-grid-card";

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
            defaultValue={count}
            min={1}
            max={100}
        />
    );

    const addButton = (
        <ButtonPrimary
            size={EButtonSize.md}
            color={EButtonColor.primary}
            type="submit"
            className={`${classPrefix}__btn`}
            onClick={onBtnClick}
        >
            {btnText}
        </ButtonPrimary>
    );

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div>
                <Image src={imageSrc} alt={imageAlt} width={228} height={260} />
            </div>
            <div className={`${classPrefix}__content`}>
                <div className={`${classPrefix}__price`}>
                    ${price.toFixed(2)}
                </div>
                <P className={`${classPrefix}__text`}>{text}</P>
                <div className={`${classPrefix}__action-container`}>
                    {isAdded ? countFieldContent : addButton}
                </div>
                <div className={`${classPrefix}__delivery`}>
                    <IconBox color={"rgba(44, 44, 53, 0.36)"} />
                    <span>{deliveryText}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductGridCard;
