import { action, makeAutoObservable, observable, toJS } from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderDTO,
    TBuilderSettingsDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
    TStepHistoryActions,
} from "./types";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { isArray, isEmpty, isNil, isNumber, uniq } from "lodash";
import { TNullable } from "@globalTypes/commonTypes";

export class BuilderStore implements IBuilderStore {
    builderData: TNullable<TBuilderDTO> = null;
    builderDataFetching = true;
    builderSettings: TNullable<TBuilderSettingsDTO> = null;
    builderSettingsFetching = true;
    // not request
    currentStepData: TBuilderStepDataDTO | null = null;
    currentStepId: TNullable<number> = null;
    stepHistory: number[] = [];
    stepQueue: number[] = [];
    resultDoorData: TNullable<TResultDoorData[]> = null;
    endDoorData: TNullable<TResultDoorData[]> = null;

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
            builderSettings: observable,
            builderSettingsFetching: observable,
            currentStepData: observable,
            currentStepId: observable,
            stepHistory: observable,
            stepQueue: observable,
            resultDoorData: observable,
            endDoorData: observable,
            // functions
            setBuilderData: action,
            setBuilderDataFetching: action,
            setBuilderSettings: action,
            setBuilderSettingsFetching: action,
            setStepHistory: action,
            setCurrentStepData: action,
            setCurrentStepId: action,
            setStepQueue: action,
            setResultDoorData: action,
            setEndDoorData: action,
        });
    }

    getBuilderSettings = (): Promise<void> => {
        this.setBuilderSettingsFetching(true);
        return axiosInstance
            .get("/setting")
            .then((data: AxiosResponse<TBuilderSettingsDTO>) => {
                this.setBuilderSettings(data.data);
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderSettingsFetching(false);
            });
    };

    setBuilderSettings = (data: TNullable<TBuilderSettingsDTO>): void => {
        this.builderSettings = data;
    };

    setBuilderSettingsFetching = (value: boolean): void => {
        this.builderSettingsFetching = value;
    };

    getBuilderData = (): Promise<void> => {
        this.setBuilderDataFetching(true);
        return axiosInstance
            .get("/quiz-questions")
            .then((data: AxiosResponse<TBuilderDTO>) => {
                this.setBuilderData(data.data);
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderDataFetching(false);
            });
    };

    setBuilderData = (data: TNullable<TBuilderDTO>): void => {
        this.builderData = data;
    };

    setBuilderDataFetching = (value: boolean): void => {
        this.builderDataFetching = value;
    };

    setStepHistory = (
        stepId: number | undefined | null,
        action: TStepHistoryActions | undefined,
    ): void => {
        if (!isNumber(stepId) && !action) {
            const nerArr = this.stepHistory.splice(-1);
            this.stepHistory = uniq([...nerArr]);
            return;
        }

        if (action === "add") {
            if (isNumber(stepId)) {
                this.stepHistory = uniq([...this.stepHistory, stepId]);
            }
            return;
        }

        if (action === "remove") {
            const newArr = this.stepHistory.filter((item) => item !== stepId);
            this.stepHistory = uniq([...newArr]);
            return;
        }
    };

    setStepQueue = (
        stepId: number | undefined | null | number[],
        action: TStepHistoryActions | undefined,
    ): void => {
        if (!stepId || !action) return;

        // console.log("stepId", stepId, action);

        if (isArray(stepId)) {
            const steps = uniq(stepId);
            if (action === "add") {
                this.stepQueue = [...this.stepQueue, ...steps];
            }
            if (action === "remove") {
                const newArr = this.stepQueue.filter(
                    (item) => item !== stepId[0],
                );
                this.stepQueue = [...newArr];
            }
        }
        if (action === "add") {
            if (isNumber(stepId)) {
                this.stepQueue = [...this.stepQueue, stepId];
            }
        }
        if (action === "remove") {
            const newArr = this.stepQueue.filter((item) => item !== stepId);
            this.stepQueue = [...newArr];
            return;
        }
    };

    setCurrentStepId = (data: number | null): void => {
        this.currentStepId = data;
    };

    setCurrentStepData = (data: TBuilderStepDataDTO | null): void => {
        this.currentStepData = data;
        this.setCurrentStepId(data?.id ?? null);
    };

    updateCurrentStepData = (way: "start" | "prev" | number): void => {
        if (!this.builderData) return;
        const quizStartId = this.builderSettings?.data.quizStartId;

        if (way === "start") {
            if (quizStartId && isNumber(quizStartId)) {
                const startStep = this.builderData.data.find(
                    (item) => item.id === quizStartId,
                );
                if (startStep) {
                    this.setCurrentStepData(startStep);
                } else this.setCurrentStepData(this.builderData.data[0]);
            } else this.setCurrentStepData(this.builderData.data[0]);
            return;
        }

        if (way === "prev") {
            if (!isEmpty(this.endDoorData)) {
                this.setEndDoorData(null);
            }

            const prevStepId = this.stepHistory[this.stepHistory.length - 1];

            if (isNumber(prevStepId)) {
                const prevStep = this.builderData.data.find(
                    (item) => item.id === prevStepId,
                );
                if (!isEmpty(prevStep)) {
                    this.setCurrentStepData(prevStep);
                    this.setStepHistory(prevStepId, "remove");
                }
            }
            return;
        }

        if (isNumber(way)) {
            const nextStepData = this.builderData.data.find(
                (item) => item.id === way,
            );
            if (!isEmpty(nextStepData)) {
                this.setStepHistory(this.currentStepId, "add");
                this.setStepQueue(this.currentStepId, "remove");
                this.setCurrentStepData(nextStepData);
            }
            return;
        }
    };

    setResultDoorData = (data: TNullable<TResultDoorData[]>): void => {
        this.resultDoorData = data;
    };

    setEndDoorData = (data: TNullable<TResultDoorData[]>): void => {
        this.endDoorData = data;
    };
}
