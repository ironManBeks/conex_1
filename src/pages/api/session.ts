import type { NextApiRequest, NextApiResponse } from "next";

import { randomUUID } from "crypto";
import { CheckoutAPI, Client, Config } from "@adyen/api-library";

const config = new Config({
    apiKey: "AQEohmfxLoPGbB1Dw0m/n3Q5qf3Va4RDCIsbJ3GL0EC8O2n7mhJ+FI88hBDBXVsNvuR83LVYjEgiTGAH-nr6pnZfCqD8jIApQfR6SvVYeJF1tfw4E6uni5E/faJI=-e4XWtPU>:$rfy;CK",
    environment: "TEST",
});

const client = new Client({ config });
const checkout = new CheckoutAPI(client);

const merchantAccount = "Conex1_Payment_TEST" ?? "";

export type SessionData = {
    id: string;
    sessionData: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SessionData>,
) {
    // Using Adyen SDK to create a session
    const response = await checkout.sessions({
        amount: { currency: "EUR", value: 10000 }, // value is 100€ in minor units
        countryCode: "NL",
        merchantAccount,
        reference: randomUUID(), // Merchant reference
        returnUrl: "https://conex-1.vercel.app/my-account/orders",
    });

    // Returning the session data to the caller
    res.status(200).json({
        id: response.id,
        sessionData: response.sessionData ?? "",
    });
}
