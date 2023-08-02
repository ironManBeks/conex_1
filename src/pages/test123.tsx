import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import TestPage from "@components/pages/TestPage";

const TestPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Test page" />
            <TestPage />
        </>
    );
};

export default TestPageLayout;
