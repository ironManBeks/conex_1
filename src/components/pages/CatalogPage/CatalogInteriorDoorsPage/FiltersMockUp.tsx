import { CollapseProps } from "antd";
import FilterList from "./FilterList";

const tags = ["With glass", "Monolith", "Gray door", "Stained doors"];

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

const collapseItems = (pageClassPrefix: string): CollapseProps["items"] => [
    {
        key: "1",
        label: "Doors",
        children: (
            <FilterList
                filterData={interiorDoors}
                pageClassPrefix={pageClassPrefix}
            />
        ),
    },
    {
        key: "2",
        label: "Interior doors",
        children: (
            <FilterList
                filterData={interiorDoors}
                pageClassPrefix={pageClassPrefix}
            />
        ),
    },
    {
        key: "3",
        label: "This is panel header 3",
        children: (
            <FilterList
                filterData={interiorDoors}
                pageClassPrefix={pageClassPrefix}
            />
        ),
    },
];

export { tags, doorModification, eyeletIncluded, interiorDoors, collapseItems };
