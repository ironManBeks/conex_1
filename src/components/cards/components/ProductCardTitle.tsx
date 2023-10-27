import { FC } from "react";
import { H3 } from "@components/Text";
import cn from "classnames";

import { PRODUCT_CARD_CLASSNAME } from "@components/cards/consts";
import { cutText } from "@helpers/textHelpers";
import { TProductCardTitle } from "@components/cards/types";

const ProductCardTitle: FC<TProductCardTitle> = ({
    title,
    className,
    letterLimit = 25,
}) => {
    if (!title) return null;
    return (
        <H3
            className={cn(`${PRODUCT_CARD_CLASSNAME}_title`, className)}
            title={title}
        >
            {cutText(title, letterLimit)}
        </H3>
    );
};

export default ProductCardTitle;
