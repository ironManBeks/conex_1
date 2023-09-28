import { FC } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";
import { useRouter } from "next/router";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { TSectionTypes } from "@globalTypes/sectionTypes";

const AccountNoData: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { logOut } = authStore;
        const router = useRouter();

        const handleReset = () => {
            logOut();
            router.reload();
        };

        return (
            <div
                style={{
                    minHeight: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Empty />
                <br />
                <br />
                <div>Please reload the page</div>
                <div className={`${pageClassPrefix}_error__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleReset}
                    >
                        Reset and reload
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default AccountNoData;