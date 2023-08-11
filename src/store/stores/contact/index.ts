import { makeAutoObservable, observable } from "mobx";

import axiosInstance from "src/api/api";
import { showNotification } from "@helpers/notificarionHelper";
import { TContactsUsForm } from "@components/pages/ContactUsPage/formAttrs";
import { IContactStore, TFeedbackData } from "./types";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

export class ContactStore implements IContactStore {
    // ToDo Remove "feedbackList" if not used
    feedbackList: TFeedbackData[] = [];
    feedbackListFetching = true;

    constructor() {
        makeAutoObservable(this, {
            feedbackList: observable,
            feedbackListFetching: observable,
        });
    }

    getFeedbackListRequest = (): void => {
        this.setFeedbackList([]);
        this.setFeedbackListFetching(false);
    };

    setFeedbackList = (data: TFeedbackData[]): void => {
        this.feedbackList = data;
    };

    setFeedbackListFetching = (value: boolean): void => {
        this.feedbackListFetching = value;
    };

    createFeedbackRequest = (data: TContactsUsForm): Promise<void> => {
        return axiosInstance
            .post("/feedbacks", { data: data })
            .then(() => {
                showNotification({
                    type: "success",
                    message: "Feedback successfully created",
                });
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            });
    };
}
