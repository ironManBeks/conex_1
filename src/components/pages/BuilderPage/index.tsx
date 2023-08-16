import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { Empty } from "antd";
import { isEmpty } from "lodash";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import BuilderForm from "./components/BuilderForm";

import { useRootStore } from "@store";
import BuilderLoader from "@components/pages/BuilderPage/components/BuilderLoader";

// ToDo clean code :)
const BuilderPage: FC = observer(() => {
    const classPrefix = "builder-page";
    const { builderStore } = useRootStore();
    const { getBuilderData, builderData, builderDataFetching } = builderStore;

    useEffect(() => {
        getBuilderData();
    }, []);

    const builderContent = useMemo(() => {
        if (builderDataFetching) {
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
});

export default BuilderPage;
