import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import CatalogInteriorDoorsPage from "@components/pages/CatalogPage/CatalogInteriorDoorsPage";

const CatalogPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="interior doors" />
            <CatalogInteriorDoorsPage />
        </>
    );
};

export default CatalogPageLayout;
