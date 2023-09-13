import { EButtonColor } from "@components/buttons/types";
import { TStore } from "@globalTypes/storeTypes";

export type TModalConfirm = {
    onConfirm: (confirmModalData: any) => void;
    onClose?: () => void;
    confirmColor: EButtonColor.primary | EButtonColor.danger;
    title: string;
    description?: string;
    confirmText?: string;
} & TStore;
