import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";
import { isEmpty } from "lodash";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import BuilderForm from "./components/BuilderForm";
import BuilderLoader from "@components/pages/BuilderPage/components/BuilderLoader";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import {
    BUILDER_CURRENT_STEP_ID,
    BUILDER_HISTORY,
    BUILDER_QUEUE,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";
import { getStorage } from "@services/storage.service";
import { TNullable } from "@globalTypes/commonTypes";
import { TResultDoorData } from "@store/builder/types";

const BuilderPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "builder-page";
        const { builderStore } = store as IRoot;
        const {
            getBuilderData,
            getBuilderSettings,
            builderData,
            builderDataFetching,
            builderSettingsFetching,
            resetAllBuilderData,
            updateCurrentStepData,
            setDefaultValuesToBuilder,
            getBuilderDataByParent,
        } = builderStore;

        useEffect(() => {
            getBuilderSettings().then(() => {
                getBuilderData().then(() => {
                    const history: TNullable<number[]> =
                        getStorage(BUILDER_HISTORY);
                    const queue: TNullable<number[]> =
                        getStorage(BUILDER_QUEUE);
                    const result: TNullable<TResultDoorData[]> =
                        getStorage(BUILDER_RESUlT_DATA);
                    const stepId = getStorage(BUILDER_CURRENT_STEP_ID);
                    if (stepId && result && history && queue) {
                        setDefaultValuesToBuilder(
                            history,
                            queue,
                            result,
                            stepId,
                        );
                    } else {
                        updateCurrentStepData("start");
                    }
                });
            });
            getBuilderDataByParent();
            return () => {
                resetAllBuilderData();
            };
        }, []);

        const builderContent = useMemo(() => {
            if (builderDataFetching || builderSettingsFetching) {
                return <BuilderLoader pageClassPrefix={classPrefix} />;
            }

            if (isEmpty(builderData)) {
                return (
                    <div
                        style={{
                            minHeight: "50vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <Empty />
                        <br />
                        <br />
                        <div>Please reload the page</div>
                    </div>
                );
            }

            return <BuilderForm pageClassPrefix={classPrefix} />;
        }, [builderDataFetching, builderData, classPrefix]);

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container flexDirection="column">{builderContent}</Container>
            </Layout>
        );
    }),
);

export default BuilderPage;
