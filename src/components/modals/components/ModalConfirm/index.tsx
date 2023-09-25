import { FC } from "react";
import { inject, observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";
import { H3, P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EModalSize } from "../../types";
import { TModalConfirm } from "./types";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { isFunction } from "lodash";
import { IRoot } from "@store/store";

const ModalConfirm: FC<TModalConfirm> = inject("store")(
    observer(
        ({
            store,
            title,
            description,
            onConfirm,
            confirmColor = EButtonColor.primary,
            confirmText,
            onClose,
        }) => {
            const classPrefix = "modal-confirm";
            const { commonStore } = store as IRoot;
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
                    modalSize={EModalSize.sm}
                    bodyContent={
                        <>
                            <H3>{title}</H3>
                            <P>{description}</P>
                        </>
                    }
                    footerContent={
                        <>
                            <ButtonPrimary
                                onClick={handleCloseModal}
                                size={EButtonSize.sm}
                                color={EButtonColor.secondary}
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
                                type="button"
                            >
                                {confirmText ?? "Confirm"}
                            </ButtonPrimary>
                        </>
                    }
                />
            );
        },
    ),
);

export default ModalConfirm;
