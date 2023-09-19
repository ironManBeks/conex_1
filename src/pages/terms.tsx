import React from "react";

import HeadMeta from "@components/segments/HeadMeta";
import TermsPage from "@components/pages/TermsPage";

const TermsPageLayout: React.FC = () => {
    return (
        <>
            <HeadMeta title="Terms" />
            <TermsPage />
        </>
    );
};

export default TermsPageLayout;
