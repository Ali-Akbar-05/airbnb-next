import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListing(params: IListingsParams) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

console.log(`get listing action _user Id : ${userId}`)

        if (userId) {
            query.userId = userId;
        }else{
            console.log(`Not found userid : ${userId}`)
        }
        if (category) {
            query.category = category;
        }
        else{
            console.log(`Not found category : ${category}`)
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }
        if (locationValue) {
            query.locationValue = locationValue;
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }


        const listing = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });
        const safeListing = listing.map((item) => ({
            ...item,
            createdAt: item.createdAt.toISOString()
        }))
        return safeListing;
    } catch (error: any) {
        throw new Error(error);
    }

}