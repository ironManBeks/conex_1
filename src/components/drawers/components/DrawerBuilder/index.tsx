import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";

import DrawerLayout from "@components/drawers/DrawerLayout";
import NavLinks from "@components/segments/components/NavLinks";
import { TStore } from "@globalTypes/storeTypes";
import { IRoot } from "@store/store";

const DrawerBuilder: FC<TStore> = inject("store")(
    observer(({ store, children }) => {
        const { commonStore } = store as IRoot;
        const { builderDrawerVisible, setBuilderDrawerVisible } = commonStore;
        const classPrefix = "drawer-builder";
        const router = useRouter();

        useEffect(() => {
            if (router.asPath) {
                setBuilderDrawerVisible(false);
            }
        }, [router.asPath]);

        return (
            <DrawerLayout
                wrapperClassName={classPrefix}
                open={builderDrawerVisible}
                onClose={() => setBuilderDrawerVisible(false)}
                bodyContent={children}
                placement="bottom"
            />
        );
    }),
);

export default DrawerBuilder;
