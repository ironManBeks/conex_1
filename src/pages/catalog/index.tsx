import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import CatalogPage from "@components/pages/CatalogPage";

const CatalogPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Cart" />
            <CatalogPage />
        </>
    );
};

export default CatalogPageLayout;
