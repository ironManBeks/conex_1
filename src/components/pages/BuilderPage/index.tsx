import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import BuilderRightSide from "./components/BuilderRightSide";
import BuilderForm from "./components/BuilderForm";
import BuilderFormActions from "./components/BuilderFormActions";

const BuilderPage: FC = () => {
    const classPrefix = "builder-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">
                <div>
                    <ProgressWrapper
                        showInfo={false}
                        percent={50}
                        wrapperClassPrefix={classPrefix}
                    />
                </div>
                <div className={`${classPrefix}_content__wrapper`}>
                    <div className={`${classPrefix}_left-side__wrapper`}>
                        <BuilderForm pageClassPrefix={classPrefix} />
                    </div>
                    <BuilderRightSide pageClassPrefix={classPrefix} />
                </div>
                <BuilderFormActions pageClassPrefix={classPrefix} />
            </Container>
        </Layout>
    );
};

export default BuilderPage;
