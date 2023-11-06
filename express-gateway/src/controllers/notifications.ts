import {catchErrors} from "../errors";

export const sendNotification =
    catchErrors(async (req, res) => {

        // const paymentResponse = await paymentService.run()

        return res.respond({
            data: {}
        });
    })


export const get =
    catchErrors(async (req, res) => {

        // const paymentResponse = await paymentService.run()

        return res.respond({
            data: {}
        });
    })