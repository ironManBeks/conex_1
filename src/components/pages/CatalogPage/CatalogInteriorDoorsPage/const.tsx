import Image from "next/image";

export const sortTypes = [
    { text: "By popularity" },
    {
        text: "Name",
        icon: (
            <Image
                alt="sort by name"
                src="/icons/sort-a-z.svg"
                width={24}
                height={24}
            />
        ),
    },
    { text: "Price" },
];
