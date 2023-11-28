import { inject, observer } from "mobx-react";
import { FC } from "react";

import { TStore } from "@globalTypes/storeTypes";

import PriceFilter from "./FiltersSidePrice";
import CategoriesFilter from "./FiltersSideCategories";
import DoorModificationFilter from "./FiltersSideDoorModification";
import EyeletFilter from "./FiltersSidEyelet";

interface FilterSideProps extends TStore {
    pageClassPrefix: string;
}

const FilterSide: FC<FilterSideProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        return (
            <div className={`${pageClassPrefix}__filters-container`}>
                <CategoriesFilter pageClassPrefix={pageClassPrefix} />
                <PriceFilter pageClassPrefix={pageClassPrefix} />
                <DoorModificationFilter pageClassPrefix={pageClassPrefix} />
                <EyeletFilter pageClassPrefix={pageClassPrefix} />
            </div>
        );
    }),
);

export default FilterSide;
