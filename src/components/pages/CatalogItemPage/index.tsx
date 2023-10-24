import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";
import ProductsCarousel from "@components/globalComponents/ProductsCarousel";

import { AdditionalProductsCarouselMockup } from "../../../mockups/AdditionalProductsCarouselMockup";
import CatalogInner from "@components/pages/CatalogItemPage/components/CatalogInner";

const CatalogPage = () => {
    const classPrefix = "catalog-page";

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection={"column"}>
                <CatalogInner pageClassPrefix={classPrefix} />
                <ProductsCarousel
                    title="Related Products"
                    list={AdditionalProductsCarouselMockup}
                />
                <ProductsCarousel
                    title="With this product buy"
                    list={AdditionalProductsCarouselMockup}
                />
            </Container>
        </Layout>
    );
};

export default CatalogPage;
