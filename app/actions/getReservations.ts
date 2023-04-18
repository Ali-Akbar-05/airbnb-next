import prisma from '@/app/libs/prismadb';


interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    const { listingId, authorId, userId } = params;
    const query: any = {};

    try {
        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.Listing = {
                userId: authorId
            }
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservation = reservations.map((reserv) => ({
            ...reserv,
            createdAt: reserv.createdAt.toISOString(),
            startDate: reserv.startDate.toISOString(),
            endDate: reserv.endDate.toISOString(),
            Listing: {
                ...reserv.Listing,
                createdAt: reserv.Listing?.createdAt.toISOString(),

            }
        }))
        return safeReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}