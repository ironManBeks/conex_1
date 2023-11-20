import { FC } from "react";

interface FilterListProps {
    pageClassPrefix: string;
    filterData: { amount: number; text: string }[];
}

const FilterList: FC<FilterListProps> = ({ pageClassPrefix, filterData }) => {
    return (
        <ul className={`${pageClassPrefix}__doors-filters-list`}>
            {filterData.map(({ amount, text }) => (
                <li key={text}>
                    <span>{text}</span>
                    <span
                        className={`${pageClassPrefix}__doors-filters-list-amount`}
                    >
                        {amount}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default FilterList;
