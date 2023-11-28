// Forms
export type TSortFormDefaultValues = {
    sort: string;
};

export type TTagsFormDefaultValues = {
    tags: (string | null)[];
};

export type TCategory = {
    doors: string[];
    interior_doors: string[];
    panel_header_3: string[];
};

export type TCategoriesFormDefaultValues = {
    categories: TCategory;
    door_modification: string[];
    eyelet_included: string[];
    price: [number, number];
};
