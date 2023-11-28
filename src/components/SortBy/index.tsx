import { FC } from "react";
import cn from "classnames";

import { commonSortByClassPrefix } from "./const";
import Image from "next/image";

interface SortByProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
    icon?: React.ReactElement;
    defaultIconClassName?: string;
    isActive?: boolean;
    isDesc?: boolean;
}

const SortBy: FC<SortByProps> = ({
    text = "Sort By",
    icon,
    className,
    defaultIconClassName,
    isActive,
    isDesc,
    ...props
}) => {
    const activeIconClassName = `${commonSortByClassPrefix}__icon_active`;

    return (
        <div
            className={cn(
                commonSortByClassPrefix,
                { active: isActive },
                className,
            )}
            {...props}
        >
            {icon || (
                <Image
                    alt="sort by"
                    src="/icons/sort-down.svg"
                    width={24}
                    height={24}
                    className={cn(
                        { [activeIconClassName]: isDesc },
                        defaultIconClassName,
                    )}
                />
            )}

            <span>{text}</span>
        </div>
    );
};

export default SortBy;
