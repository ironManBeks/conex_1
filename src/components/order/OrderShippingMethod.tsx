import { FC, useState } from "react";
import cn from "classnames";
import { isFunction } from "lodash";

import { H3 } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TOrderShippingMethod } from "./types";

const OrderShippingMethod: FC<TOrderShippingMethod> = ({
    className,
    onChange,
    options,
}) => {
    const classPrefix = "order-shipping-method";
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    const handleSelectedMethod = (value: string) => {
        setSelectedMethod(value);
        if (isFunction(onChange)) {
            onChange(value);
        }
    };

    if (!options?.length) return null;

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <H3>Shipping method</H3>
            {options?.length &&
                options.map((item) => (
                    <div
                        key={item.value}
                        className={cn(`${classPrefix}_item`, {
                            _active: selectedMethod === item.value,
                            _default: item.isDefault,
                        })}
                        onClick={() => handleSelectedMethod(item.value)}
                    >
                        {item.iconSrc && (
                            <ImgWrapper
                                src={item.iconSrc}
                                width={20}
                                height={20}
                                alt="Icon"
                            />
                        )}
                        <span>
                            {item.name} {item.price}
                        </span>
                        {item.dayFrom && item.dayTo && (
                            <i>
                                {item.dayFrom}-{item.dayTo} business days
                            </i>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default OrderShippingMethod;
