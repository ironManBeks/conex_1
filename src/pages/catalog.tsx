import React from "react";

import HeadMeta from "@components/segments/HeadMeta";
import CatalogPage from "src/components/pages/CatalogItemPage";

const CatalogPageLayout: React.FC = () => {
    return (
        <>
            <HeadMeta title="Catalog" />
            <CatalogPage />
        </>
    );
};

export default CatalogPageLayout;
