import React from "react";

import HeadMeta from "@components/segments/HeadMeta";
import PolicyPage from "@components/pages/PolicyPage";

const PolicyPageLayout: React.FC = () => {
    return (
        <>
            <HeadMeta title="Policy" />
            <PolicyPage />
        </>
    );
};

export default PolicyPageLayout;
