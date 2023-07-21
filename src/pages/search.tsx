import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import SearchPage from "@components/pages/SearchPage";

const SearchPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Search" />
            <SearchPage />
        </>
    );
};

export default SearchPageLayout;
