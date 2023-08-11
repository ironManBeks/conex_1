import { TContactsUsForm } from "@components/pages/ContactUsPage/formAttrs";

export type TFeedbackData = {
    id: string;
    title: string;
    material: string;
    size: string;
    color: string;
    description: string;
    priceOld: number;
    priceNew: number;
    src: string;
};

export type TCreateFeedbackResponse = {
    data: {
        attributes: {
            createdAt: string;
            message: string;
            name: string;
            phoneNumber: string;
            publishedAt: string;
            updatedAt: string;
        };
        id: number;
    };
    meta: any;
};

export interface IContactStore {
    feedbackList: TFeedbackData[];
    setFeedbackList: (data: TFeedbackData[]) => void;
    feedbackListFetching: boolean;
    setFeedbackListFetching: (value: boolean) => void;
    getFeedbackListRequest: (value: string) => void;
    createFeedbackRequest: (data: TContactsUsForm) => Promise<void>;
}
