import {catchErrors} from "../errors";
import {Notification, NotificationType} from "../models/Notification";
import {PrismaClient} from "@prisma/client/scripts/default-deno-edge";
// import * as  PrismaClient  from '@prisma/client';

export const getTickets =
    catchErrors(async (req, res) => {
        const {title, body, id, priority, recipient, type} = req.body

        const prisma = new PrismaClient();

        const tickets = await prisma.ticket.findMany({
            take: 100
        });

        console.log(tickets);

        return res.respond({
            data: tickets
        });
    })