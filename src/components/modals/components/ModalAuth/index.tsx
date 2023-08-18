import { FC } from "react";
import { inject, observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";
import AuthForm from "@components/globalComponents/AuthForm";

import { EModalSize } from "../../types";
import { TStore } from "@globalTypes/storeTypes";
import { IRoot } from "@store/store";

const ModalAuth: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { commonStore } = store as IRoot;
        const { modalAuthVisible, setModalAuthVisible } = commonStore;

        return (
            <ModalLayout
                wrapperClassName="modal-auth"
                modalVisible={modalAuthVisible}
                handleCancel={() => setModalAuthVisible(false)}
                modalSize={EModalSize.md}
                title={"ModalAuth"}
                bodyContent={<AuthForm className="modal-auth" />}
            />
        );
    }),
);

export default ModalAuth;
