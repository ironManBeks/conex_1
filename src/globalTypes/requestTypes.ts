export type TResponseError = {
    data: any;
    error: {
        status: number;
        name: string;
        message: string;
        details: any;
    };
};
