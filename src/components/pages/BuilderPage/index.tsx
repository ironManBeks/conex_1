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

const BuilderPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "builder-page";
        const { builderStore } = store as IRoot;
        const {
            getBuilderData,
            getBuilderSettings,
            builderData,
            builderDataFetching,
            builderSettings,
            builderSettingsFetching,
            setBuilderData,
            setEndDoorData,
            setCurrentStepData,
            setBuilderSettings,
            setResultDoorData,
        } = builderStore;

        useEffect(() => {
            getBuilderSettings().then(() => {
                getBuilderData();
            });
            return () => {
                setBuilderData(null);
                setBuilderSettings(null);
                setEndDoorData(null);
                setCurrentStepData(null);
                setResultDoorData(null);
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
