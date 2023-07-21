export interface ICommonStore {
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
    urlParams: Record<string, string>;
    setUlParams: (value: Record<string, string>) => void;
}
