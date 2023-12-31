import { FC } from "react";
import { inject, observer } from "mobx-react";

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
                closeDrawer={() => setHeaderDrawerVisible(false)}
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
