import { FC } from "react";

import DrawerLayout from "@components/drawers/DrawerLayout";
import NavLinks from "@components/segments/components/NavLinks";
import { observer } from "mobx-react";
import { useRootStore } from "@store";

const DrawerHeader: FC = observer(() => {
    const { commonStore } = useRootStore();
    const { headerDrawerVisible, setHeaderDrawerVisible } = commonStore;
    const classPrefix = "drawer-header";

    return (
        <DrawerLayout
            wrapperClassName={classPrefix}
            open={headerDrawerVisible}
            onClose={() => setHeaderDrawerVisible(false)}
            bodyContent={
                <>
                    <NavLinks wrapperClassPrefix={classPrefix} />
                </>
            }
            placement="left"
        />
    );
});

export default DrawerHeader;
