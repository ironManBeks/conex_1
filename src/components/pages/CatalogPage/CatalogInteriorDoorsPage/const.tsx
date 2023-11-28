import Image from "next/image";

import { TSortFormDefaultValues, TTagsFormDefaultValues } from "./types";

const sortTypes = [
    { text: "By popularity", value: "by_popularity" },
    {
        text: "Name",
        value: "name",
        icon: (
            <Image
                alt="sort by name"
                src="/icons/sort-a-z.svg"
                width={24}
                height={24}
            />
        ),
        descIcon: (
            <Image
                alt="sort by name"
                src="/icons/sort-z-a.svg"
                width={24}
                height={24}
            />
        ),
    },
    { text: "Price", value: "price" },
];

// Form Default Values
const sortFormDefaultValues: TSortFormDefaultValues = {
    sort: "",
};

const tagsFormDefaultValues: TTagsFormDefaultValues = {
    tags: [],
};

const SLIDER_STEPS = 100;
const MAX_PRICE = 10000;
const MIN_PRICE = 0;
const categoriesFormDefaultValues = {
    price: [MIN_PRICE, MAX_PRICE],
    categories: {
        doors: [],
        interior_doors: [],
        panel_header_3: [],
    },
};

export {
    sortFormDefaultValues,
    sortTypes,
    tagsFormDefaultValues,
    categoriesFormDefaultValues,
    SLIDER_STEPS,
    MAX_PRICE,
    MIN_PRICE,
};
