export type TResponseError = {
    data: any;
    error: {
        status: number;
        name: string;
        message: string;
        details: any;
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
