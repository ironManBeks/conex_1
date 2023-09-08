import { FC } from "react";
import cn from "classnames";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { isFunction } from "lodash";
import { TChoiceMode } from "./types";

const ChoiceMode: FC<TChoiceMode> = ({ options, className }) => {
    const classPrefix = `choice-mode`;
    if (!options?.length) return null;
    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            {options.map((item) => (
                <ButtonPrimary
                    key={item.value}
                    className={cn(`${classPrefix}_item`, {
                        _active: item.isActive,
                    })}
                    onClick={() => {
                        if (isFunction(item.onClick)) {
                            item.onClick();
                        }
                    }}
                >
                    {item.label}
                </ButtonPrimary>
            ))}
        </div>
    );
};

export default ChoiceMode;
