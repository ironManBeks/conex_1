import React from "react";

import HeadMeta from "@components/segments/HeadMeta";
import BuilderPage from "@components/pages/BuilderPage";

const BuilderPagePageLayout: React.FC = () => {
    return (
        <>
            <HeadMeta title="Door Builder" />
            <BuilderPage />
        </>
    );
};

export default BuilderPagePageLayout;
