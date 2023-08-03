import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Empty } from "antd";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import ProgressWrapper from "@components/globalComponents/ProgressWrapper";
import BuilderRightSide from "./components/BuilderRightSide";

import { useRootStore } from "@store";
import { isEmpty } from "lodash";
import BuilderStepLayout from "@components/pages/BuilderPage/components/BuilderStepLayout";
import BuilderProgress from "@components/pages/BuilderPage/components/BuilderProgress";

const BuilderPage: FC = observer(() => {
    const classPrefix = "builder-page";
    const { builderStore } = useRootStore();
    const { getBuilderData, builderData, builderDataFetching } = builderStore;

    useEffect(() => {
        getBuilderData();
    }, []);

    const builderContent = useMemo(() => {
        if (builderDataFetching) {
            return <>loading</>;
        }

        if (isEmpty(builderData)) {
            return (
                <div>
                    <Empty />
                </div>
            );
        }

        return (
            <>
                <BuilderProgress pageClassPrefix={classPrefix} />
                <div className={`${classPrefix}_content__wrapper`}>
                    <div className={`${classPrefix}_left-side__wrapper`}>
                        <BuilderStepLayout pageClassPrefix={classPrefix} />
                    </div>
                    <BuilderRightSide pageClassPrefix={classPrefix} />
                </div>
            </>
        );
    }, [builderDataFetching, builderData, classPrefix]);

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">{builderContent}</Container>
        </Layout>
    );
});

export default BuilderPage;
