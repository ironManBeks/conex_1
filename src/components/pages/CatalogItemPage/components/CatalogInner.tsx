import { FC } from "react";
import { Breadcrumb } from "antd";

import CatalogCarousel from "@components/pages/CatalogItemPage/components/CatalogCarousel";
import { H2 } from "@components/Text";

import { CatalogSingleMockup } from "../../../../mockups/CatalogSingleMockup";
import { TCatalogInner } from "../types";

const CatalogInner: FC<TCatalogInner> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}_inner__wrapper`}>
            <Bread />
            <div style={{ display: "flex" }}>
                <CatalogCarousel
                    pageClassPrefix={pageClassPrefix}
                    images={CatalogSingleMockup.images}
                />
                <div className={`${pageClassPrefix}_details__wrapper`}>
                    <H2>
                        Door interior door 2 leaf blind solid wood color natural
                        90x200 cm
                    </H2>
                </div>
            </div>
        </div>
    );
};

export default CatalogInner;

const Bread = () => {
    return (
        <Breadcrumb
            items={[
                {
                    href: "",
                    title: "home",
                },
                {
                    href: "",
                    title: (
                        <>
                            <span>Application List</span>
                        </>
                    ),
                },
                {
                    title: "Application",
                },
            ]}
        />
    );
};
