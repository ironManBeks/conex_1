import cn from "classnames";
import { FC, useEffect, useState } from "react";

interface FilterListProps {
    pageClassPrefix: string;
    defaultValues: string[];
    filterData: { amount: number; text: string; value: string }[];

    onListClick: (filters: string[]) => void;
}

const FilterList: FC<FilterListProps> = ({
    pageClassPrefix,
    defaultValues,
    filterData,
    onListClick,
}) => {
    const [selectedFilters, setSelectedFilters] =
        useState<string[]>(defaultValues);

    const handleListClick = (value: string) => {
        const indexInSelected = selectedFilters.findIndex(
            (filter) => filter === value,
        );

        if (indexInSelected === -1) {
            setSelectedFilters([...selectedFilters, value]);
        } else {
            const newArr = [...selectedFilters];
            newArr.splice(indexInSelected, 1);
            setSelectedFilters(newArr);
        }
    };

    useEffect(() => {
        onListClick(selectedFilters);
    }, [selectedFilters]);

    return (
        <ul className={`${pageClassPrefix}__doors-filters-list`}>
            {filterData.map(({ amount, text, value }) => {
                const isSelected =
                    selectedFilters.findIndex((filter) => filter === value) !==
                    -1;

                return (
                    <li
                        key={text}
                        className={cn({
                            active: isSelected,
                        })}
                        onClick={() => handleListClick(value)}
                    >
                        <span>{text}</span>
                        <span
                            className={`${pageClassPrefix}__doors-filters-list-amount`}
                        >
                            {amount}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default FilterList;
