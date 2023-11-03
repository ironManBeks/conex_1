export type TCatalogSingleGroup = {
    image: {
        src: string;
        alt: string;
    };
    title: string;
    links: {
        title: string;
        href: string;
    }[];
};

export type TCatalogGroupProps = {
    pageClassPrefix: string;
    wrapperClassName?: string;
} & TCatalogSingleGroup;
