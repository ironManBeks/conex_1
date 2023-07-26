export interface ICommonStore {
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
    urlParams: Record<string, string>;
    setUlParams: (value: Record<string, string>) => void;
    //Modals
    modalConfirmToDeleteVisible: boolean;
    setModalConfirmToDeleteVisible: (value: boolean) => void;
    modalAuthVisible: boolean;
    setModalAuthVisible: (value: boolean) => void;
}
