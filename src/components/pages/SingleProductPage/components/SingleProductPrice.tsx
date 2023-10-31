import { FC } from "react";
import cn from "classnames";

import { H4 } from "@components/Text";
import SingleProductActions from "./SingleProductActions";

import { TSingleProductPriceProps } from "../types";

const SingleProductPrice: FC<TSingleProductPriceProps> = ({
    pageClassPrefix,
    price,
    priceOld,
    priceDiscount,
    isAvailable,
    changeHeaderVisible,
    wrapperClassName,
    mainButtonSize,
}) => {
    const classPrefix = `${pageClassPrefix}_price`;

    return (
        <div className={cn(`${classPrefix}__wrapper`, wrapperClassName)}>
            <H4>
                ${price}
                {priceOld && (
                    <>
                        {priceDiscount && (
                            <span>
                                <span className="discount">
                                    -{priceDiscount}%
                                </span>
                            </span>
                        )}
                        <span>
                            <span className="old">${priceOld}</span>
                        </span>
                    </>
                )}
            </H4>
            <SingleProductActions
                isAvailable={isAvailable}
                changeHeaderVisible={changeHeaderVisible}
                mainButtonSize={mainButtonSize}
            />
        </div>
    );
};

export default SingleProductPrice;
