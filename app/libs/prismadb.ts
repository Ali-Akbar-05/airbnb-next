
import { PrismaClient } from "@prisma/client";

declare global {
    var primsma: PrismaClient | undefined;
}

const client = globalThis.primsma || new PrismaClient()

if (process.env.NODE_ENV != 'production')
    globalThis.primsma = client;

export default client;

