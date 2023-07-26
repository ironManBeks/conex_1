import { FC } from "react";
import { isNil } from "lodash";
import cn from "classnames";

import { PRODUCT_CARD_CLASSNAME } from "../consts";
import { TProductCardList, TProductInfoListItem } from "../types";

const ProductCardList: FC<TProductCardList> = ({ className, optionsList }) => {
    if (!optionsList?.length) return null;
    return (
        <ul className={cn(`${PRODUCT_CARD_CLASSNAME}_list`, className)}>
            {optionsList.map((item, index) => (
                <ProductCardListItem
                    key={index}
                    label={item.label}
                    value={item.value}
                />
            ))}
        </ul>
    );
};

export default ProductCardList;

const ProductCardListItem: FC<TProductInfoListItem> = ({ label, value }) => {
    if (isNil(value)) return null;
    return (
        <li>
            <span className="label">{label}:</span>
            <span className="value">{value}</span>
        </li>
    );
};
