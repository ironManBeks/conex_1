import { FC } from "react";
import { P } from "@components/Text";
import cn from "classnames";

import { cutText } from "@helpers/textHelpers";
import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { TProductCardDescription } from "../types";

const ProductCardDescription: FC<TProductCardDescription> = ({
    description,
    className,
    letterLimit = 80,
}) => {
    if (!description) return null;
    return (
        <P className={cn(`${PRODUCT_CARD_CLASSNAME}_description`, className)}>
            {cutText(description, letterLimit)}
        </P>
    );
};

export default ProductCardDescription;
