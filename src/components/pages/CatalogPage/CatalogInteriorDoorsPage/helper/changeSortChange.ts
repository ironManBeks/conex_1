// INFO: move this function to global helpers if it used in different places
export const changeSortChange = (
    originName: string,
    currentValue?: string,
): string => {
    const sortingOrder = ["asc", "desc"];
    const ascSortOrder = `${originName}_${sortingOrder[0]}`;
    const descSortOrder = `${originName}_${sortingOrder[1]}`;

    if (!currentValue || currentValue === descSortOrder) {
        return ascSortOrder;
    } else if (currentValue === ascSortOrder) {
        return descSortOrder;
    }

    return ascSortOrder;
};
