import { Layout } from "@components/segments/Layout";

import Container from "@components/globalComponents/Container";
import Breadcrumb from "@components/globalComponents/Breadcrumb";
import { H2 } from "@components/Text";
import CatalogGroup from "./components/CatalogGroup";

import { PATH_CATALOG_PAGE } from "@consts/pathsConsts";
import { TCatalogSingleGroup } from "@components/pages/CatalogPage/types";

const CatalogPage = () => {
    const classPrefix = "catalog-page";

    return (
        <Layout pageClassPrefix={classPrefix} isFullFooter={true}>
            <Container flexDirection={"column"}>
                <Breadcrumb />
                <H2>Catalog</H2>
                {/*<div style={{ padding: "30px 0" }}>*/}
                {/*    <ButtonLink*/}
                {/*        href={toSingleProductPageId("single-product-page")}*/}
                {/*        color={EButtonColor.primary}*/}
                {/*    >*/}
                {/*        Got to single product*/}
                {/*    </ButtonLink>*/}
                {/*</div>*/}
                <div className={`${classPrefix}_list__wrapper`}>
                    {linksMockup.map((item, index) => (
                        <CatalogGroup
                            key={index}
                            pageClassPrefix={classPrefix}
                            image={item.image}
                            title={item.title}
                            links={item.links}
                        />
                    ))}
                    {linksMockup.map((item, index) => (
                        <CatalogGroup
                            key={index}
                            pageClassPrefix={classPrefix}
                            image={item.image}
                            title={item.title}
                            links={item.links}
                        />
                    ))}
                </div>
            </Container>
        </Layout>
    );
};

export default CatalogPage;

const linksMockup: TCatalogSingleGroup[] = [
    {
        image: {
            src: "https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg",
            alt: "test iamge",
        },
        title: "Test title",
        links: [
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
        ],
    },
    {
        image: {
            src: "https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg",
            alt: "test iamge",
        },
        title: "Test title",
        links: [
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
        ],
    },
    {
        image: {
            src: "https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg",
            alt: "test iamge",
        },
        title: "Test title",
        links: [
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
        ],
    },
    {
        image: {
            src: "https://conexwest-doors.opserver.store/uploads/metal_door_0d3db7abc9.jpg",
            alt: "test iamge",
        },
        title: "Test title",
        links: [
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
            {
                title: "Test link",
                href: PATH_CATALOG_PAGE,
            },
        ],
    },
];
