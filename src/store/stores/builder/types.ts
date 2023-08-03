export interface IBuilderStore {
    builderData: any;
    getBuilderData: () => void;
    setBuilderData: (data: any) => void;
    builderDataFetching: boolean;
    setBuilderDataFetching: (value: boolean) => void;
}
