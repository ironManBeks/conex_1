import { TContactsUsForm } from "@components/pages/ContactUsPage/formAttrs";

export interface IContactStore {
    createFeedbackRequest: (data: TContactsUsForm) => Promise<void>;
    createFeedbackFetching: boolean;
    setCreateFeedbackFetching: (value: boolean) => void;
}
