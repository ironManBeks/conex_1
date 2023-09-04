import { FC } from "react";
import cn from "classnames";

import { TAddedOptionsList } from "./types";
import { H4, P } from "@components/Text";
import { isFunction } from "lodash";

const AddedOptionsList: FC<TAddedOptionsList> = ({
    className,
    optionsList,
}) => {
    const classPrefix = "added-options-list";

    if (!optionsList.length) return null;

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            {optionsList?.map((item, index) => {
                return item.list.length ? (
                    <div
                        key={index}
                        className={cn(`${classPrefix}_item__wrapper`, {
                            _clickable: isFunction(item.onClick),
                        })}
                        onClick={() => {
                            if (isFunction(item.onClick)) {
                                item.onClick();
                            }
                        }}
                    >
                        <H4 className={`${classPrefix}_item__title`}>
                            {item.title}
                        </H4>
                        <div className={`${classPrefix}_item__list`}>
                            {item.list.map((subItem, subIndex) => (
                                <P key={subIndex}>
                                    <span className="label">
                                        {subItem.label}
                                    </span>
                                    <span className="value">
                                        {typeof subItem.value === "number"
                                            ? `$${subItem.value}`
                                            : subItem.value}
                                    </span>
                                </P>
                            ))}
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default AddedOptionsList;
