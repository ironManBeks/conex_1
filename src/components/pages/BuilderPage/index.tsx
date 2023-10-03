import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { isEmpty, isNil } from "lodash";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import BuilderForm from "./components/BuilderForm";
import BuilderLoader from "@components/pages/BuilderPage/components/BuilderLoader";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import {
    BUILDER_ADMIN_LAST_UPDATE,
    BUILDER_CART,
    BUILDER_CURRENT_STEP_ID,
    BUILDER_HISTORY,
    BUILDER_PARENT_ID,
    BUILDER_QUEUE,
    BUILDER_RESUlT_DATA,
    EDIT_BUILDER_CART_ITEM_DATA,
} from "@consts/storageNamesContsts";
import {
    getStorage,
    removeStorage,
    setStorage,
} from "@services/storage.service";
import { TNullable } from "@globalTypes/commonTypes";
import {
    TEditBuilderCartItemData,
    TResultDoorData,
} from "@store/builder/types";
import BuilderError from "@components/pages/BuilderPage/components/BuilderError";
import BuilderNoData from "@components/pages/BuilderPage/components/BuilderNoData";
import { handleClearBuilderStorage } from "@components/pages/BuilderPage/utils";

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
            resetBuilderFormData,
            updateCurrentStepData,
            setDefaultValuesToBuilder,
            builderSettings,
            setEditBuilderCartItemData,
            editBuilderCartItemData,
        } = builderStore;

        const adminLastUpdate = getStorage(BUILDER_ADMIN_LAST_UPDATE);

        useEffect(() => {
            getBuilderSettings().then((settings) => {
                if (settings.data.data.lastUpdate !== adminLastUpdate) {
                    handleClearBuilderStorage();
                    removeStorage(BUILDER_CART);
                }

                setStorage(
                    BUILDER_ADMIN_LAST_UPDATE,
                    settings.data.data.lastUpdate,
                );

                getBuilderAllData().then(() => {
                    const history = getStorage(BUILDER_HISTORY) as TNullable<
                        number[]
                    >;
                    const queue = getStorage(BUILDER_QUEUE) as TNullable<
                        number[]
                    >;
                    const result = getStorage(BUILDER_RESUlT_DATA) as TNullable<
                        TResultDoorData[]
                    >;
                    const stepId = getStorage(
                        BUILDER_CURRENT_STEP_ID,
                    ) as number;
                    const parentId = getStorage(BUILDER_PARENT_ID) as number;
                    const editCartItemData = getStorage(
                        EDIT_BUILDER_CART_ITEM_DATA,
                    ) as TNullable<TEditBuilderCartItemData>;

                    if (!isNil(editCartItemData)) {
                        setDefaultValuesToBuilder(
                            editCartItemData.history,
                            [],
                            editCartItemData.doorData,
                            editCartItemData.history[0],
                            editCartItemData.builderParentId,
                        );
                        setEditBuilderCartItemData(editCartItemData);
                    } else if (
                        stepId &&
                        result &&
                        history &&
                        queue &&
                        parentId
                    ) {
                        setDefaultValuesToBuilder(
                            history,
                            queue,
                            result,
                            stepId,
                            parentId,
                        );
                    } else {
                        handleClearBuilderStorage();
                        updateCurrentStepData("main-step");
                    }
                });
            });
            return () => {
                resetBuilderFormData();
                if (!isNil(editBuilderCartItemData)) {
                    removeStorage(EDIT_BUILDER_CART_ITEM_DATA);
                    handleClearBuilderStorage();
                    setEditBuilderCartItemData(null);
                }
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
