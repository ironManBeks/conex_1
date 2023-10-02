import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";

import DrawerLayout from "@components/drawers/DrawerLayout";
import NavLinks from "@components/segments/components/NavLinks";
import { TStore } from "@globalTypes/storeTypes";
import { IRoot } from "@store/store";

const DrawerHeader: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { commonStore } = store as IRoot;
        const { headerDrawerVisible, setHeaderDrawerVisible } = commonStore;
        const classPrefix = "drawer-header";

        return (
            <DrawerLayout
                wrapperClassName={classPrefix}
                open={headerDrawerVisible}
                onClose={() => setHeaderDrawerVisible(false)}
                bodyContent={
                    <>
                        <NavLinks
                            wrapperClassPrefix={classPrefix}
                            placement="drawerHeader"
                        />
                    </>
                }
                placement="left"
            />
        );
    }),
);

export default DrawerHeader;
