import { FC } from "react";
import cn from "classnames";
import { isFunction } from "lodash";

import { H4, H5, P } from "@components/Text";

import { TAddedOptionsList } from "./types";

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
                            _active: item.isActive,
                        })}
                        onClick={() => {
                            if (isFunction(item.onClick)) {
                                item.onClick();
                            }
                        }}
                    >
                        {item.title && (
                            <H4 className={`${classPrefix}_item__title`}>
                                {item.title}
                            </H4>
                        )}
                        <div className={`${classPrefix}_item__list`}>
                            {item.list.map(
                                (subItem, subIndex) =>
                                    subItem && (
                                        <div
                                            key={subIndex}
                                            className={`${classPrefix}_sub-item__wrapper`}
                                        >
                                            <H5>{subItem.label}</H5>
                                            <P>{subItem.value}</P>
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default AddedOptionsList;
