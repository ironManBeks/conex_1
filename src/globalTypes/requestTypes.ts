export type TResponseError = {
    data: unknown;
    error: {
        status: number;
        name: string;
        message: string;
        details: unknown;
    };
};

export type TResponseMeta = {
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
        date: number;
    };
};
