import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import AccountPage from "@components/pages/AccountPage";

const HomePageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="My account" />
            <AccountPage />
        </>
    );
};

export default HomePageLayout;
