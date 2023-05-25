import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const loadEvents = async () => {
    const eventsInput: Prisma.EventCreateManyInput[] = [
        {
            "title": "Lolapalooza",
            "description": "O evento na lama",
            "date": "2023-05-25T03:24:12.126Z",
            "start_time": "2024-01-25T03:24:12.115Z",
            "end_time": "2024-01-25T09:24:12.115Z"
        },
        {
            "title": "Rock In Rio",
            "description": "O evento na lama 2",
            "date": "2023-08-25T03:24:12.126Z",
            "start_time": "2024-08-25T03:24:12.115Z",
            "end_time": "2024-08-25T09:24:12.115Z"
        },
        {
            "title": "Festa do Morango",
            "description": "O evento na lama 3",
            "date": "2023-05-25T03:24:12.126Z",
            "start_time": "2024-01-25T03:24:12.115Z",
            "end_time": "2024-01-25T09:24:12.115Z"
        }
    ];

    await prisma.event.createMany({
        data: eventsInput,
    });
};
const loadUsers = async () => {

    const password = await bcrypt.hash("@Mb_tickets_1010#", 10)

    const usersInput: Prisma.UserCreateManyInput[] = [
        { name: 'Bob', email: 'bob@email.com', password },
        { name: 'Alice', email: 'alice@email.com', password },
        { name: "João", email: "joao@email.com", password }
    ];


    await prisma.user.createMany({
        data: usersInput,
    });
};

const loadTickets = async () => {

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: "joao@email.com"
        },
    });
    const event = await prisma.event.findUniqueOrThrow({
        where: {
            id: 2,
        },
    });

    await prisma.ticket.create({
        data: {

            userId: user.id,
            eventId: event.id
        },
    });

};

const seeTickets = async () => {

    const userTickets = await prisma.user.findUniqueOrThrow({
        where: {
            email: "joao@email.com"
        },
        include: {
            tickets: { include: { event: true } }
        }
    });

    console.log("USER TICKETS", userTickets.tickets);
};



const main = async () => {
    await loadUsers();

    await loadEvents();

    await loadTickets();

    await seeTickets();
};

main().then();