import {
    action,
    makeAutoObservable,
    observable,
    runInAction,
    toJS,
} from "mobx";
import { AxiosResponse } from "axios";

import {
    IBuilderStore,
    TBuilderDTO,
    TBuilderSettingsDTO,
    TBuilderStepDataDTO,
    TResultDoorData,
    TStepHistoryActions,
    TStepPath,
    TStepQueueActions,
} from "./types";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { isArray, isEmpty, isNil, isNumber, uniq } from "lodash";
import { TNullable } from "@globalTypes/commonTypes";
import { showNotification } from "@helpers/notificarionHelper";

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

    getBuilderData = (): Promise<AxiosResponse<TBuilderDTO>> => {
        this.setBuilderDataFetching(true);
        return axiosInstance
            .get("/quiz-questions")
            .then((data: AxiosResponse<TBuilderDTO>) => {
                this.setBuilderData(data.data);
                return data;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setBuilderDataFetching(false);
            });
    };

    getBuilderDataByParent = () => {
        return axiosInstance
            .get("/quiz-questions", { params: { parent: 121 } })
            .then((data: AxiosResponse<TBuilderDTO>) => {
                // this.setBuilderData(data.data);
                console.log("data12312312", data.data);
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            });
    };

    setBuilderData = (data: TNullable<TBuilderDTO>): void => {
        this.builderData = data;
    };

    setBuilderDataFetching = (value: boolean): void => {
        this.builderDataFetching = value;
    };

    setStepHistory = (
        stepId: TStepPath,
        action: TStepHistoryActions | undefined,
    ): void => {
        if (isNil(stepId)) {
            if (action === "clear") {
                this.stepHistory = [];
            }
            return;
        }
        if (isArray(stepId) && stepId.length) {
            if (action === "add-to-end") {
                this.stepHistory = [...this.stepHistory, ...stepId];
            }
            if (action === "add-to-start") {
                this.stepHistory = [...stepId, ...this.stepHistory];
            }
            if (action === "remove") {
                this.stepHistory = this.stepHistory.filter(
                    (item) => !stepId.includes(item),
                );
            }
            return;
        }

        if (isNumber(stepId)) {
            if (action === "add-to-end") {
                this.stepHistory = [...this.stepHistory, stepId];
            }
            if (action === "add-to-start") {
                this.stepHistory = [stepId, ...this.stepHistory];
            }
            if (action === "remove") {
                this.stepHistory = this.stepHistory.filter(
                    (item) => item !== stepId,
                );
            }
            return;
        }
    };

    setStepQueue = (
        stepId: TStepPath,
        action: TStepQueueActions | undefined,
    ): void => {
        if (isNil(stepId)) {
            if (action === "clear") {
                this.stepQueue = [];
            }
            return;
        }

        if (isArray(stepId) && stepId.length) {
            const steps = uniq(stepId);
            if (action === "add-to-end" && steps.length) {
                this.stepQueue = [...this.stepQueue, ...steps];
            }
            if (action === "add-to-start" && steps.length) {
                this.stepQueue = [...steps, ...this.stepQueue];
            }
            if (action === "remove") {
                this.stepQueue = this.stepQueue.filter(
                    (item) => !stepId.includes(item),
                );
            }
            return;
        }
        if (isNumber(stepId)) {
            if (action === "add-to-end") {
                this.stepQueue = [...this.stepQueue, stepId];
            }
            if (action === "add-to-start") {
                this.stepQueue = [stepId, ...this.stepQueue];
            }
            if (action === "remove") {
                this.stepQueue = this.stepQueue.filter(
                    (item) => item !== stepId,
                );
            }
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

    updateCurrentStepData = (
        way: "start" | "prev" | number,
        changeQueue = true,
    ): void => {
        if (!this.builderData) return;

        if (!isEmpty(this.endDoorData)) {
            this.setEndDoorData(null);
        }

        if (way === "start") {
            const quizStartId = this.builderSettings?.data.quizStartId;
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
            console.log("nextStepData", toJS(nextStepData));

            if (!isEmpty(nextStepData)) {
                this.setStepHistory(this.currentStepId, "add-to-end");
                if (changeQueue) {
                    this.setStepQueue(this.currentStepId, "remove");
                }
                this.setCurrentStepData(nextStepData);
            } else {
                showNotification({
                    type: "error",
                    message: "Step not found",
                    description:
                        "Try to reload the page or select another option",
                });
            }
            return;
        }
    };

    setResultDoorData = (data: TNullable<TResultDoorData[]>) => {
        runInAction(() => {
            this.resultDoorData = data;
        });
    };

    setEndDoorData = (data: TNullable<TResultDoorData[]>): void => {
        this.endDoorData = data;
    };

    setDefaultValuesToBuilder = (
        history: number[],
        queue: number[],
        result: TResultDoorData[],
        stepId: number,
    ): void => {
        this.setStepQueue(queue, "add-to-end");
        this.setStepHistory(history, "add-to-start");
        this.setResultDoorData(result);
        this.updateCurrentStepData(stepId);
    };

    resetAllBuilderData = (withUpdateData = false): void => {
        this.setBuilderData(null);
        this.setBuilderSettings(null);
        this.setEndDoorData(null);
        this.setCurrentStepData(null);
        this.setCurrentStepId(null);
        this.setResultDoorData(null);
        this.setStepQueue(undefined, "clear");
        this.setStepHistory(undefined, "clear");
        this.setBuilderDataFetching(true);
        this.setBuilderSettingsFetching(true);
        if (withUpdateData) {
            this.getBuilderSettings().then(() => {
                this.getBuilderData().then(() => {
                    this.updateCurrentStepData("start");
                });
            });
        }
    };
}
