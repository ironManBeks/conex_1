import { Layout } from "@components/segments/Layout";
import ButtonLink from "@components/buttons/ButtonLink";
import Container from "@components/globalComponents/Container";

import { toSingleProductPageId } from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";

const CatalogPage = () => {
    const classPrefix = "catalog-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexJustifyContent={"center"}>
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <ButtonLink
                        href={toSingleProductPageId("single-product-page")}
                        color={EButtonColor.primary}
                    >
                        Got to single product
                    </ButtonLink>
                </div>
            </Container>
        </Layout>
    );
};

export default CatalogPage;
