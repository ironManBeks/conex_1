export enum ESearchFormNames {
    search = "search",
}

export type TSearchForm = {
    [ESearchFormNames.search]: string;
};

export const searchFormDefaultValues: TSearchForm = {
    [ESearchFormNames.search]: "",
};
