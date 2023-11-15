export type SessionData = {
    id: string;
    sessionData: string;
};

export type PaymentCompleteResponse = {
    resultCode: "Authorised" | "Refused" | "Cancelled" | "Error";
    sessionDate?: string;
    sessionResult?: string;
};
