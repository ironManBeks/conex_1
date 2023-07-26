import { FC } from "react";
import { observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";
import AuthForm from "@components/globalComponents/AuthForm";

import { useRootStore } from "@store";
import { EModalSize } from "../../types";

const ModalAuth: FC = observer(() => {
    const { commonStore } = useRootStore();
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
});

export default ModalAuth;
