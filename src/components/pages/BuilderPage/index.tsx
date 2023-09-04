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
    BUILDER_PARENT_ID,
    BUILDER_QUEUE,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";
import { getStorage } from "@services/storage.service";
import { TNullable } from "@globalTypes/commonTypes";
import { TResultDoorData } from "@store/builder/types";
import BuilderError from "@components/pages/BuilderPage/components/BuilderError";
import { toJS } from "mobx";
import BuilderNoData from "@components/pages/BuilderPage/components/BuilderNoData";

const BuilderPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "builder-page";
        const { builderStore } = store as IRoot;
        const {
            getBuilderAllData,
            getBuilderSettings,
            builderAllData,
            builderAllDataFetching,
            builderSettingsFetching,
            resetAllBuilderData,
            updateCurrentStepData,
            setDefaultValuesToBuilder,
            getBuilderParamsData,
            builderSettings,
        } = builderStore;

        useEffect(() => {
            getBuilderSettings().then(() => {
                getBuilderAllData().then(() => {
                    const history: TNullable<number[]> =
                        getStorage(BUILDER_HISTORY);
                    const queue: TNullable<number[]> =
                        getStorage(BUILDER_QUEUE);
                    const result: TNullable<TResultDoorData[]> =
                        getStorage(BUILDER_RESUlT_DATA);
                    const stepId = getStorage(BUILDER_CURRENT_STEP_ID);
                    const parentId = getStorage(BUILDER_PARENT_ID);
                    if (stepId && result && history && queue && parentId) {
                        setDefaultValuesToBuilder(
                            history,
                            queue,
                            result,
                            stepId,
                            parentId,
                        );
                    } else {
                        updateCurrentStepData("main-step");
                    }
                });
            });
            return () => {
                resetAllBuilderData();
            };
        }, []);

        const builderContent = useMemo(() => {
            if (builderAllDataFetching || builderSettingsFetching) {
                return <BuilderLoader pageClassPrefix={classPrefix} />;
            }

            if (isEmpty(builderAllData)) {
                return <BuilderNoData pageClassPrefix={classPrefix} />;
            }

            if (!isEmpty(builderAllData) && !isEmpty(builderSettings)) {
                return <BuilderForm pageClassPrefix={classPrefix} />;
            }

            return <BuilderError pageClassPrefix={classPrefix} />;
        }, [
            builderAllDataFetching,
            builderSettingsFetching,
            builderAllData,
            builderSettings,
            classPrefix,
        ]);

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container flexDirection="column">{builderContent}</Container>
            </Layout>
        );
    }),
);

export default BuilderPage;
