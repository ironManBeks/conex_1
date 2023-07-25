import { FC } from "react";
import cn from "classnames";

import { H5, P } from "@components/Text";

import { TAdditionalServices } from "./types";

const AdditionalServices: FC<TAdditionalServices> = ({
    className,
    options,
    totalOption,
}) => {
    const classPrefix = `additional-services`;
    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            {options.length && (
                <div className={`${classPrefix}_list`}>
                    {options.map((item, index) => (
                        <div key={index} className={`${classPrefix}_item`}>
                            <H5>{item.label}</H5>
                            <P>{item.value}</P>
                        </div>
                    ))}
                </div>
            )}
            {totalOption && (
                <div
                    className={cn(
                        `${classPrefix}_total`,
                        `${classPrefix}_item`,
                    )}
                >
                    <H5>{totalOption.label}</H5>
                    <P>{totalOption.value}</P>
                </div>
            )}
        </div>
    );
};

export default AdditionalServices;
