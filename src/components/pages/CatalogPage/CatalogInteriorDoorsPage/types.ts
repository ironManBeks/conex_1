export type TSortFormDefaultValues = {
    sort: string;
};

export type TTagsFormDefaultValues = {
    tags: (string | null)[];
};

export type TCategoryForm = {
    doors: string[];
    interior_doors: string[];
    panel_header_3: string[];
};

export type TCategoriesFormDefaultValues = {
    categories: TCategoryForm;
};

export type TEyeletIncludedForm = {
    eyelet_included: string[];
};

export type TDoorModificationForm = {
    door_modification: string[];
};

export type TPriceForm = {
    price: [number, number];
};
