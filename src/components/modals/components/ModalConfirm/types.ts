import { EButtonColor } from "@components/buttons/types";

export type TModalConfirm = {
    onConfirm: (confirmModalData: any) => void;
    onClose?: () => void;
    confirmColor: EButtonColor.primary | EButtonColor.danger;
    text: string;
    confirmText?: string;
};
