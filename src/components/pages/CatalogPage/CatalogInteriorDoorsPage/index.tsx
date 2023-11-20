import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";

import InteriorDoorsLayout from "./InteriorDoorsLayout";

const CatalogInteriorDoorsPage = () => {
    const classPrefix = "interior-doors-page";

    return (
        <Layout pageClassPrefix={classPrefix} isFullFooter={true}>
            <Container flexDirection={"column"}>
                <InteriorDoorsLayout pageClassPrefix={classPrefix} />
            </Container>
        </Layout>
    );
};

export default CatalogInteriorDoorsPage;
