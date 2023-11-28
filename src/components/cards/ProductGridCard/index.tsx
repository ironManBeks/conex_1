import { IconBox } from "@components/Icons";
import { P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface ProductGridCardProps {
    price: number;
    text: string;
    imageSrc: string | StaticImageData;
    onBtnClick?: () => void;
    imageAlt?: string;
    deliveryText?: string;
    btnText?: string;
}

const ProductGridCard: FC<ProductGridCardProps> = ({
    price,
    text,
    imageSrc,
    onBtnClick,
    imageAlt = "door",
    deliveryText = "Delivery tomorrow or later",
    btnText = "Add to card",
}) => {
    const classPrefix = "product-grid-card";

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
                <ButtonPrimary
                    size={EButtonSize.md}
                    color={EButtonColor.primary}
                    type="submit"
                    className={`${classPrefix}__btn`}
                    onClick={onBtnClick}
                >
                    {btnText}
                </ButtonPrimary>
                <div className={`${classPrefix}__delivery`}>
                    <IconBox color={"rgba(44, 44, 53, 0.36)"} />
                    <span>{deliveryText}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductGridCard;
