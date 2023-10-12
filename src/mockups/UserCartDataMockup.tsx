import { TUserCartItem } from "@store/auth/types";

export const UserCartDataMockup: TUserCartItem[] = [
    {
        id: "1",
        title: "2 panel interior door with frame",
        price: 123,
        img: "https://conexwest-doors.opserver.store/uploads/wooden_door_7a82d3ea27.jpg",
        createDate: "2023-08-30T09:34:14.281Z",
        options: [
            {
                title: "Material",
                value: "Wood",
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
        count: 1,
    },
    {
        id: "2",
        title: "Small title",
        price: 1,
        img: "https://conexwest-doors.opserver.store/uploads/wooden_door_7a82d3ea27.jpg",
        createDate: "2023-08-30T09:34:14.281Z",
        options: [
            {
                title: "One",
                value: "One",
            },
        ],
        count: 2,
    },
    {
        id: "3",
        title: "Big title Big title Big title Big title Big title Big title Big title Big title ",
        price: 12345,
        img: "https://conexwest-doors.opserver.store/uploads/wooden_door_7a82d3ea27.jpg",
        createDate: "2023-08-30T09:34:14.281Z",
        options: [
            {
                title: "Material",
                value: "Wood",
            },
            {
                title: "Size",
                value: "Single 20*20",
            },
            {
                title: "Color",
                value: "Silver",
            },
            {
                title: "option 1",
                value: "option option option option option option option  option option option",
            },
            {
                title: "option option option option option option option  option option option",
                value: "option option option option option option option  option option option",
            },
            {
                title: "optionoptionoptionoption optionoption optionoption optionoption optionoption",
                value: "optionoptionoptionoption optionoption optionoption optionoption",
            },
        ],
        count: 33,
    },
];
