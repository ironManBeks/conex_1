type filterDataProps = {
    text: string;
    amount: number;
    value: string;
};

export const formatFilterData = (filterData: filterDataProps[]) =>
    filterData.map(({ amount, text, value }) => ({
        value,
        label: `${text} (${amount})`,
    }));
