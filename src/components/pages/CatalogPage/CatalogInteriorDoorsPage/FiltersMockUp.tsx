import { CollapseProps } from "antd";
import FilterList from "./FilterList";
import { TCategory } from "./types";

const tags = [
    { text: "With glass", value: "with_glass" },
    { text: "Monolith", value: "monolith" },
    { text: "Gray door", value: "gray_door" },
    { text: "Stained doors", value: "stained_doors" },
];

const eyeletIncluded = [
    {
        text: "Yes",
        amount: 20,
        value: "yes",
    },
    {
        text: "No",
        amount: 21,
        value: "no",
    },
    {
        text: "Not specified",
        amount: 2,
        value: "not_specified",
    },
];

const interiorDoors = [
    {
        text: "Doors with glass",
        amount: 22,
        value: "doors_with_glasses",
    },
    {
        text: "Interior arches",
        amount: 22,
        value: "interior_arches",
    },
    {
        text: "Sliding systems",
        amount: 22,
        value: "sliding_systems",
    },
];

const doorModification = [
    {
        text: "Monolith",
        amount: 32,
        value: "monolith",
    },
    {
        text: "With glass",
        amount: 21,
        value: "with_glass",
    },
    {
        text: "Ornamental",
        amount: 30,
        value: "ornamental_double",
    },
    {
        text: "Stained",
        amount: 2,
        value: "stained",
    },
    {
        text: "Ornamental",
        amount: 4,
        value: "ornamental_second",
    },
    // double
    {
        text: "Monolith",
        amount: 32,
        value: "monolith_2",
    },
    {
        text: "With glass",
        amount: 21,
        value: "with_glass_2",
    },
    {
        text: "Ornamental",
        amount: 30,
        value: "ornamental_2",
    },
    {
        text: "Stained",
        amount: 2,
        value: "stained_2",
    },
    {
        text: "Ornamental",
        amount: 4,
        value: "ornamental_second_2",
    },
];

const collapseItems = (
    pageClassPrefix: string,
    defaultValues: TCategory,
    onClick: (value: object) => void,
): CollapseProps["items"] => [
    {
        key: "1",
        label: "Doors",
        children: (
            <FilterList
                filterData={interiorDoors}
                defaultValues={defaultValues.doors}
                pageClassPrefix={pageClassPrefix}
                onListClick={(filters: string[]) => onClick({ doors: filters })}
            />
        ),
    },
    {
        key: "2",
        label: "Interior doors",
        children: (
            <FilterList
                filterData={interiorDoors}
                defaultValues={defaultValues.interior_doors}
                pageClassPrefix={pageClassPrefix}
                onListClick={(filters: string[]) =>
                    onClick({ interior_doors: filters })
                }
            />
        ),
    },
    {
        key: "3",
        label: "This is panel header 3",
        children: (
            <FilterList
                filterData={interiorDoors}
                defaultValues={defaultValues.panel_header_3}
                pageClassPrefix={pageClassPrefix}
                onListClick={(filters: string[]) =>
                    onClick({ panel_header_3: filters })
                }
            />
        ),
    },
];

const productGridData = {
    imageSrc: "/images/png/door-test.png",
    price: 345,
    text: "2 panel interior door with frame",
};

const productRowData = {
    count: 1,
    id: 1,
    title: "2 panel interior door with frame",
    img: "/images/png/door-test.png",
    options: [
        {
            title: "Material",
            value: "Metail",
        },
        {
            title: "Size",
            value: "Single 20*20",
        },
        {
            title: "Color",
            value: "Silver",
        },
    ],
    price: 345,
};

export {
    tags,
    doorModification,
    eyeletIncluded,
    interiorDoors,
    collapseItems,
    productGridData,
    productRowData,
};
