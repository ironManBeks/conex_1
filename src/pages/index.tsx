import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import HomePage from "@components/pages/HomePage";

const HomePageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Conexwest" />
            <HomePage />
        </>
    );
};

export default HomePageLayout;
