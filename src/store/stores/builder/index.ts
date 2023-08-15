import { action, makeAutoObservable, observable, toJS } from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
    TStepHistoryActions,
} from "./types";
import axiosInstance from "../../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { isArray, isEmpty, isNumber, uniq } from "lodash";

export class BuilderStore implements IBuilderStore {
    builderData: TBuilderDTO | null = null;
    builderDataFetching = true;
    currentStepData: TBuilderStepDataDTO | null = null;
    currentStepId: number | null = null;
    stepHistory: number[] = [];
    stepQueue: number[] = [];
    resultDoorData: TResultDoorData = null;

    constructor() {
        makeAutoObservable(this, {
            builderData: observable,
            builderDataFetching: observable,
            currentStepData: observable,
            currentStepId: observable,
            stepHistory: observable,
            stepQueue: observable,
            resultDoorData: observable,
            // functions
            setBuilderData: action,
            setBuilderDataFetching: action,
            setStepHistory: action,
            setCurrentStepData: action,
            setCurrentStepId: action,
            setStepQueue: action,
            setResultDoorData: action,
        });
    }

    getBuilderData = (): Promise<void> => {
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

    setBuilderData = (data: TBuilderDTO): void => {
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
            this.stepHistory = [...nerArr];
            return;
        }

        if (action === "add") {
            if (isNumber(stepId)) {
                this.stepHistory = [...this.stepHistory, stepId];
            }
            return;
        }

        if (action === "remove") {
            const newArr = this.stepHistory.filter((item) => item !== stepId);
            this.stepHistory = [...newArr];
            return;
        }
    };

    setStepQueue = (
        stepId: number | undefined | null | number[],
        action: TStepHistoryActions | undefined,
    ): void => {
        if (!stepId || !action) return;

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

        if (way === "start") {
            const firstStep = this.builderData.data[0];
            this.setCurrentStepData(this.builderData.data[0]);
            // this.setStepHistory(firstStep.id, "add");
            return;
        }

        if (way === "prev") {
            if (!isEmpty(this.resultDoorData)) {
                this.setResultDoorData(null);
            }
            const prevPageId = this.stepHistory[this.stepHistory.length - 1];
            if (isNumber(prevPageId)) {
                const prevPage = this.builderData.data.find(
                    (item) => item.id === prevPageId,
                );
                if (!isEmpty(prevPage)) {
                    this.setCurrentStepData(prevPage);
                    this.setStepHistory(prevPageId, "remove");
                }
            }
            return;
        }

        if (isNumber(way)) {
            const nextPage = this.builderData.data.find(
                (item) => item.id === way,
            );
            if (!isEmpty(nextPage)) {
                this.setStepHistory(this.currentStepId, "add");
                this.setStepQueue(this.currentStepId, "remove");
                this.setCurrentStepData(nextPage);
            }
            return;
        }
    };

    setResultDoorData = (data: TResultDoorData): void => {
        this.resultDoorData = data;
    };
}
