import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import SingleProductPage from "@components/pages/SingleProductPage";

const SingleProductPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Cart" />
            <SingleProductPage />
        </>
    );
};

export default SingleProductPageLayout;
