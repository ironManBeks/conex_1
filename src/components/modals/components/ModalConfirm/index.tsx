import { FC } from "react";
import { observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";
import { H3 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { useRootStore } from "@store";
import { EModalSize } from "../../types";
import { TModalConfirm } from "./types";
import { EButtonSize } from "@components/buttons/types";
import { isFunction } from "lodash";

const ModalConfirm: FC<TModalConfirm> = observer(
    ({ text, onConfirm, confirmColor, confirmText, onClose }) => {
        const classPrefix = "modal-confirm";
        const { commonStore } = useRootStore();
        const {
            modalConfirmVisible,
            setModalConfirmVisible,
            confirmModalData,
            setConfirmModalData,
        } = commonStore;

        const handleCloseModal = () => {
            setModalConfirmVisible(false);
            setConfirmModalData(null);
            if (isFunction(onClose)) {
                onClose();
            }
        };

        return (
            <ModalLayout
                wrapperClassName={classPrefix}
                modalVisible={modalConfirmVisible}
                handleCancel={handleCloseModal}
                modalSize={EModalSize.md}
                bodyContent={<H3>{text}</H3>}
                footerContent={
                    <>
                        <ButtonPrimary
                            onClick={handleCloseModal}
                            size={EButtonSize.sm}
                        >
                            Close
                        </ButtonPrimary>
                        <ButtonPrimary
                            size={EButtonSize.sm}
                            color={confirmColor}
                            onClick={() => {
                                onConfirm(confirmModalData);
                                handleCloseModal();
                            }}
                        >
                            {confirmText ?? "Confirm"}
                        </ButtonPrimary>
                    </>
                }
            />
        );
    },
);

export default ModalConfirm;
