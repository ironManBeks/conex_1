import { makeAutoObservable, observable } from "mobx";

import axiosInstance from "../../api/api";
import { showNotification } from "@helpers/notificarionHelper";
import { TContactsUsForm } from "@components/pages/ContactUsPage/formAttrs";
import { IContactStore } from "./types";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

export class ContactStore implements IContactStore {
    createFeedbackFetching = false;

    constructor() {
        makeAutoObservable(this, {
            createFeedbackFetching: observable,
        });
    }

    setCreateFeedbackFetching = (value: boolean): void => {
        this.createFeedbackFetching = value;
    };

    //---------------------------------------------------------------------

    createFeedbackRequest = (data: TContactsUsForm): Promise<void> => {
        this.setCreateFeedbackFetching(true);
        return axiosInstance
            .post("/feedbacks", { data: data })
            .then(() => {
                showNotification({
                    mainProps: {
                        type: "success",
                        message: "Feedback successfully created",
                    },
                });
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setCreateFeedbackFetching(false);
            });
    };
}
